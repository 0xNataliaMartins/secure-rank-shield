import { Lock, Crown, Trophy, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntryProps {
  rank: number;
  isEncrypted: boolean;
  playerName?: string;
  score?: number;
  change?: number;
}

export const LeaderboardEntry = ({ 
  rank, 
  isEncrypted, 
  playerName = "████████", 
  score = 0,
  change = 0 
}: LeaderboardEntryProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-goldRank" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-accent" />;
    return <Zap className="w-4 h-4 text-muted-foreground" />;
  };

  const getRankStyles = (rank: number) => {
    if (rank === 1) return "border-goldRank/30 bg-gradient-to-r from-goldRank/10 to-transparent";
    if (rank <= 3) return "border-accent/30 bg-gradient-to-r from-accent/10 to-transparent";
    return "border-border";
  };

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-lg ${getRankStyles(rank)} ${
      isEncrypted ? 'animate-pulse-neon' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className={`font-bold text-lg ${rank <= 3 ? 'text-goldRank' : 'text-foreground'}`}>
              #{rank}
            </span>
            {getRankIcon(rank)}
          </div>
          
          <div className="flex flex-col">
            <span className={`font-medium ${isEncrypted ? 'animate-glitch text-encrypted' : 'text-foreground'}`}>
              {isEncrypted ? `Player ${rank}` : playerName}
            </span>
            <span className="text-sm text-muted-foreground">
              {isEncrypted ? '████ pts' : `${score.toLocaleString()} pts`}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {change !== 0 && (
            <Badge variant={change > 0 ? "default" : "destructive"} className="text-xs">
              {change > 0 ? '+' : ''}{change}
            </Badge>
          )}
          
          {isEncrypted && (
            <Badge className="bg-encrypted/20 text-encrypted border-encrypted/50 animate-pulse">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};