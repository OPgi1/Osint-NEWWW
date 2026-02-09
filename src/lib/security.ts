// Security and Privacy Module
// Handles rate limiting, anti-bot detection, and privacy measures

export interface SecurityConfig {
  maxRequestsPerMinute: number
  maxConcurrentRequests: number
  userAgentRotation: boolean
  proxySupport: boolean
  respectRobotsTxt: boolean
  delayBetweenRequests: number
}

export class SecurityManager {
  private config: SecurityConfig
  private requestCount = 0
  private lastRequestTime = 0
  private requestQueue: Array<() => void> = []
  private activeRequests = 0
  
  constructor(config?: Partial<SecurityConfig>) {
    this.config = {
      maxRequestsPerMinute: 60,
      maxConcurrentRequests: 3,
      userAgentRotation: true,
      proxySupport: false,
      respectRobotsTxt: true,
      delayBetweenRequests: 1000,
      ...config
    }
  }

  /**
   * Check if request is allowed based on rate limiting
   */
  async checkRateLimit(): Promise<void> {
    const now = Date.now()
    const minuteAgo = now - 60000
    
    // Clean up old request counts
    if (this.lastRequestTime < minuteAgo) {
      this.requestCount = 0
      this.lastRequestTime = now
    }
    
    // Check concurrent request limit
    if (this.activeRequests >= this.config.maxConcurrentRequests) {
      await this.waitForSlot()
    }
    
    // Check rate limit
    if (this.requestCount >= this.config.maxRequestsPerMinute) {
      const waitTime = 60000 - (now - this.lastRequestTime)
      await this.delay(waitTime + 1000) // Add buffer
      this.requestCount = 0
      this.lastRequestTime = Date.now()
    }
    
    this.requestCount++
    this.activeRequests++
  }

  /**
   * Wait for available slot
   */
  private async waitForSlot(): Promise<void> {
    return new Promise((resolve) => {
      this.requestQueue.push(resolve)
    })
  }

  /**
   * Release slot when request completes
   */
  releaseSlot(): void {
    this.activeRequests--
    
    if (this.requestQueue.length > 0) {
      const nextRequest = this.requestQueue.shift()
      if (nextRequest) {
        nextRequest()
      }
    }
  }

  /**
   * Get random user agent for rotation
   */
  getUserAgent(): string {
    if (!this.config.userAgentRotation) {
      return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ]
    
    return userAgents[Math.floor(Math.random() * userAgents.length)]
  }

  /**
   * Check robots.txt compliance (simplified)
   */
  async checkRobotsTxt(url: string): Promise<boolean> {
    if (!this.config.respectRobotsTxt) {
      return true
    }
    
    try {
      // In a real implementation, this would fetch and parse robots.txt
      // For now, return true to allow all requests in demo
      return true
    } catch (error) {
      console.warn('Failed to check robots.txt:', error)
      return true // Allow request if robots.txt check fails
    }
  }

  /**
   * Add delay between requests
   */
  async delay(ms: number = this.config.delayBetweenRequests): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Detect and handle bot detection measures
   */
  async handleBotDetection(response: Response): Promise<void> {
    const headers = response.headers
    
    // Check for common bot detection headers
    if (headers.get('x-robots-tag') === 'noindex') {
      console.warn('Bot detection detected - applying countermeasures')
      await this.delay(5000) // Longer delay
    }
    
    // Check for Cloudflare challenge
    if (response.status === 503 && response.headers.get('server')?.includes('cloudflare')) {
      throw new Error('Cloudflare protection detected - request blocked')
    }
    
    // Check for rate limiting headers
    if (response.status === 429) {
      const retryAfter = response.headers.get('retry-after')
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000
      await this.delay(delay)
    }
  }

  /**
   * Validate URL for security
   */
  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      
      // Only allow HTTP and HTTPS
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false
      }
      
      // Block localhost and internal IPs
      const hostname = urlObj.hostname
      if (hostname === 'localhost' || 
          hostname.startsWith('127.') ||
          hostname.startsWith('10.') ||
          hostname.startsWith('192.168.') ||
          hostname.match(/^172\.(1[6-9]|2\d|3[01])\./)) {
        return false
      }
      
      return true
    } catch {
      return false
    }
  }

  /**
   * Sanitize search query
   */
  sanitizeQuery(query: string): string {
    // Remove potentially dangerous characters
    return query
      .replace(/[<>\"'&]/g, '') // Remove HTML/XML special chars
      .replace(/\.{2,}/g, '.') // Remove multiple dots
      .replace(/[\/\\]/g, '') // Remove path traversal attempts
      .trim()
      .slice(0, 200) // Limit length
  }

  /**
   * Generate request headers with security measures
   */
  getRequestHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'User-Agent': this.getUserAgent(),
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Cache-Control': 'max-age=0'
    }
    
    // Add additional headers
    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders)
    }
    
    return headers
  }

  /**
   * Check if request should be blocked
   */
  shouldBlockRequest(url: string, query?: string): boolean {
    // Check for malicious patterns
    const maliciousPatterns = [
      /\/wp-admin/i,
      /\/admin/i,
      /\/phpmyadmin/i,
      /\/\.env/i,
      /\/config/i,
      /\/backup/i
    ]
    
    if (maliciousPatterns.some(pattern => pattern.test(url))) {
      return true
    }
    
    // Check for excessive query length
    if (query && query.length > 1000) {
      return true
    }
    
    return false
  }

  /**
   * Log security event
   */
  logSecurityEvent(event: string, details?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    
    console.log('Security Event:', logEntry)
    
    // In a real implementation, this would send to a security logging service
    // For demo, we'll just log to console
  }
}

// Export default security manager
export const securityManager = new SecurityManager({
  maxRequestsPerMinute: 30,
  maxConcurrentRequests: 2,
  userAgentRotation: true,
  respectRobotsTxt: true,
  delayBetweenRequests: 2000
})