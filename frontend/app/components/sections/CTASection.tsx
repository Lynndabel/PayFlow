'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ArrowRight, Rocket, Star, Zap, Shield, Globe } from 'lucide-react'

export function CTASection() {
  const { isConnected } = useAccount()

  return (
    <section className="py-20 lg:py-32 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
      <div className="absolute inset-0 bg-spider-web opacity-15" />
      <div className="absolute inset-0 bg-floating-shapes opacity-25" />
      
      {/* Enhanced Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gold-500/8 rounded-full blur-3xl animate-float-fast" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gold-500/6 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-500/5 rounded-full blur-2xl animate-float-fast" />
      
      {/* New Animated Particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gold-400/60 rounded-full animate-bounce-slow" />
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-gold-300/50 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-gold-500/40 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }} />
      
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
              <span className="text-gold-300 text-sm font-medium">Get Started</span>
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
                Ready to Experience
              </span>
              <br />
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent text-shadow-gold">
                the Future of Payments?
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
                Join thousands of users who are already experiencing the future of crypto payments. 
                Start flowing money with just phone numbers today.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link
            href={isConnected ? "/dashboard" : "/how-it-works"}
            className="group relative"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-gold-500/25 transition-all duration-300 flex items-center space-x-3"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(234, 179, 8, 0.3)',
                  '0 0 40px rgba(234, 179, 8, 0.6)',
                  '0 0 20px rgba(234, 179, 8, 0.3)'
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <span>{isConnected ? "Open Dashboard" : "Get Started Now"}</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
            
            {/* Enhanced Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700 rounded-2xl opacity-30 blur-xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Link>

          <Link href="/how-it-works">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-glass hover:bg-glass-gold border border-gold-500/30 hover:border-gold-500/50 text-white text-lg font-semibold rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-gold"
              animate={{
                borderColor: ['rgba(234, 179, 8, 0.3)', 'rgba(234, 179, 8, 0.6)', 'rgba(234, 179, 8, 0.3)']
              }}
              transition={{
                borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: 'Bank-grade security with decentralized infrastructure'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Instant transactions powered by Mantle L2'
            },
            {
              icon: Globe,
              title: 'Global Access',
              description: 'Send money anywhere in the world instantly'
            }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
                className="group text-center"
              >
                <motion.div 
                  className="bg-glass backdrop-blur-xl border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-all duration-300 hover:shadow-gold"
                  animate={{ 
                    y: [0, -3, 0],
                    boxShadow: [
                      '0 0 10px rgba(234, 179, 8, 0.1)',
                      '0 0 20px rgba(234, 179, 8, 0.2)',
                      '0 0 10px rgba(234, 179, 8, 0.1)'
                    ]
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    delay: index * 0.2
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Icon className="w-8 h-8 text-gold-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <motion.div 
            className="bg-glass-gold rounded-2xl p-8 border border-gold-500/20 max-w-4xl mx-auto"
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
            <p className="text-gray-300 text-lg mb-6">
              Ready to revolutionize your payment experience?
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              {[
                { text: 'No Setup Fees' },
                { text: 'Instant Transfers' },
                { text: '24/7 Support' }
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