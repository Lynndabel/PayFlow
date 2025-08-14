'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Zap, Globe } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Active Users',
    description: 'Growing community of crypto users',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
  },
  {
    icon: DollarSign,
    value: 10000,
    suffix: '+',
    label: 'Volume',
    description: 'Total value transferred',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
  },
  {
    icon: Zap,
    value: 3000,
    suffix: '+',
    label: 'Transactions',
    description: 'Completed successfully',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
  },
  {
    icon: Globe,
    value: 25,
    suffix: '+',
    label: 'Countries',
    description: 'Worldwide reach',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
  },
]

export function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('stats')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasAnimated])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const target = stat.value
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 16) // 60fps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        
        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = Math.floor(current)
          return newCounts
        })
      }, 16)
    })
  }

  return (
    <section id="stats" className="py-20 lg:py-32 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
      <div className="absolute inset-0 bg-spider-web opacity-10" />
      <div className="absolute inset-0 bg-floating-shapes opacity-20" />
      
      {/* Enhanced Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gold-500/8 rounded-full blur-3xl animate-float-fast" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gold-500/6 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-500/5 rounded-full blur-2xl animate-float-fast" />
      
      {/* New Animated Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400/60 rounded-full animate-bounce-slow" />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gold-300/50 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-gold-500/40 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }} />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-glass-gold rounded-full inline-block px-6 py-3 border border-gold-500/20 mb-6"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(234, 179, 8, 0.2)',
                  '0 0 30px rgba(234, 179, 8, 0.4)',
                  '0 0 20px rgba(234, 179, 8, 0.2)'
                ]
              }}
              transition={{ 
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <span className="text-gold-300 text-sm font-medium">Statistics</span>
            </motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
              }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trusted by
              </span>
              <br />
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent text-shadow-gold">
                thousands of users
              </span>
            </motion.h2>
            <motion.div 
              className="bg-glass rounded-2xl p-6 max-w-3xl mx-auto border border-gold-500/10"
              animate={{ 
                y: [0, -3, 0],
                boxShadow: [
                  '0 0 20px rgba(234, 179, 8, 0.1)',
                  '0 0 30px rgba(234, 179, 8, 0.2)',
                  '0 0 20px rgba(234, 179, 8, 0.1)'
                ]
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <p className="text-xl text-gray-300">
                Our platform has grown to serve a global community of crypto enthusiasts and businesses.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02, rotate: 1 }}
                className="group relative"
              >
                {/* Enhanced Floating background element */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* Main card */}
                <div className="relative bg-glass backdrop-blur-xl border border-gold-500/20 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-gold-500/40 transition-all duration-500 group-hover:shadow-gold-lg">
                  {/* Top content */}
                  <div>
                    {/* Enhanced Icon with animations */}
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      animate={{ 
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Icon className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors" />
                    </motion.div>
                    
                    {/* Enhanced Counter with glow effect */}
                    <div className="mb-4">
                      <motion.div 
                        className="text-3xl lg:text-4xl font-bold text-white mb-2"
                        animate={{ 
                          textShadow: [
                            '0 0 10px rgba(234, 179, 8, 0.3)',
                            '0 0 20px rgba(234, 179, 8, 0.6)',
                            '0 0 10px rgba(234, 179, 8, 0.3)'
                          ]
                        }}
                        transition={{ 
                          textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {counts[index].toLocaleString()}
                        <span className="text-gold-400">{stat.suffix}</span>
                      </motion.div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-gold-200 transition-colors">
                        {stat.label}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description - pushed to bottom */}
                  <div className="mt-auto">
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {stat.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Hover effect line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    animate={{ 
                      background: [
                        'linear-gradient(90deg, #eab308, #fde047, #eab308)',
                        'linear-gradient(90deg, #fde047, #eab308, #fde047)',
                        'linear-gradient(90deg, #eab308, #fde047, #eab308)'
                      ]
                    }}
                    transition={{ 
                      background: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div 
            className="bg-glass rounded-2xl p-8 border border-gold-500/10 max-w-4xl mx-auto"
            animate={{ 
              y: [0, -5, 0],
              boxShadow: [
                '0 0 20px rgba(234, 179, 8, 0.1)',
                '0 0 30px rgba(234, 179, 8, 0.2)',
                '0 0 20px rgba(234, 179, 8, 0.1)'
              ]
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <p className="text-gray-300 text-lg mb-4">
              Join our growing community and experience the future of payments
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              {[
                { text: 'Secure & Reliable' },
                { text: '24/7 Support' },
                { text: 'Global Coverage' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0, -2, 0]
                  }}
                  transition={{ 
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    delay: index * 0.5
                  }}
                >
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}