// Export functionality for search results
// Supports TXT, JSON, and HTML formats

export interface ExportOptions {
  format: 'txt' | 'json' | 'html'
  includeMetadata: boolean
  includeTimestamp: boolean
  includeConfidence: boolean
  includeSource: boolean
}

export interface SearchResult {
  title: string
  description: string
  confidence: 'low' | 'medium' | 'high'
  lastSeen: string
  url: string
  source: string
  platform?: string
  username?: string
  email?: string
  phone?: string
  name?: string
}

export class ExportManager {
  /**
   * Export results to specified format
   */
  exportResults(results: SearchResult[], query: any, options: ExportOptions): string {
    const timestamp = new Date().toISOString()
    
    switch (options.format) {
      case 'txt':
        return this.exportToTXT(results, query, options, timestamp)
      case 'json':
        return this.exportToJSON(results, query, options, timestamp)
      case 'html':
        return this.exportToHTML(results, query, options, timestamp)
      default:
        throw new Error(`Unsupported export format: ${options.format}`)
    }
  }

  /**
   * Export to plain text format
   */
  private exportToTXT(
    results: SearchResult[], 
    query: any, 
    options: ExportOptions, 
    timestamp: string
  ): string {
    let content = ''
    
    // Header
    content += 'UIO9 OSINT Investigation Report\n'
    content += '='.repeat(40) + '\n\n'
    
    if (options.includeTimestamp) {
      content += `Generated: ${new Date(timestamp).toLocaleString()}\n`
    }
    
    if (options.includeMetadata) {
      content += 'Search Query:\n'
      content += this.formatQueryTXT(query) + '\n\n'
    }
    
    content += `Total Results: ${results.length}\n\n`
    
    // Results
    results.forEach((result, index) => {
      content += `Result ${index + 1}\n`
      content += '-'.repeat(20) + '\n'
      content += `Title: ${result.title}\n`
      content += `Description: ${result.description}\n`
      
      if (options.includeConfidence) {
        content += `Confidence: ${result.confidence.toUpperCase()}\n`
      }
      
      if (options.includeSource) {
        content += `Source: ${result.source}\n`
        if (result.platform) {
          content += `Platform: ${result.platform}\n`
        }
      }
      
      content += `Last Seen: ${result.lastSeen}\n`
      content += `URL: ${result.url}\n`
      
      // Additional fields
      if (result.username) content += `Username: ${result.username}\n`
      if (result.email) content += `Email: ${result.email}\n`
      if (result.phone) content += `Phone: ${result.phone}\n`
      if (result.name) content += `Name: ${result.name}\n`
      
      content += '\n'
    })
    
    content += '='.repeat(40) + '\n'
    content += 'End of Report\n'
    
    return content
  }

