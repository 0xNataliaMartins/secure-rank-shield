# Secure Rank Shield

A cutting-edge privacy-first gaming ranking platform that leverages Fully Homomorphic Encryption (FHE) technology to ensure confidential player rankings during active competition cycles.

## 🌟 Key Features

- **🔒 Confidential Rankings**: Player rankings remain encrypted during active cycles to prevent harassment and maintain competitive integrity
- **🔐 FHE Integration**: Core ranking data is encrypted using state-of-the-art Fully Homomorphic Encryption
- **💼 Multi-Wallet Support**: Seamless integration with popular Web3 wallets including Rainbow, MetaMask, and more
- **⚡ Real-time Updates**: Live leaderboard updates with encrypted data processing
- **🔄 Cycle-based Competition**: Time-based ranking cycles with automatic reveal mechanisms
- **🎮 Gaming-Focused**: Built specifically for competitive gaming environments

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast build and development experience
- **Tailwind CSS** for modern, responsive styling
- **shadcn/ui** + **Radix UI** for accessible component library

### Web3 & Blockchain
- **RainbowKit** for wallet connection management
- **Wagmi** for React hooks for Ethereum
- **Viem** for lightweight Ethereum library
- **Ethereum Sepolia Testnet** for testing and development

### Encryption & Security
- **FHE (Fully Homomorphic Encryption)** for data privacy
- **FHEVM** for blockchain-based FHE operations
- **Smart Contracts** written in Solidity with FHE integration

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Web3 Wallet** (MetaMask, Rainbow, etc.)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/0xNataliaMartins/secure-rank-shield.git
cd secure-rank-shield
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**:
```bash
npm run dev
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Additional Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key_here
```

> **Note**: Replace placeholder values with your actual configuration. Never commit sensitive keys to version control.

## 📋 Smart Contract Architecture

The platform includes sophisticated FHE-enabled smart contracts:

### Core Contracts
- **SecureRankShield.sol**: Main contract handling encrypted rankings and player management
- **FHE Integration**: Uses FHEVM for fully homomorphic encryption operations
- **Sepolia Testnet**: Deployed on Ethereum Sepolia for testing and development

### Key Features
- Player registration and management
- Encrypted score updates
- Cycle-based ranking systems
- Automatic leaderboard reveals
- Reputation tracking

## 🎯 How It Works

1. **Player Registration**: Users connect their wallet and register for the ranking system
2. **Encrypted Scoring**: Player scores are encrypted using FHE during active cycles
3. **Confidential Rankings**: Rankings remain hidden to prevent targeting and harassment
4. **Cycle Management**: Time-based cycles with automatic reveal at completion
5. **Transparent Results**: Full leaderboard revealed after cycle completion

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Set all required environment variables
3. **Deploy**: Automatic deployment on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Ensure all components are accessible
- Maintain consistent code style
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

This platform implements advanced cryptographic techniques for data privacy:

- **FHE Technology**: All ranking data is encrypted using fully homomorphic encryption
- **Zero-Knowledge**: No sensitive data is exposed during active cycles
- **Smart Contract Security**: Audited contracts with best practices
- **Privacy by Design**: Built with privacy as a core principle

## 🌐 Community

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Join community discussions
- **Documentation**: Comprehensive guides and API references

## 📊 Roadmap

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with popular gaming platforms
- [ ] Enhanced FHE capabilities
- [ ] Community governance features

---

**Built with ❤️ by the Secure Rank Shield team**

*Empowering fair competition through privacy-first technology*