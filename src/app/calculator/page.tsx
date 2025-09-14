'use client';

import { useState } from 'react';

// Numerology calculation utilities
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

interface CalculationResult {
  name: string;
  nameNumber: number;
  mulank: number;
  bhagyank: number;
  compatibility: number;
  compatibilityText: string;
  description: string;
}

export default function Calculator() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [babyName, setBabyName] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  // Reduce number to single digit
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Calculate Mulank (Day Number)
  const calculateMulank = (date: string): number => {
    const day = parseInt(date.split('-')[2]); // Extract day from YYYY-MM-DD
    return reduceToSingleDigit(day);
  };

  // Calculate Bhagyank (Life Path Number)
  const calculateBhagyank = (date: string): number => {
    const digits = date.replace(/\D/g, ''); // Remove non-digits
    const sum = digits.split('').reduce((total, digit) => total + parseInt(digit), 0);
    return reduceToSingleDigit(sum);
  };

  // Calculate Name Number
  const calculateNameNumber = (name: string): number => {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    const sum = cleanName.split('').reduce((total, letter) => {
      return total + (letterValues[letter] || 0);
    }, 0);
    return reduceToSingleDigit(sum);
  };

  // Calculate compatibility
  const calculateCompatibility = (nameNumber: number, mulank: number, bhagyank: number): { percentage: number, text: string, description: string } => {
    const matrix = compatibilityMatrix[nameNumber];
    if (!matrix) return { percentage: 0, text: 'No Match', description: 'Invalid name number' };

    const mulankFriendly = matrix.friendly.includes(mulank);
    const bhagyankFriendly = matrix.friendly.includes(bhagyank);
    const mulankNeutral = matrix.neutral.includes(mulank);
    const bhagyankNeutral = matrix.neutral.includes(bhagyank);

    if (mulankFriendly && bhagyankFriendly) {
      return { 
        percentage: 100, 
        text: 'Perfect Match', 
        description: 'Both Mulank and Bhagyank are friendly with your name number. This is an ideal combination!' 
      };
    } else if ((mulankFriendly && bhagyankNeutral) || (mulankNeutral && bhagyankFriendly)) {
      return { 
        percentage: 75, 
        text: 'Great Match', 
        description: 'One number is friendly and the other is neutral. This is a very good combination.' 
      };
    } else if (mulankNeutral && bhagyankNeutral) {
      return { 
        percentage: 50, 
        text: 'Fair Match', 
        description: 'Both numbers are neutral with your name number. This is a balanced combination.' 
      };
    } else if ((mulankFriendly || bhagyankFriendly) && (!matrix.enemy.includes(mulank) && !matrix.enemy.includes(bhagyank))) {
      return { 
        percentage: 25, 
        text: 'Poor Match', 
        description: 'Mixed compatibility with some challenging aspects.' 
      };
    } else {
      return { 
        percentage: 0, 
        text: 'No Match', 
        description: 'The numbers have conflicting energies. Consider exploring other name options.' 
      };
    }
  };

  const handleCalculate = async () => {
    setError('');
    setIsCalculating(true);

    try {
      // Validation
      if (!dateOfBirth || !babyName.trim()) {
        throw new Error('Please enter both date of birth and baby name');
      }

      if (babyName.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      // Calculate numbers
      const nameNumber = calculateNameNumber(babyName);
      const mulank = calculateMulank(dateOfBirth);
      const bhagyank = calculateBhagyank(dateOfBirth);
      
      // Calculate compatibility
      const compatibility = calculateCompatibility(nameNumber, mulank, bhagyank);

      setResult({
        name: babyName.trim(),
        nameNumber,
        mulank,
        bhagyank,
        compatibility: compatibility.percentage,
        compatibilityText: compatibility.text,
        description: compatibility.description
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setDateOfBirth('');
    setBabyName('');
    setResult(null);
    setError('');
  };

  const handleSave = () => {
    if (result) {
      // For now, just copy to clipboard
      const resultText = `Name: ${result.name}\nName Number: ${result.nameNumber}\nMulank: ${result.mulank}\nBhagyank: ${result.bhagyank}\nCompatibility: ${result.compatibility}% (${result.compatibilityText})`;
      navigator.clipboard.writeText(resultText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Numerology Calculator
            </span>
          </h1>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Discover the mystical compatibility between your baby's name and birth date using ancient numerology wisdom.
          </p>
        </div>

        {/* Input Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 mb-8 mystical-glow">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Date of Birth Input */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-purple-200 mb-2">
                🗓️ Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                required
              />
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
                👶 Baby Name
              </label>
              <input
                type="text"
                id="name"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                placeholder="Enter baby name..."
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200">
              ⚠️ {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="mystical-glow px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? '🔮 Calculating...' : '✨ Calculate Compatibility'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-8 py-3 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300"
            >
              🔄 Reset
            </button>
            
            {result && (
              <button
                onClick={handleSave}
                className="px-8 py-3 border-2 border-yellow-400 text-yellow-200 font-semibold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
              >
                💾 Save Results
              </button>
            )}
          </div>
        </div>

        {/* Results Container */}
        {result && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 mystical-glow">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Compatibility Results
                </span>
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className={`text-4xl ${
                  result.compatibility >= 75 ? 'text-green-400' :
                  result.compatibility >= 50 ? 'text-yellow-400' :
                  result.compatibility >= 25 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {result.compatibility >= 75 ? '🌟' :
                   result.compatibility >= 50 ? '⭐' :
                   result.compatibility >= 25 ? '🔸' : '❌'}
                </div>
                <span className="text-3xl font-bold text-white">
                  {result.compatibility}%
                </span>
                <span className={`text-lg font-semibold ${
                  result.compatibility >= 75 ? 'text-green-400' :
                  result.compatibility >= 50 ? 'text-yellow-400' :
                  result.compatibility >= 25 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {result.compatibilityText}
                </span>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-purple-400/30">
                    <th className="text-left py-3 px-4 text-purple-200 font-semibold">Metric</th>
                    <th className="text-left py-3 px-4 text-purple-200 font-semibold">Value</th>
                    <th className="text-left py-3 px-4 text-purple-200 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-purple-500/20 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">👶 Name</td>
                    <td className="py-3 px-4">{result.name}</td>
                    <td className="py-3 px-4 text-purple-200">The baby name being analyzed</td>
                  </tr>
                  <tr className="border-b border-purple-500/20 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">🔢 Name Number</td>
                    <td className="py-3 px-4 text-yellow-300 font-bold">{result.nameNumber}</td>
                    <td className="py-3 px-4 text-purple-200">Numerological value of the name</td>
                  </tr>
                  <tr className="border-b border-purple-500/20 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">🌅 Mulank (Day Number)</td>
                    <td className="py-3 px-4 text-pink-300 font-bold">{result.mulank}</td>
                    <td className="py-3 px-4 text-purple-200">Calculated from birth day</td>
                  </tr>
                  <tr className="border-b border-purple-500/20 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">🌟 Bhagyank (Life Path)</td>
                    <td className="py-3 px-4 text-blue-300 font-bold">{result.bhagyank}</td>
                    <td className="py-3 px-4 text-purple-200">Calculated from full birth date</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium">💫 Compatibility Score</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold text-xl ${
                        result.compatibility >= 75 ? 'text-green-400' :
                        result.compatibility >= 50 ? 'text-yellow-400' :
                        result.compatibility >= 25 ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {result.compatibility}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-purple-200">{result.compatibilityText}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detailed Description */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                🔮 Detailed Analysis
              </h3>
              <p className="text-purple-100 leading-relaxed">
                {result.description}
              </p>  
            </div>

            {/* Action Links */}
            <div className="mt-6 text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/numerology-table"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  📋 View Table & Compare Names
                </a>
                <a
                  href="/guide"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  📚 Learn More About Numerology
                </a>
              </div>
              <p className="text-sm text-purple-200">
                Compare multiple names in the table view or discover detailed meanings and compatibility guides
              </p>
            </div>
          </div>
        )}

        {/* Simple How It Works */}
        <div className="mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📚 How the Calculation Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-purple-200">
              <div>
                <h4 className="font-semibold text-white mb-2">🔢 Name Number</h4>
                <p className="text-sm">Each letter has a numerical value based on ancient numerology. We sum these values and reduce to a single digit (1-9).</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🌅 Day Number</h4>
                <p className="text-sm">The day number from your birth date, reduced to a single digit representing your core personality and daily approach to life.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🌟 Life Path</h4>
                <p className="text-sm">Your life path number calculated from the complete birth date, representing your soul's journey and ultimate life purpose.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

