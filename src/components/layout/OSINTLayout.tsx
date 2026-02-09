'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Shield, 
  Database, 
  Eye, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'

interface OSINTLayoutProps {
  children: React.ReactNode
}

export function OSINTLayout({ children }: OSINTLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    {
      name: 'Search Engine',
      href: '/',
      icon: Search,
      description: 'Main OSINT search interface'
    },
    {
      name: 'Database',
      href: '/database',
      icon: Database,
      description: 'Search history and saved results'
    },
    {
      name: 'Analyzer',
      href: '/analyzer',
      icon: Eye,
      description: 'Advanced data analysis tools'
    },
    {
      name: 'Security',
      href: '/security',
      icon: Shield,
      description: 'Privacy and security settings'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Tool configuration'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-osint-bg via-osint-panel to-osint-bg">
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative border-b border-osint-border bg-osint-panel/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-osint-primary to-osint-accent rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-black">UIO9</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-osint-text">UIO9 OSINT</h1>
                <p className="text-xs text-osint-muted">Digital Investigation Suite</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-osint-muted hover:text-osint-text transition-colors group"
                >
                  <item.icon className="w-4 h-4 group-hover:text-osint-primary transition-colors" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-osint-muted hover:text-osint-text hover:bg-osint-border transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed md:static left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-osint-border bg-osint-panel/80 backdrop-blur-sm z-50"
            >
              <div className="p-4">
                <h2 className="text-sm font-semibold text-osint-muted uppercase tracking-wider mb-4">
                  Investigation Tools
                </h2>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-osint-muted hover:text-osint-text hover:bg-osint-border transition-all group"
                    >
                      <item.icon className="w-5 h-5 text-osint-secondary group-hover:text-osint-primary transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-osint-muted group-hover:text-osint-muted/80 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </nav>

                {/* Status indicators */}
                <div className="mt-8 pt-4 border-t border-osint-border">
                  <div className="flex items-center justify-between text-xs text-osint-muted">
                    <span>System Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-osint-accent rounded-full animate-pulse"></div>
                      <span className="text-osint-accent font-medium">ONLINE</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-osint-muted">
                    No API dependencies • 100% Free • Privacy First
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}