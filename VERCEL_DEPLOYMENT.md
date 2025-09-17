# Vercel Deployment Guide for Secure Rank Shield

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables
4. **Web3 Wallet**: Have a compatible wallet for testing

## Step-by-Step Deployment Instructions

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the repository: `0xNataliaMartins/secure-rank-shield`

### Step 2: Configure Project Settings

1. **Project Name**: `secure-rank-shield` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add the following:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key_here
```

**Important**: 
- Replace placeholder values with your actual configuration
- Set these for all environments (Production, Preview, Development)
- Never commit sensitive keys to version control

### Step 4: Configure Build Settings

1. Go to **Settings** → **General**
2. Set **Node.js Version**: `18.x` or `20.x`
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Set **Install Command**: `npm install`

### Step 5: Deploy

1. Click **Deploy** button
2. Wait for the build process to complete
3. Vercel will automatically assign a domain like `secure-rank-shield-xxx.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia Testnet Chain ID | `11155111` |
| `NEXT_PUBLIC_RPC_URL` | RPC URL for blockchain connection | `https://sepolia.infura.io/v3/YOUR_KEY` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect Project ID | `your_project_id_here` |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API Key (optional) | `your_infura_key_here` |

## Post-Deployment Checklist

- [ ] Verify the application loads correctly
- [ ] Test wallet connection functionality
- [ ] Check that all environment variables are properly set
- [ ] Test responsive design on mobile devices
- [ ] Verify SSL certificate is active
- [ ] Test all major wallet connections (MetaMask, Rainbow, etc.)
- [ ] Verify FHE functionality works as expected
- [ ] Test ranking cycle functionality

## Troubleshooting

### Common Issues

1. **Build Failures**: 
   - Check that all dependencies are properly installed
   - Verify Node.js version compatibility
   - Check build logs for specific error messages

2. **Environment Variables**: 
   - Ensure all required variables are set in Vercel dashboard
   - Verify variable names match exactly (case-sensitive)
   - Check that values don't contain extra spaces

3. **Wallet Connection Issues**: 
   - Verify WalletConnect Project ID is correct
   - Check that RPC URLs are accessible
   - Ensure wallet is connected to correct network

4. **RPC Errors**: 
   - Check that RPC URLs are accessible and valid
   - Verify API keys are correct and active
   - Test RPC endpoints independently

### Build Logs

If deployment fails, check the build logs in Vercel dashboard:
1. Go to **Deployments** tab
2. Click on the failed deployment
3. Check the build logs for error messages
4. Look for specific error patterns and solutions

### Performance Optimization

- Enable Vercel Analytics for performance monitoring
- Configure caching headers for static assets
- Use Vercel's Edge Functions if needed for server-side logic
- Monitor Core Web Vitals in Vercel dashboard
- Optimize bundle size and loading times

## Security Best Practices

- Never commit sensitive environment variables to the repository
- Use Vercel's environment variable system for all secrets
- Regularly rotate API keys and tokens
- Monitor deployment logs for any security issues
- Keep dependencies updated to latest secure versions
- Use HTTPS for all external API calls

## Support Resources

For additional support:
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create an issue in the repository
- **Community**: Join Vercel Discord or GitHub Discussions
- **Project Documentation**: Check the main README.md file

## Advanced Configuration

### Custom Headers
Configure custom headers in `vercel.json` for enhanced security and performance.

### Edge Functions
Consider using Vercel Edge Functions for server-side logic that needs to run close to users.

### Analytics
Enable Vercel Analytics to monitor performance and user behavior.

### Monitoring
Set up monitoring and alerting for production deployments.

---

**Note**: This deployment guide assumes basic familiarity with Vercel and web development. For advanced configurations, refer to the official Vercel documentation.