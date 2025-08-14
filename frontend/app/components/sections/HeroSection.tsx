'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ArrowRight, Smartphone, Zap, Shield } from 'lucide-react'

export function HeroSection() {
  const { isConnected } = useAccount()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beautiful, Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-950 via-black-900 to-black-950" />
      
      {/* Elegant Spider Web Background - Very Subtle */}
      <div className="absolute inset-0 bg-spider-web opacity-5" />
      
      {/* Beautiful Floating Orbs - Gentle and Subtle */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-gold-500/5 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-gold-500/4 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-gold-500/3 to-transparent rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '4s' }} />
      
      {/* Subtle Geometric Accents */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-gold-500/8 rotate-45 animate-float-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-gold-500/6 rotate-30 animate-float-slow" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Beautiful Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <motion.span 
                className="bg-gradient-to-r from-white via-gold-100 to-gold-200 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Flow Money Like
              </motion.span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Never Before
              </motion.span>
            </h1>
          </motion.div>

          {/* Elegant Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="bg-glass backdrop-blur-xl rounded-3xl p-8 max-w-4xl mx-auto border border-gold-500/10 shadow-gold">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                The future of payments is here. Send and receive crypto using just phone numbers or usernames. 
                <br />
                <span className="text-gold-300 font-medium">
                  No wallet addresses. No complexity. Just seamless transfers.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Beautiful Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12"
          >
            {[
              { icon: Smartphone, text: 'Phone Number Payments' },
              { icon: Shield, text: 'Secure & Decentralized' },
              { icon: Zap, text: 'Instant Transfers' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-glass backdrop-blur-xl rounded-2xl p-4 border border-gold-500/15 hover:border-gold-500/25 transition-all duration-300 hover:shadow-gold"
              >
                <div className="flex items-center space-x-2 text-gray-300">
                  <feature.icon className="w-5 h-5 text-gold-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Elegant CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={isConnected ? "/dashboard" : "/how-it-works"}
              className="group relative"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-white font-semibold rounded-xl shadow-gold hover:shadow-gold-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>{isConnected ? "Open Dashboard" : "Get Started"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link href="/how-it-works">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-glass hover:bg-glass-gold border border-gold-500/20 hover:border-gold-500/30 text-white font-semibold rounded-xl backdrop-blur-xl transition-all duration-300 hover:shadow-gold"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}