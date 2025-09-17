import { useState } from "react";
import { Shield, Users, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeaderboardEntry } from "@/components/LeaderboardEntry";
import { WalletConnection } from "@/components/WalletConnection";
import { CycleTimer } from "@/components/CycleTimer";
import dashboardHeroBg from "@/assets/dashboard-hero-bg.jpg";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, isEncrypted: true, playerName: "CryptoKing", score: 15420, change: 2 },
    { rank: 2, isEncrypted: true, playerName: "ShadowTrader", score: 14890, change: -1 },
    { rank: 3, isEncrypted: true, playerName: "NeonNinja", score: 14201, change: 1 },
    { rank: 4, isEncrypted: true, playerName: "QuantumPlayer", score: 13888, change: 0 },
    { rank: 5, isEncrypted: true, playerName: "CyberWolf", score: 13654, change: 3 },
    { rank: 6, isEncrypted: true, playerName: "DataMiner", score: 13420, change: -2 },
    { rank: 7, isEncrypted: true, playerName: "BlockChaser", score: 13199, change: 1 },
    { rank: 8, isEncrypted: true, playerName: "CodeBreaker", score: 12980, change: -1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dashboardHeroBg})` }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
              <Shield className="w-3 h-3 mr-1" />
              Confidential Rankings Active
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Rank Privately, Compete Fairly
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Player ranking movements encrypted until cycle end, reducing target harassment while maintaining competitive integrity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-neonGreen/20">
                    <Users className="w-6 h-6 text-neonGreen" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Active Players</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-encrypted/20">
                    <Shield className="w-6 h-6 text-encrypted" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-muted-foreground">Encrypted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-goldRank/20">
                    <TrendingUp className="w-6 h-6 text-goldRank" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Cycle 47</p>
                    <p className="text-sm text-muted-foreground">Current Round</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-encrypted" />
                      <span>Confidential Leaderboard</span>
                    </CardTitle>
                    <CardDescription>
                      Rankings encrypted until cycle completion for fair competition
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEncrypted(!showEncrypted)}
                  >
                    {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaderboardData.map((player) => (
                  <LeaderboardEntry
                    key={player.rank}
                    rank={player.rank}
                    isEncrypted={showEncrypted}
                    playerName={player.playerName}
                    score={player.score}
                    change={player.change}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Connection */}
            <WalletConnection />
            
            {/* Cycle Timer */}
            <CycleTimer />
            
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-primary/20 text-primary">1</Badge>
                  <p className="text-muted-foreground">Connect your wallet to participate in ranked competitions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-encrypted/20 text-encrypted">2</Badge>
                  <p className="text-muted-foreground">Rankings are encrypted during active cycles to prevent harassment</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-neonGreen/20 text-neonGreen">3</Badge>
                  <p className="text-muted-foreground">Full leaderboard revealed when cycle ends</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;