  /**
   * Export to JSON format
   */
  private exportToJSON(
    results: SearchResult[], 
    query: any, 
    options: ExportOptions, 
    timestamp: string
  ): string {
    const exportData = {
      metadata: {
        tool: 'UIO9 OSINT Engine',
        version: '1.0.0',
        timestamp: timestamp,
        query: options.includeMetadata ? query : undefined,
        totalResults: results.length
      },
      results: results.map(result => {
        const resultData: any = {
          title: result.title,
          description: result.description,
          confidence: result.confidence,
          lastSeen: result.lastSeen,
          url: result.url,
          source: result.source
        }
        
        if (result.platform) resultData.platform = result.platform
        if (result.username) resultData.username = result.username
        if (result.email) resultData.email = result.email
        if (result.phone) resultData.phone = result.phone
        if (result.name) resultData.name = result.name
        
        return resultData
      })
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  /**
   * Export to HTML format
   */
  private exportToHTML(
    results: SearchResult[], 
    query: any, 
    options: ExportOptions, 
    timestamp: string
  ): string {
    const date = new Date(timestamp).toLocaleString()
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UIO9 OSINT Investigation Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .metadata {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metadata h3 {
            margin-top: 0;
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .query-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .query-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .query-label {
            font-weight: bold;
            color: #667eea;
            display: block;
            margin-bottom: 5px;
        }
        .results-count {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            margin: 20px 0;
        }
        .results-grid {
            display: grid;
            gap: 20px;
        }
        .result-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .result-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .result-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .result-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            margin: 0;
        }
        .confidence-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        .confidence-high { background-color: #d1fae5; color: #065f46; }
        .confidence-medium { background-color: #fef3c7; color: #92400e; }
        .confidence-low { background-color: #fee2e2; color: #991b1b; }
        .result-description {
            color: #666;
            margin-bottom: 15px;
        }
        .result-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            font-size: 0.9rem;
        }
        .detail-item {
            background: #f8f9fa;
            padding: 8px;
            border-radius: 4px;
        }
        .detail-label {
            font-weight: bold;
            color: #667eea;
            display: block;
            margin-bottom: 4px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: white;
            border-radius: 8px;
            color: #666;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .disclaimer {
            font-size: 0.8rem;
            color: #999;
            margin-top: 10px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔍 UIO9 OSINT Investigation Report</h1>
        <p>Advanced Digital Intelligence Gathering & Analysis</p>
    </div>

    <div class="metadata">
        <h3>Investigation Metadata</h3>
        <div class="query-info">
            <div class="query-item">
                <span class="query-label">Generated</span>
                <span>${date}</span>
            </div>
            <div class="query-item">
                <span class="query-label">Tool Version</span>
                <span>UIO9 OSINT Engine v1.0.0</span>
            </div>
            <div class="query-item">
                <span class="query-label">Total Results</span>
                <span>${results.length}</span>
            </div>
            <div class="query-item">
                <span class="query-label">Export Format</span>
                <span>HTML Report</span>
            </div>
        </div>
    </div>

    <div class="results-count">
        Found ${results.length} Potential Matches
    </div>

    <div class="results-grid">
        ${results.map((result, index) => `
            <div class="result-card">
                <div class="result-header">
                    <h3 class="result-title">${this.escapeHtml(result.title)}</h3>
                    <span class="confidence-badge confidence-${result.confidence}">
                        ${result.confidence}
                    </span>
                </div>
                <p class="result-description">${this.escapeHtml(result.description)}</p>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Source</span>
                        <span>${this.escapeHtml(result.source)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Last Seen</span>
                        <span>${this.escapeHtml(result.lastSeen)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Platform</span>
                        <span>${result.platform || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">URL</span>
                        <span><a href="${this.escapeHtml(result.url)}" target="_blank">${this.escapeHtml(result.url)}</a></span>
                    </div>
                    ${result.username ? `
                        <div class="detail-item">
                            <span class="detail-label">Username</span>
                            <span>${this.escapeHtml(result.username)}</span>
                        </div>
                    ` : ''}
                    ${result.email ? `
                        <div class="detail-item">
                            <span class="detail-label">Email</span>
                            <span>${this.escapeHtml(result.email)}</span>
                        </div>
                    ` : ''}
                    ${result.phone ? `
                        <div class="detail-item">
                            <span class="detail-label">Phone</span>
                            <span>${this.escapeHtml(result.phone)}</span>
                        </div>
                    ` : ''}
                    ${result.name ? `
                        <div class="detail-item">
                            <span class="detail-label">Name</span>
                            <span>${this.escapeHtml(result.name)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>Report generated by UIO9 OSINT Engine</p>
        <div class="disclaimer">
            This report contains information gathered from public sources only. 
            All data is for educational and research purposes. 
            Users are responsible for complying with applicable laws and regulations.
        </div>
    </div>

    <script>
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.result-card');
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = this.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
                });
            });
        });
    </script>
</body>
</html>`
  }

  /**
   * Format query for TXT export
   */
  private formatQueryTXT(query: any): string {
    let formatted = ''
    
    if (query.name) formatted += `Name: ${query.name}\n`
    if (query.username) formatted += `Username: ${query.username}\n`
    if (query.email) formatted += `Email: ${query.email}\n`
    if (query.phone) formatted += `Phone: ${query.phone}\n`
    if (query.location) formatted += `Location: ${query.location}\n`
    
    return formatted || 'No specific query parameters'
  }

  /**
   * Escape HTML for safe output
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  /**
   * Download file to user's device
   */
  downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  /**
   * Export and download file
   */
  exportAndDownload(
    results: SearchResult[], 
    query: any, 
    options: ExportOptions
  ): void {
    const content = this.exportResults(results, query, options)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `uio9_osint_report_${timestamp}.${options.format}`
    const mimeType = this.getMimeType(options.format)
    
    this.downloadFile(content, filename, mimeType)
  }

  /**
   * Get MIME type for format
   */
  private getMimeType(format: string): string {
    switch (format) {
      case 'txt': return 'text/plain'
      case 'json': return 'application/json'
      case 'html': return 'text/html'
      default: return 'text/plain'
    }
  }
}

// Export singleton instance
export const exportManager = new ExportManager()