import { useState, useEffect } from "react";
import { Wallet, Shield, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <Card className="bg-gradient-to-r from-neonGreen/10 to-transparent border-neonGreen/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-neonGreen" />
              <div>
                <p className="font-medium text-neonGreen">Wallet Connected</p>
                <p className="text-sm text-muted-foreground">{formatAddress(address)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/20">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Connect Wallet Required</span>
        </CardTitle>
        <CardDescription>
          Connect your wallet to access confidential rankings and participate in secure competition cycles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal} 
                          className="w-full"
                          variant="neon"
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal} 
                          className="w-full"
                          variant="destructive"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex flex-col space-y-2">
                        <Button 
                          onClick={openAccountModal} 
                          className="w-full"
                          variant="outline"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {account.displayName}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <Badge variant="outline" className="text-xs">
            <Shield className="w-3 h-3 mr-1" />
            Secure
          </Badge>
          <Badge variant="outline" className="text-xs">
            Privacy First
          </Badge>
          <Badge variant="outline" className="text-xs">
            FHE Encrypted
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};