# EchoMail Deployment Guide

This guide provides step-by-step instructions for deploying the EchoMail feedback management platform to GitHub and running it locally.

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- A [GitHub account](https://github.com/)
- npm or yarn package manager

## 🚀 GitHub Repository Setup

### 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `echomail-feedback-platform`
5. Add description: "AI-powered feedback management platform with sentiment analysis"
6. Choose "Public" or "Private" based on your preference
7. **Do NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 2. Initialize Local Git Repository

In your project directory, run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: EchoMail feedback platform with updated branding"

# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/echomail-feedback-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Verify Repository

1. Go to your GitHub repository URL
2. Confirm all files are uploaded
3. Check that the README.md displays correctly

## 💻 Local Development Setup

### For New Contributors/Users

If someone wants to clone and run your project locally:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/echomail-feedback-platform.git

# Navigate to project directory
cd echomail-feedback-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:4321`

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint
```

## 🔧 Environment Configuration

### Local Environment

Create a `.env` file in the root directory:

```env
# Development environment
NODE_ENV=development

# Add any additional environment variables here
# Wix services are configured automatically
```

### Production Environment

For production deployment, ensure these environment variables are set:

- `NODE_ENV=production`
- Any API keys or secrets required by your integrations

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Option 3: GitHub Pages

1. Go to repository Settings → Pages
2. Select source: "GitHub Actions"
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔄 Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run check
      - run: npm run build
```

## 📱 Mobile Testing

Test the responsive design on various devices:

```bash
# Start dev server with network access
npm run dev -- --host

# Access from mobile devices using your computer's IP
# Example: http://192.168.1.100:4321
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `astro.config.mjs`
2. **Node version**: Ensure Node.js 18+ is installed
3. **Dependencies**: Run `npm install` if packages are missing
4. **Build errors**: Check TypeScript errors with `npm run check`

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check build output
npm run build -- --verbose
```

## 📊 Performance Monitoring

### Lighthouse Audit

```bash
# Install lighthouse
npm install -g lighthouse

# Run audit on local build
npm run build
npm run preview
lighthouse http://localhost:4321 --output html --output-path ./lighthouse-report.html
```

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use environment variables for sensitive data
3. **Dependencies**: Regularly update packages with `npm audit`
4. **HTTPS**: Always use HTTPS in production

## 📈 Analytics Setup

To add analytics to your deployment:

1. **Google Analytics**: Add tracking ID to environment variables
2. **Wix Analytics**: Configured automatically through Wix platform
3. **Custom Analytics**: Implement in `src/components/Head.tsx`

---

## 🎉 Success!

Your EchoMail platform is now:
- ✅ Deployed to GitHub
- ✅ Ready for local development
- ✅ Configured for production deployment
- ✅ Set up with CI/CD workflows

For support, create an issue in your GitHub repository or refer to the main README.md file.