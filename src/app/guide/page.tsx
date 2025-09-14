import Link from 'next/link';

export default function Guide() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Numerology Guide
            </span>
          </h1>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto mb-6">
            Discover the ancient wisdom of numerology and learn how numbers influence personality, 
            destiny, and compatibility. Your complete guide to understanding the mystical power of numbers.
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="/calculator"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              🧮 Try Calculator
            </a>
            <Link
              href="/"
              className="px-6 py-2 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300"
            >
              🏠 Home
            </Link>
          </div>
        </div>

        {/* Detailed Compatibility Guide */}
        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 mystical-glow">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              📊 Compatibility Guide & Meanings
            </h2>
            
            {/* Compatibility Levels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Perfect Match */}
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🌟</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400">Perfect Match (100%)</h3>
                    <p className="text-sm text-green-200">Ideal Cosmic Alignment</p>
                  </div>
                </div>
                <p className="text-green-100 text-sm mb-3">
                  Both your Mulank (day number) and Bhagyank (life path) are in perfect harmony with the name number. 
                  This creates a powerful synergy that supports the child&apos;s natural talents and life purpose.
                </p>
                <div className="text-xs text-green-200">
                  <strong>Benefits:</strong> Enhanced intuition, natural leadership, strong self-confidence, 
                  aligned life path, and harmonious personality development.
                </div>
              </div>

              {/* Great Match */}
              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400">Great Match (75%)</h3>
                    <p className="text-sm text-yellow-200">Strong Positive Energy</p>
                  </div>
                </div>
                <p className="text-yellow-100 text-sm mb-3">
                  One number is friendly while the other is neutral. This creates a balanced energy flow 
                  with strong support in key areas of life while maintaining stability in others.
                </p>
                <div className="text-xs text-yellow-200">
                  <strong>Benefits:</strong> Good fortune in career, balanced relationships, steady progress, 
                  and natural problem-solving abilities.
                </div>
              </div>

              {/* Fair Match */}
              <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🔸</div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Fair Match (50%)</h3>
                    <p className="text-sm text-orange-200">Neutral Balance</p>
                  </div>
                </div>
                <p className="text-orange-100 text-sm mb-3">
                  Both numbers are neutral with the name number, creating a balanced but not particularly 
                  energized combination. This offers stability and steady progress without major conflicts.
                </p>
                <div className="text-xs text-orange-200">
                  <strong>Characteristics:</strong> Steady personality, moderate success, balanced approach to life, 
                  and consistent but gradual growth.
                </div>
              </div>

              {/* Poor/No Match */}
              <div className="bg-red-500/10 rounded-xl p-6 border border-red-400/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-400">Poor/No Match (0-25%)</h3>
                    <p className="text-sm text-red-200">Challenging Energy</p>
                  </div>
                </div>
                <p className="text-red-100 text-sm mb-3">
                  The numbers have conflicting energies that may create internal struggles or challenges. 
                  While not impossible, this combination may require extra effort to achieve harmony.
                </p>
                <div className="text-xs text-red-200">
                  <strong>Considerations:</strong> May face internal conflicts, need extra self-awareness, 
                  benefit from meditation/spiritual practices, and require conscious effort for balance.
                </div>
              </div>
            </div>

            {/* Understanding the Numbers */}
            <div className="mt-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-400/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🔢 Understanding Your Numbers
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-indigo-300 mb-2">🌅 Mulank (Day Number)</h4>
                  <p className="text-indigo-100">
                    Represents your core personality, natural instincts, and how you approach daily life. 
                    It&apos;s your immediate response to situations and your surface-level characteristics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">🌟 Bhagyank (Life Path)</h4>
                  <p className="text-purple-100">
                    Your soul&apos;s journey and life purpose. It represents the lessons you&apos;re here to learn,
                    your spiritual path, and the ultimate direction of your life&apos;s work.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-300 mb-2">🔤 Name Number</h4>
                  <p className="text-pink-100">
                    The vibrational energy of your name that influences how others perceive you and how 
                    you express yourself in the world. It affects your social interactions and public image.
                  </p>
                </div>
              </div>
            </div>

            {/* Numerology Wisdom */}
            <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🔮 Ancient Numerology Wisdom
              </h3>
              <div className="space-y-3 text-sm text-purple-100">
                <p>
                  <strong className="text-purple-300">Friendly Numbers:</strong> Create supportive energy that enhances natural abilities, 
                  brings good fortune, and helps overcome obstacles with ease.
                </p>
                <p>
                  <strong className="text-purple-300">Neutral Numbers:</strong> Provide stability and balance without strong positive or 
                  negative influence. They represent areas of steady, consistent energy.
                </p>
                <p>
                  <strong className="text-purple-300">Enemy Numbers:</strong> Create challenging energy that requires conscious effort to 
                  overcome. They often represent areas of growth and learning through adversity.
                </p>
                <p className="text-xs text-purple-200 mt-4 italic">
                  Remember: Numerology is a guide for self-understanding and reflection. Every number combination
                  has its own unique gifts and challenges that contribute to a person&apos;s complete spiritual journey.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Number Meanings Guide */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              🔢 Complete Number Meanings Guide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Number 1 */}
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-5 border border-red-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                  <div>
                    <h3 className="font-semibold text-red-300">The Leader</h3>
                    <p className="text-xs text-red-200">Sun Energy</p>
                  </div>
                </div>
                <p className="text-sm text-red-100 mb-3">
                  Natural born leaders with strong willpower, independence, and pioneering spirit. They are ambitious, confident, and prefer to lead rather than follow.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-red-300">Strengths:</strong> Leadership, innovation, determination</p>
                  <p><strong className="text-red-300">Challenges:</strong> Stubbornness, impatience, ego</p>
                  <p><strong className="text-red-300">Compatible:</strong> 2, 3, 5, 6, 9</p>
                </div>
              </div>

              {/* Number 2 */}
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-5 border border-blue-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                  <div>
                    <h3 className="font-semibold text-blue-300">The Diplomat</h3>
                    <p className="text-xs text-blue-200">Moon Energy</p>
                  </div>
                </div>
                <p className="text-sm text-blue-100 mb-3">
                  Cooperative, sensitive, and peace-loving. They excel in partnerships, have strong intuition, and are natural mediators who value harmony.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-blue-300">Strengths:</strong> Cooperation, intuition, diplomacy</p>
                  <p><strong className="text-blue-300">Challenges:</strong> Over-sensitivity, indecision</p>
                  <p><strong className="text-blue-300">Compatible:</strong> 1, 3, 5</p>
                </div>
              </div>

              {/* Number 3 */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl p-5 border border-yellow-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                  <div>
                    <h3 className="font-semibold text-yellow-300">The Creative</h3>
                    <p className="text-xs text-yellow-200">Jupiter Energy</p>
                  </div>
                </div>
                <p className="text-sm text-yellow-100 mb-3">
                  Artistic, expressive, and optimistic. They have natural communication skills, creativity, and bring joy and inspiration to others.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-yellow-300">Strengths:</strong> Creativity, communication, optimism</p>
                  <p><strong className="text-yellow-300">Challenges:</strong> Scattered energy, superficiality</p>
                  <p><strong className="text-yellow-300">Compatible:</strong> 1, 2, 5, 7</p>
                </div>
              </div>

              {/* Number 4 */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-5 border border-green-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
                  <div>
                    <h3 className="font-semibold text-green-300">The Builder</h3>
                    <p className="text-xs text-green-200">Uranus Energy</p>
                  </div>
                </div>
                <p className="text-sm text-green-100 mb-3">
                  Practical, reliable, and hardworking. They value stability, order, and systematic approaches. Natural organizers and planners.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-green-300">Strengths:</strong> Reliability, organization, persistence</p>
                  <p><strong className="text-green-300">Challenges:</strong> Rigidity, resistance to change</p>
                  <p><strong className="text-green-300">Compatible:</strong> 1, 5, 6, 7, 8</p>
                </div>
              </div>

              {/* Number 5 */}
              <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl p-5 border border-purple-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">5</div>
                  <div>
                    <h3 className="font-semibold text-purple-300">The Explorer</h3>
                    <p className="text-xs text-purple-200">Mercury Energy</p>
                  </div>
                </div>
                <p className="text-sm text-purple-100 mb-3">
                  Adventurous, curious, and freedom-loving. They seek variety, change, and new experiences. Natural communicators and travelers.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-purple-300">Strengths:</strong> Adaptability, curiosity, freedom</p>
                  <p><strong className="text-purple-300">Challenges:</strong> Restlessness, inconsistency</p>
                  <p><strong className="text-purple-300">Compatible:</strong> 1, 2, 3, 6</p>
                </div>
              </div>

              {/* Number 6 */}
              <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl p-5 border border-pink-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">6</div>
                  <div>
                    <h3 className="font-semibold text-pink-300">The Nurturer</h3>
                    <p className="text-xs text-pink-200">Venus Energy</p>
                  </div>
                </div>
                <p className="text-sm text-pink-100 mb-3">
                  Caring, responsible, and family-oriented. They have strong nurturing instincts, love beauty, and seek to create harmony in their environment.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-pink-300">Strengths:</strong> Compassion, responsibility, healing</p>
                  <p><strong className="text-pink-300">Challenges:</strong> Over-protectiveness, worry</p>
                  <p><strong className="text-pink-300">Compatible:</strong> 1, 4, 5, 7</p>
                </div>
              </div>

              {/* Number 7 */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-xl p-5 border border-indigo-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">7</div>
                  <div>
                    <h3 className="font-semibold text-indigo-300">The Seeker</h3>
                    <p className="text-xs text-indigo-200">Neptune Energy</p>
                  </div>
                </div>
                <p className="text-sm text-indigo-100 mb-3">
                  Spiritual, analytical, and introspective. They seek deeper truths, have strong intuition, and prefer quality over quantity in relationships.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-indigo-300">Strengths:</strong> Wisdom, intuition, analysis</p>
                  <p><strong className="text-indigo-300">Challenges:</strong> Isolation, over-thinking</p>
                  <p><strong className="text-indigo-300">Compatible:</strong> 1, 3, 4, 5, 6</p>
                </div>
              </div>

              {/* Number 8 */}
              <div className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-xl p-5 border border-gray-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-lg">8</div>
                  <div>
                    <h3 className="font-semibold text-gray-300">The Achiever</h3>
                    <p className="text-xs text-gray-200">Saturn Energy</p>
                  </div>
                </div>
                <p className="text-sm text-gray-100 mb-3">
                  Ambitious, material-focused, and business-minded. They have strong organizational skills, seek success, and understand power dynamics.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-gray-300">Strengths:</strong> Ambition, organization, material success</p>
                  <p><strong className="text-gray-300">Challenges:</strong> Materialism, workaholism</p>
                  <p><strong className="text-gray-300">Compatible:</strong> 3, 4, 5, 6, 7</p>
                </div>
              </div>

              {/* Number 9 */}
              <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl p-5 border border-teal-400/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">9</div>
                  <div>
                    <h3 className="font-semibold text-teal-300">The Humanitarian</h3>
                    <p className="text-xs text-teal-200">Mars Energy</p>
                  </div>
                </div>
                <p className="text-sm text-teal-100 mb-3">
                  Compassionate, generous, and service-oriented. They have a global perspective, strong sense of justice, and desire to help humanity.
                </p>
                <div className="text-xs space-y-1">
                  <p><strong className="text-teal-300">Strengths:</strong> Compassion, wisdom, service</p>
                  <p><strong className="text-teal-300">Challenges:</strong> Emotional extremes, martyrdom</p>
                  <p><strong className="text-teal-300">Compatible:</strong> 1, 3, 5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples & Tips */}
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 sm:p-8 border border-cyan-400/30">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              💡 Practical Examples & Tips
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Example Calculation */}
              <div>
                <h3 className="font-semibold text-cyan-300 mb-4">📝 Example Calculation</h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-cyan-200"><strong>Name:</strong> &quot;ARYA&quot;</p>
                    <p className="text-white">A(1) + R(2) + Y(1) + A(1) = 5</p>
                    <p className="text-cyan-100">Name Number: <strong>5</strong></p>
                  </div>
                  <div>
                    <p className="text-cyan-200"><strong>Birth Date:</strong> 15/08/2024</p>
                    <p className="text-white">Day Number: 1+5 = 6</p>
                    <p className="text-white">Life Path: 1+5+0+8+2+0+2+4 = 22 → 2+2 = 4</p>
                    <p className="text-cyan-100">Day Number (Mulank): <strong>6</strong>, Life Path (Bhagyank): <strong>4</strong></p>
                  </div>
                  <div className="border-t border-cyan-400/30 pt-3">
                    <p className="text-cyan-200"><strong>Result:</strong></p>
                    <p className="text-white">Name 5 with Day Number 6 (friendly) and Life Path 4 (neutral)</p>
                    <p className="text-green-300 font-semibold">75% - Great Match! ⭐</p>
                  </div>
                </div>
              </div>

              {/* Tips for Parents */}
              <div>
                <h3 className="font-semibold text-cyan-300 mb-4">👨‍👩‍👧‍👦 Tips for Parents</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">✨</div>
                    <div>
                      <p className="text-white font-medium">Consider Multiple Names</p>
                      <p className="text-cyan-100">Test several name options to find the best compatibility match for your child&apos;s birth date.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">🎯</div>
                    <div>
                      <p className="text-white font-medium">Balance is Key</p>
                      <p className="text-cyan-100">A 75% match might be better than 100% if it provides more balanced energy for your child&apos;s personality.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">💝</div>
                    <div>
                      <p className="text-white font-medium">Trust Your Intuition</p>
                      <p className="text-cyan-100">Numerology is a guide. Your parental intuition and family preferences are equally important.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 mt-1">🌱</div>
                    <div>
                      <p className="text-white font-medium">Growth Opportunities</p>
                      <p className="text-cyan-100">Even challenging combinations can lead to strength and character development through conscious awareness.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Letter Values Reference */}
            <div className="mt-8 bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-300 mb-3">🔤 Quick Letter Values Reference</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 1:</p>
                  <p className="text-white">A, I, J, Q, Y</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 2:</p>
                  <p className="text-white">B, K, R</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 3:</p>
                  <p className="text-white">C, G, L, S</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 4:</p>
                  <p className="text-white">D, M, T</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 5:</p>
                  <p className="text-white">E, H, N, X</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 6:</p>
                  <p className="text-white">U, V, W</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 7:</p>
                  <p className="text-white">O, Z</p>
                </div>
                <div>
                  <p className="text-cyan-200 font-medium mb-1">Value 8:</p>
                  <p className="text-white">F, P</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-cyan-200 italic">
                🔮 This numerology guide is based on traditional principles and is intended for entertainment,
                self-reflection, and guidance purposes. Every child is unique and special regardless of numerical compatibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
