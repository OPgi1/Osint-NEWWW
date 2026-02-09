import { NextRequest, NextResponse } from 'next/server'
import { osintEngine } from '@/lib/osint-engine'
import { securityManager } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting and security checks
    await securityManager.checkRateLimit()
    
    const body = await request.json()
    
    // Validate input
    const { name, username, email, phone, location } = body
    
    if (!name && !username && !email && !phone && !location) {
      return NextResponse.json(
        { error: 'At least one search parameter is required' },
        { status: 400 }
      )
    }
    
    // Sanitize inputs
    const sanitizedQuery = {
      name: name ? securityManager.sanitizeQuery(name) : undefined,
      username: username ? securityManager.sanitizeQuery(username) : undefined,
      email: email ? securityManager.sanitizeQuery(email) : undefined,
      phone: phone ? securityManager.sanitizeQuery(phone) : undefined,
      location: location ? securityManager.sanitizeQuery(location) : undefined,
    }
    
    // Check for malicious requests
    if (securityManager.shouldBlockRequest(request.url, JSON.stringify(sanitizedQuery))) {
      securityManager.logSecurityEvent('Blocked malicious request', { url: request.url, query: sanitizedQuery })
      return NextResponse.json(
        { error: 'Request blocked by security system' },
        { status: 403 }
      )
    }
    
    // Perform OSINT search
    const results = await osintEngine.search(sanitizedQuery)
    
    // Release rate limit slot
    securityManager.releaseSlot()
    
    // Log successful search
    securityManager.logSecurityEvent('OSINT search completed', { 
      query: sanitizedQuery, 
      resultsCount: results.length 
    })
    
    return NextResponse.json({
      success: true,
      results,
      metadata: {
        timestamp: new Date().toISOString(),
        query: sanitizedQuery,
        totalResults: results.length
      }
    })
    
  } catch (error) {
    console.error('Search API error:', error)
    
    // Release rate limit slot on error
    securityManager.releaseSlot()
    
    return NextResponse.json(
      { error: 'Search failed. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'UIO9 OSINT Search API',
      version: '1.0.0',
      endpoints: {
        POST: '/api/search - Perform OSINT search',
        GET: '/api/search - API information'
      },
      requirements: {
        'No external APIs': '100% free scraping',
        'Rate limiting': 'Smart request management',
        'Security': 'Anti-bot detection',
        'Privacy': 'No data storage'
      }
    },
    { status: 200 }
  )
}