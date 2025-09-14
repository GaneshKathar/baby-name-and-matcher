'use client';

import { useState, useEffect, useMemo } from 'react';

// Numerology calculation utilities (reused from calculator)
const letterValues: { [key: string]: number } = {
  'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
  'B': 2, 'K': 2, 'R': 2,
  'C': 3, 'G': 3, 'L': 3, 'S': 3,
  'D': 4, 'M': 4, 'T': 4,
  'E': 5, 'H': 5, 'N': 5, 'X': 5,
  'U': 6, 'V': 6, 'W': 6,
  'O': 7, 'Z': 7,
  'F': 8, 'P': 8
};

// Compatibility matrix
const compatibilityMatrix: { [key: number]: { friendly: number[], enemy: number[], neutral: number[] } } = {
  1: { friendly: [1, 2, 3, 5, 6, 9], enemy: [8], neutral: [4, 7] },
  2: { friendly: [1, 2, 3, 5], enemy: [4, 8, 9], neutral: [6, 7] },
  3: { friendly: [1, 2, 3, 5, 7], enemy: [6], neutral: [4, 8, 9] },
  4: { friendly: [1, 4, 5, 6, 7, 8], enemy: [2, 9], neutral: [3] },
  5: { friendly: [1, 2, 3, 5, 6], enemy: [], neutral: [4, 7, 8, 9] },
  6: { friendly: [1, 4, 5, 6, 7], enemy: [3], neutral: [2, 8, 9] },
  7: { friendly: [1, 3, 4, 5, 6], enemy: [2], neutral: [7, 8, 9] },
  8: { friendly: [3, 4, 5, 6, 7, 8], enemy: [1, 2], neutral: [9] },
  9: { friendly: [1, 3, 5], enemy: [2, 4], neutral: [6, 7, 8, 9] }
};

interface NameEntry {
  id: string;
  name: string;
  nameNumber: number;
  compatibility: number;
  compatibilityText: string;
  dateOfBirth: string;
  mulank: number;
  bhagyank: number;
  createdAt: number;
}

