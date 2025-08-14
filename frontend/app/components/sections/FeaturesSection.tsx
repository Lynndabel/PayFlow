'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  Globe,
  Lock,
  Clock,
  Wallet,
  ArrowUpRight
} from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: 'Phone Number Payments',
    description: 'Send money using phone numbers or usernames instead of complex wallet addresses.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your funds are protected by audited smart contracts and decentralized infrastructure.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    description: 'Lightning-fast transactions powered by Mantle L2. Send money in seconds, not minutes.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
  {
    icon: Users,
    title: 'Social Payments',
    description: 'Build your payment network with friends and family. Easy onboarding with familiar identifiers.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Send money anywhere in the world instantly. No borders, no banks, no delays.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
  {
    icon: Lock,
    title: 'Self-Custody',
    description: 'You own your keys, you own your crypto. Non-custodial solution with full user control.',
    color: 'from-gold-500 to-gold-600',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
  },
]

const advancedFeatures = [
  {
    title: 'Batch Payments',
    description: 'Send money to multiple recipients in a single transaction',
    icon: Users,
  },
  {
    title: 'Payment Requests',
    description: 'Request payments from others with expiry dates',
    icon: Clock,
  },
  {
    title: 'Scheduled Payments',
    description: 'Set up recurring payments for subscriptions',
    icon: Clock,
  },
  {
    title: 'Multi-Token Support',
    description: 'Support for ETH and ERC-20 tokens',
    icon: Wallet,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />
      <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
      <div className="absolute inset-0 bg-floating-shapes opacity-20" />
      
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
              <span className="text-gold-300 text-sm font-medium">Features</span>
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
                Everything you need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent text-shadow-gold">
                modern payments
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
                Built for the future of finance. PayFlow combines the best of traditional banking 
                with the power of decentralized technology.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
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
                <div className="relative bg-glass backdrop-blur-xl border border-gold-500/20 rounded-3xl p-8 hover:border-gold-500/40 transition-all duration-500 group-hover:shadow-gold-lg">
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
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  
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

        {/* Enhanced Advanced features section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold mb-8"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                Advanced Capabilities
              </span>
            </motion.h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advancedFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
                className="group"
              >
                <motion.div 
                  className="bg-glass-gold backdrop-blur-xl border border-gold-500/20 rounded-2xl p-6 text-center hover:border-gold-500/40 transition-all duration-300 hover:shadow-gold"
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
                    className="w-12 h-12 bg-gradient-to-r from-gold-500/30 to-gold-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    animate={{ 
                      rotate: [0, 3, 0, -3, 0],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Icon className="w-6 h-6 text-gold-400" />
                  </motion.div>
                  <h4 className="font-semibold text-white mb-2 group-hover:text-gold-200 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}