export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Discover Your Baby&apos;s
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Perfect Name
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Unlock the mystical power of numerology to find names that align with your child&apos;s destiny.
              Combine ancient wisdom with modern insights for the perfect match.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="/calculator"
                className="mystical-glow px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                ✨ Start Calculator
              </a>
              <a
                href="/numerology-table"
                className="mystical-glow px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                📋 Compare Names
              </a>
              <a
                href="/guide"
                className="px-8 py-4 border-2 border-purple-400 text-purple-200 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300 inline-block text-center"
              >
                📖 Learn About Numerology
              </a>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">🔮</div>
                <h3 className="text-xl font-semibold text-white mb-2">Destiny Numbers</h3>
                <p className="text-purple-200 text-sm">Calculate life path numbers and find names that resonate with your child&apos;s cosmic energy.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-white mb-2">Birth Date Magic</h3>
                <p className="text-purple-200 text-sm">Align names with birth dates for maximum harmony and positive vibrations.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="text-3xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-white mb-2">Name Compatibility</h3>
                <p className="text-purple-200 text-sm">Discover how names influence personality traits and future potential.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
      </section>
    </div>
  );
}
