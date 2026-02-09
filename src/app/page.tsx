'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search as SearchIcon,
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Globe,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Validation schema
const searchSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.any().optional(),
  location: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

export default function Home() {
  const [isSearching, setIsSearching] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema)
  })

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    setResults([])

    try {
      // Simulate OSINT search
      const searchResults = await performOSINTSearch(data)
      setResults(searchResults)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle image upload for reverse image search
      console.log('Image uploaded:', file.name)
    }
  }

  const exportResults = (format: 'json' | 'txt' | 'html') => {
    const data = JSON.stringify(results, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `uio9_results_${Date.now()}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-osint-primary via-osint-accent to-osint-warning bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          UIO9 OSINT Engine
        </motion.h1>
        <motion.p 
          className="text-osint-muted mt-2 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Advanced Digital Investigation & Intelligence Gathering
        </motion.p>
      </div>

      {/* Legal Disclaimer */}
      <motion.div 
        className="bg-osint-panel border border-osint-border rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-osint-warning mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-osint-text">Legal Notice</h3>
            <p className="text-sm text-osint-muted mt-1">
              This tool is for educational and research purposes only. All data is gathered from public sources (OSINT).
              Users are responsible for complying with applicable laws and regulations. No hacking, unauthorized access,
              or privacy violations are permitted.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search Form */}
      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-osint-panel border border-osint-border rounded-xl p-6 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Basic Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
              <User className="w-4 h-4" />
              <span>Full Name / Partial Name</span>
            </label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text placeholder-osint-muted focus:outline-none focus:border-osint-primary focus:ring-1 focus:ring-osint-primary transition-colors"
              placeholder="Enter full name or partial name..."
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
              <User className="w-4 h-4" />
              <span>Username</span>
            </label>
            <input
              {...register('username')}
              className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text placeholder-osint-muted focus:outline-none focus:border-osint-primary focus:ring-1 focus:ring-osint-primary transition-colors"
              placeholder="Enter username to search across platforms..."
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text placeholder-osint-muted focus:outline-none focus:border-osint-primary focus:ring-1 focus:ring-osint-primary transition-colors"
              placeholder="user@example.com"
            />
            {errors.email && <p className="text-osint-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </label>
            <input
              {...register('phone')}
              className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text placeholder-osint-muted focus:outline-none focus:border-osint-primary focus:ring-1 focus:ring-osint-primary transition-colors"
              placeholder="+1234567890 or 123-456-7890"
            />
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-osint-muted hover:text-osint-text transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Advanced Options {showAdvanced ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Advanced Fields */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-osint-border pt-4"
            >
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Reverse Image Search</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-osint-primary file:text-black hover:file:bg-osint-accent file:cursor-pointer"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-osint-muted mb-2">
                  <Globe className="w-4 h-4" />
                  <span>Location / Country</span>
                </label>
                <input
                  {...register('location')}
                  className="w-full px-4 py-3 bg-osint-bg border border-osint-border rounded-lg text-osint-text placeholder-osint-muted focus:outline-none focus:border-osint-primary focus:ring-1 focus:ring-osint-primary transition-colors"
                  placeholder="Country, city, or region..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-osint-primary to-osint-accent text-black font-bold rounded-lg hover:shadow-lg hover:shadow-osint-primary/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <SearchIcon className="w-5 h-5" />
            <span>{isSearching ? 'Searching...' : 'Initiate OSINT Search'}</span>
            {isSearching && (
              <div className="w-5 h-5 border-2 border-black border-t-osint-bg rounded-full animate-spin"></div>
            )}
          </button>
        </div>
      </motion.form>

      {/* Results Section */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-osint-panel border border-osint-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-osint-text">Search Results</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-osint-muted">Found {results.length} potential matches</span>
                <button
                  onClick={() => exportResults('json')}
                  className="flex items-center space-x-2 px-4 py-2 bg-osint-border rounded-lg text-osint-text hover:bg-osint-accent hover:text-black transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-osint-border rounded-lg p-4 hover:bg-osint-bg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-osint-text">{result.title}</h3>
                      <p className="text-sm text-osint-muted">{result.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-osint-muted">
                        <span className={`flex items-center space-x-1 ${result.confidence === 'high' ? 'text-osint-accent' : result.confidence === 'medium' ? 'text-osint-warning' : 'text-osint-muted'}`}>
                          <CheckCircle className="w-3 h-3" />
                          <span>{result.confidence} confidence</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Last seen: {result.lastSeen}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-osint-border rounded text-xs text-osint-text hover:bg-osint-accent hover:text-black transition-colors"
                      >
                        View Source
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Status */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 bg-osint-panel border border-osint-border rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-osint-accent rounded-full animate-pulse"></div>
              <span className="text-sm text-osint-text font-medium">Scanning public sources...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Mock OSINT search function
async function performOSINTSearch(data: SearchFormData): Promise<any[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const results: any[] = []

  if (data.name) {
    results.push({
      title: `Social Media Profiles for "${data.name}"`,
      description: 'Found potential matches on Facebook, Twitter, and LinkedIn',
      confidence: 'high',
      lastSeen: '2 days ago',
      url: '#',
      source: 'Social Media Scraping'
    })
  }

  if (data.username) {
    results.push({
      title: `Username "${data.username}" Analysis`,
      description: 'Username found on multiple platforms with activity patterns',
      confidence: 'medium',
      lastSeen: '1 week ago',
      url: '#',
      source: 'Username Correlation'
    })
  }

  if (data.email) {
    results.push({
      title: `Email "${data.email}" Investigation`,
      description: 'Email associated with multiple online services and forums',
      confidence: 'high',
      lastSeen: 'Recently',
      url: '#',
      source: 'Email Analysis'
    })
  }

  if (data.phone) {
    results.push({
      title: `Phone Number "${data.phone}" Research`,
      description: 'Phone number linked to business listings and social profiles',
      confidence: 'medium',
      lastSeen: '1 month ago',
      url: '#',
      source: 'Phone Lookup'
    })
  }

  return results
}