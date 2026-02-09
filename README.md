# UIO9 OSINT Investigation Tool

![UIO9 Banner](https://via.placeholder.com/1200x400/0f172a/ffffff?text=UIO9+OSINT+Investigation+Tool)

**Advanced web-based OSINT tool for digital investigation and intelligence gathering**

## 🎯 Overview

UIO9 is a powerful, 100% free OSINT investigation tool built with Next.js that allows investigators, researchers, and security professionals to gather intelligence from public sources without relying on any paid APIs or external services.

### 🔐 Key Features

- **No External APIs**: 100% free scraping and correlation
- **Multi-Platform Search**: Username, email, phone, name, and location searches
- **Advanced Security**: Rate limiting, anti-bot detection, privacy protection
- **Professional UI**: Cyberpunk/OSINT themed interface with dark theme
- **Export Capabilities**: TXT, JSON, and HTML report generation
- **Vercel Ready**: Optimized for free Vercel deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vercel account (for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd UIO9
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## 📋 Search Capabilities

### Input Types
- **Name Search**: Full or partial names
- **Username Search**: Cross-platform username correlation
- **Email Investigation**: Breach analysis and forum searches
- **Phone Lookup**: Directory and social media correlation
- **Location Analysis**: Geographic-based intelligence
- **Reverse Image Search**: Image metadata and similarity analysis

### Supported Platforms
- Social Media: Facebook, Twitter, Instagram, TikTok, Reddit
- Professional: LinkedIn, GitHub
- Forums and Communities
- Public Directories
- Data Breach Databases
- Search Engine Results

## 🔧 Technical Architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom OSINT theme
- **State Management**: React Hooks + Context
- **Validation**: Zod + React Hook Form
- **Animations**: Framer Motion

### Backend
- **API Routes**: Next.js Serverless Functions
- **Security**: Custom security manager with rate limiting
- **Scraping**: Cheerio-based web scraping
- **Correlation**: Advanced result analysis and deduplication

### Security Features
- **Rate Limiting**: Smart request management
- **User Agent Rotation**: Anti-detection measures
- **Input Sanitization**: XSS and injection prevention
- **Request Validation**: URL and query validation
- **Security Logging**: Comprehensive event logging

## 📊 Results Analysis

### Confidence Scoring
- **High**: Multiple source correlation, verified data
- **Medium**: Single source with good indicators
- **Low**: Unverified or partial matches

### Timeline Analysis
- Last seen dates
- Activity patterns
- Platform usage analysis

### Risk Assessment
- Account verification status
- Privacy settings analysis
- Suspicious activity indicators

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Next.js project
   - Deploy with default settings

3. **Environment Variables:**
   No environment variables required for basic functionality

### Docker Deployment

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
USER node
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000
CMD ["npm", "start"]
```

## 📈 Performance Optimization

### Vercel Free Plan Optimization
- **Bundle Size**: Minimized dependencies
- **Serverless Functions**: Optimized for cold starts
- **Static Assets**: Efficient caching strategies
- **Image Optimization**: Built-in Next.js image optimization

### Rate Limiting Strategy
- **Per-minute limits**: Prevents abuse
- **Concurrent request limits**: Avoids server overload
- **Smart delays**: Mimics human behavior
- **Queue management**: Handles high traffic

## 🔍 OSINT Methodology

### Search Strategy
1. **Multi-source correlation**: Cross-reference multiple platforms
2. **Pattern analysis**: Identify username patterns and variations
3. **Metadata extraction**: Extract hidden information from files
4. **Timeline building**: Create activity chronologies
5. **Risk assessment**: Evaluate potential threats

### Data Sources
- **Public APIs**: Where available and free
- **Web scraping**: Direct site analysis
- **Search engines**: Google-style result simulation
- **Social media**: Platform-specific search patterns
- **Forums**: Community and discussion analysis

## ⚖️ Legal Compliance

### Disclaimer
This tool is for **educational and research purposes only**. All data is gathered from public sources (OSINT). Users are responsible for complying with applicable laws and regulations.

### Usage Guidelines
- ✅ **Allowed**: Public profile analysis, research, education
- ❌ **Prohibited**: Unauthorized access, privacy violations, harassment
- ⚠️ **Caution**: Always respect robots.txt and terms of service

### Privacy Protection
- **No data storage**: Results are not persisted
- **Client-side processing**: Minimal server processing
- **Anonymous usage**: No user tracking
- **Secure transmission**: HTTPS encryption

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow existing code style
- Add appropriate comments for complex logic
- Test new features thoroughly
- Update documentation as needed

## 🐛 Bug Reports

Please report bugs through the GitHub Issues section with:
- Detailed description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

**Developed By**: Sherlock  
**Telegram**: [@tx_5w](https://t.me/tx_5w)  
**Instagram**: [@j.86vb](https://instagram.com/j.86vb)  
**TikTok**: [@default_room105](https://tiktok.com/@default_room105)

### Special Thanks
- OSINT community for methodologies and best practices
- Open source libraries that make this possible
- Security researchers for sharing knowledge

## 🔗 Related Projects

- [Maltego](https://www.maltego.com/) - Professional OSINT platform
- [SpiderFoot](https://www.spiderfoot.net/) - Automated OSINT collection
- [theHarvester](https://github.com/laramies/theHarvester) - Email and username harvesting
- [Recon-ng](https://github.com/lanmaster53/recon-ng) - Web reconnaissance framework

---

**⚠️ WARNING**: This tool is for educational and research purposes only. Users are responsible for complying with all applicable laws and regulations. The developers are not responsible for any misuse of this tool.