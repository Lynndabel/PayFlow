'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wallet, Github, X, MessageCircle, Heart } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '/#features' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Smart Contracts', href: '/contracts' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'X', href: '#', icon: X },
    { name: 'Discord', href: '#', icon: MessageCircle },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-dark-900/50 border-t border-dark-700/50 backdrop-blur-xl overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="absolute inset-0 bg-floating-shapes opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gold-500/10 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-gold-500/8 rounded-full blur-2xl animate-float-fast" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Enhanced Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg opacity-20 blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                PayFlow
              </span>
            </Link>
            <div className="bg-glass rounded-2xl p-6 border border-gold-500/10 mb-6">
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                The future of payments is here. Send crypto using phone numbers or usernames. 
                No complicated wallet addresses, no friction - just simple, secure transactions.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-glass hover:bg-glass-gold border border-gold-500/20 hover:border-gold-500/40 rounded-lg flex items-center justify-center transition-all duration-200 group hover:shadow-gold"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-gold-400 transition-colors" />
                    <span className="sr-only">{item.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Enhanced Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom section */}
        <div className="mt-12 pt-8 border-t border-dark-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2025 PayFlow. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>for the Web3 community</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="bg-glass-gold rounded-full px-4 py-2 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-gold">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                  <span className="text-gold-400 font-medium">Mantle Testnet</span>
                </div>
              </div>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Gradient decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
    </footer>
  )
}