type SortField = 'name' | 'compatibility' | 'nameNumber' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export default function NumerologyTable() {
  const [entries, setEntries] = useState<NameEntry[]>([]);
  const [selectedDOB, setSelectedDOB] = useState<string>('');
  const [babyName, setBabyName] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddDOBForm, setShowAddDOBForm] = useState(false);
  const [newDOB, setNewDOB] = useState('');
  
  // Filtering and sorting states
  const [nameFilter, setNameFilter] = useState('');
  const [compatibilityFilter, setCompatibilityFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('numerology-entries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('numerology-entries', JSON.stringify(entries));
  }, [entries]);

  // Get unique DOBs from entries
  const uniqueDOBs = useMemo(() => {
    const dobSet = new Set(entries.map(entry => entry.dateOfBirth));
    return Array.from(dobSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }, [entries]);

  // Auto-select first DOB if none selected and DOBs exist
  useEffect(() => {
    if (!selectedDOB && uniqueDOBs.length > 0) {
      setSelectedDOB(uniqueDOBs[0]);
    }
  }, [uniqueDOBs, selectedDOB]);

  // Utility functions (same as calculator)
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateMulank = (date: string): number => {
    const day = parseInt(date.split('-')[2]);
    return reduceToSingleDigit(day);
  };

  const calculateBhagyank = (date: string): number => {
    const digits = date.replace(/\D/g, '');
    const sum = digits.split('').reduce((total, digit) => total + parseInt(digit), 0);
    return reduceToSingleDigit(sum);
  };

  const calculateNameNumber = (name: string): number => {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    const sum = cleanName.split('').reduce((total, letter) => {
      return total + (letterValues[letter] || 0);
    }, 0);
    return reduceToSingleDigit(sum);
  };

  const calculateCompatibility = (nameNumber: number, mulank: number, bhagyank: number): { percentage: number, text: string } => {
    const matrix = compatibilityMatrix[nameNumber];
    if (!matrix) return { percentage: 0, text: 'No Match' };

    const mulankFriendly = matrix.friendly.includes(mulank);
    const bhagyankFriendly = matrix.friendly.includes(bhagyank);
    const mulankNeutral = matrix.neutral.includes(mulank);
    const bhagyankNeutral = matrix.neutral.includes(bhagyank);

    if (mulankFriendly && bhagyankFriendly) {
      return { percentage: 100, text: 'Perfect Match' };
    } else if ((mulankFriendly && bhagyankNeutral) || (mulankNeutral && bhagyankFriendly)) {
      return { percentage: 75, text: 'Great Match' };
    } else if (mulankNeutral && bhagyankNeutral) {
      return { percentage: 50, text: 'Fair Match' };
    } else if ((mulankFriendly || bhagyankFriendly) && (!matrix.enemy.includes(mulank) && !matrix.enemy.includes(bhagyank))) {
      return { percentage: 25, text: 'Poor Match' };
    } else {
      return { percentage: 0, text: 'No Match' };
    }
  };

  const handleCalculate = async () => {
    setError('');
    setIsCalculating(true);

    try {
      if (!selectedDOB || !babyName.trim()) {
        throw new Error('Please select a date of birth and enter a baby name');
      }

      if (babyName.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      // Check if name already exists for this DOB
      const existingEntry = entries.find(entry => 
        entry.name.toLowerCase() === babyName.trim().toLowerCase() && 
        entry.dateOfBirth === selectedDOB
      );

      if (existingEntry) {
        throw new Error('This name already exists for the selected date of birth');
      }

      // Calculate numbers
      const nameNumber = calculateNameNumber(babyName);
      const mulank = calculateMulank(selectedDOB);
      const bhagyank = calculateBhagyank(selectedDOB);
      const compatibility = calculateCompatibility(nameNumber, mulank, bhagyank);

      // Create new entry
      const newEntry: NameEntry = {
        id: Date.now().toString(),
        name: babyName.trim(),
        nameNumber,
        mulank,
        bhagyank,
        compatibility: compatibility.percentage,
        compatibilityText: compatibility.text,
        dateOfBirth: selectedDOB,
        createdAt: Date.now()
      };

      // Add to top of entries
      setEntries(prev => [newEntry, ...prev]);
      
      // Clear form
      setBabyName('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleAddDOB = () => {
    if (!newDOB) {
      setError('Please select a date of birth');
      return;
    }

    if (uniqueDOBs.includes(newDOB)) {
      setError('This date of birth already exists');
      return;
    }

    setSelectedDOB(newDOB);
    setNewDOB('');
    setShowAddDOBForm(false);
    setError('');
  };

  // Filter and sort entries for selected DOB
  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries;

    // Filter by selected DOB first
    if (selectedDOB) {
      filtered = filtered.filter(entry => entry.dateOfBirth === selectedDOB);
    }

    // Apply name filter
    if (nameFilter.trim()) {
      filtered = filtered.filter(entry =>
        entry.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Apply compatibility filter
    if (compatibilityFilter !== 'all') {
      switch (compatibilityFilter) {
        case 'perfect':
          filtered = filtered.filter(entry => entry.compatibility === 100);
          break;
        case 'great':
          filtered = filtered.filter(entry => entry.compatibility === 75);
          break;
        case 'fair':
          filtered = filtered.filter(entry => entry.compatibility === 50);
          break;
        case 'poor':
          filtered = filtered.filter(entry => entry.compatibility === 25);
          break;
        case 'none':
          filtered = filtered.filter(entry => entry.compatibility === 0);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [entries, selectedDOB, nameFilter, compatibilityFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const clearAllEntries = () => {
    if (window.confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
      setEntries([]);
    }
  };

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 75) return 'text-green-400';
    if (compatibility >= 50) return 'text-yellow-400';
    if (compatibility >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const getCompatibilityIcon = (compatibility: number) => {
    if (compatibility >= 75) return '🌟';
    if (compatibility >= 50) return '⭐';
    if (compatibility >= 25) return '🔸';
    return '❌';
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - DOB List */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
          w-80 lg:w-80 bg-white/5 backdrop-blur-sm border-r border-purple-500/20
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                🗓️ Date of Birth
              </h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden text-purple-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Add New DOB Button */}
            <button
              onClick={() => setShowAddDOBForm(true)}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mystical-glow"
            >
              ➕ Add New DOB
            </button>
          </div>

          {/* Add DOB Form Modal */}
          {showAddDOBForm && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 w-full max-w-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Add New Date of Birth</h3>
                <input
                  type="date"
                  value={newDOB}
                  onChange={(e) => setNewDOB(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddDOB}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddDOBForm(false);
                      setNewDOB('');
                      setError('');
                    }}
                    className="flex-1 px-4 py-2 border border-purple-400 text-purple-200 rounded-lg hover:bg-purple-400/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DOB List */}
          <div className="flex-1 overflow-y-auto p-6 pt-0">
            {uniqueDOBs.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-purple-200 text-sm">No dates added yet</p>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                {uniqueDOBs.map((dob) => {
                  const dobEntries = entries.filter(e => e.dateOfBirth === dob);
                  const isSelected = selectedDOB === dob;

                  return (
                    <button
                      key={dob}
                      onClick={() => setSelectedDOB(dob)}
                      className={`
                        w-full text-left p-3 rounded-lg border transition-all duration-200
                        ${isSelected
                          ? 'bg-purple-600/30 border-purple-400 mystical-glow'
                          : 'bg-white/5 border-purple-500/20 hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${isSelected ? 'text-white' : 'text-purple-100'}`}>
                            {new Date(dob).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-purple-300 mt-1">
                            {dobEntries.length} name{dobEntries.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        {isSelected && <div className="text-purple-300">✓</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header with Sidebar Toggle */}
          <div className="lg:hidden p-4 border-b border-purple-500/20 bg-white/5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Select Date of Birth</span>
            </button>
          </div>

          {selectedDOB ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header Section */}
              <div className="p-4 border-b border-purple-500/20 bg-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
                      👶&nbsp;Names for {new Date(selectedDOB).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                  </div>
                </div>

                {/* Name Input Section */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      placeholder="Enter baby name..."
                      className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBabyName('')}
                      className="px-4 py-3 border border-purple-400/30 text-purple-200 rounded-lg hover:bg-purple-400/10 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating || !babyName.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mystical-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCalculating ? '🔮 Adding...' : '✨ Calculate'}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-3 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm">
                    ⚠️ {error}
                  </div>
                )}
              </div>

              {/* Table Section */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-purple-500/20 bg-white/5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Search names..."
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    />
                    <select
                      value={compatibilityFilter}
                      onChange={(e) => setCompatibilityFilter(e.target.value)}
                      className="px-3 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    >
                      <option value="all">All Matches</option>
                      <option value="perfect">Perfect (100%)</option>
                      <option value="great">Great (75%)</option>
                      <option value="fair">Fair (50%)</option>
                      <option value="poor">Poor (25%)</option>
                      <option value="none">No Match (0%)</option>
                    </select>
                  </div>
                </div>

                {/* Table/Cards */}
                <div className="flex-1 overflow-auto">
                  {filteredAndSortedEntries.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔮</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Names Yet</h3>
                        <p className="text-purple-200">
                          Start by adding your first baby name to see the compatibility analysis.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      {/* Sort Controls for Mobile */}
                      <div className="md:hidden mb-4">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleSort('name')}
                            className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                              sortField === 'name'
                                ? 'bg-purple-600/30 border-purple-400 text-white'
                                : 'border-purple-500/20 text-purple-200 hover:bg-white/5'
                            }`}
                          >
                            👶 Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                          <button
                            onClick={() => handleSort('nameNumber')}
                            className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                              sortField === 'nameNumber'
                                ? 'bg-purple-600/30 border-purple-400 text-white'
                                : 'border-purple-500/20 text-purple-200 hover:bg-white/5'
                            }`}
                          >
                            🔢 Number {sortField === 'nameNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                          <button
                            onClick={() => handleSort('compatibility')}
                            className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                              sortField === 'compatibility'
                                ? 'bg-purple-600/30 border-purple-400 text-white'
                                : 'border-purple-500/20 text-purple-200 hover:bg-white/5'
                            }`}
                          >
                            💫 Compatibility {sortField === 'compatibility' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </button>
                        </div>
                      </div>

                      {/* Desktop Table View */}
                      <div className="hidden md:block">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-white/5 backdrop-blur-sm ">
                              <tr className="border-b border-purple-400/30 ">
                                <th
                                  className="text-left py-3 px-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors"
                                  onClick={() => handleSort('name')}
                                >
                                  👶 Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                  className="text-left py-3 px-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors"
                                  onClick={() => handleSort('nameNumber')}
                                >
                                  🔢 Number {sortField === 'nameNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th
                                  className="text-left py-3 px-4 text-purple-200 font-semibold cursor-pointer hover:text-white transition-colors"
                                  onClick={() => handleSort('compatibility')}
                                >
                                  💫 Compatibility {sortField === 'compatibility' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="text-left py-3 px-4 text-purple-200 font-semibold">
                                  ⚡ Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {filteredAndSortedEntries.map((entry) => (
                                <tr key={entry.id} className="border-b border-purple-500/20 hover:bg-white/5 transition-colors">
                                  <td className="py-3 px-4 font-medium">{entry.name}</td>
                                  <td className="py-3 px-4 text-yellow-300 font-bold">{entry.nameNumber}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">{getCompatibilityIcon(entry.compatibility)}</span>
                                      <span className={`font-bold ${getCompatibilityColor(entry.compatibility)}`}>
                                        {entry.compatibility}%
                                      </span>
                                      <span className={`text-sm ${getCompatibilityColor(entry.compatibility)}`}>
                                        {entry.compatibilityText}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <button
                                      onClick={() => deleteEntry(entry.id)}
                                      className="text-red-400 hover:text-red-300 transition-colors text-sm"
                                      title="Delete entry"
                                    >
                                      🗑️
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Mobile Card View - 3 Column Layout */}
                      <div className="md:hidden space-y-3">
                        {filteredAndSortedEntries.map((entry) => (
                          <div key={entry.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:bg-white/10 transition-colors">
                            <div className="grid grid-cols-3 gap-4 items-center">
                              {/* Column 1: Name & Number */}
                              <div className="flex flex-col">
                                <h3 className="text-base font-semibold text-white mb-1 capitalize">
                                  {entry.name.toLowerCase()}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-purple-300">Number:</span>
                                  <span className="text-yellow-300 font-bold text-sm">{entry.nameNumber}</span>
                                </div>
                              </div>

                              {/* Column 2: Compatibility Details */}
                              <div className="flex items-center gap-2 justify-center">
                                <span className="text-lg">{getCompatibilityIcon(entry.compatibility)}</span>
                                <div className="flex flex-col items-center">
                                  <span className={`font-bold text-sm ${getCompatibilityColor(entry.compatibility)}`}>
                                    {entry.compatibility}%
                                  </span>
                                  <span className={`text-xs ${getCompatibilityColor(entry.compatibility)} text-center`}>
                                    {entry.compatibilityText}
                                  </span>
                                </div>
                              </div>

                              {/* Column 3: Action */}
                              <div className="flex justify-end">
                                <button
                                  onClick={() => deleteEntry(entry.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10"
                                  title="Delete entry"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Results Summary */}
                      <div className="mt-4 text-sm text-purple-200 text-center">
                        Showing {filteredAndSortedEntries.length} name{filteredAndSortedEntries.length !== 1 ? 's' : ''} for this date
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a Date of Birth</h3>
                <p className="text-purple-200 mb-4">
                  Choose a date from the sidebar or add a new one to start analyzing baby names.
                </p>
                <button
                  onClick={() => setShowAddDOBForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mystical-glow"
                >
                  ➕ Add New Date of Birth
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
