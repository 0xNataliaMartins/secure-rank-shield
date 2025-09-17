import { useState, useEffect } from "react";
import { Clock, Unlock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const CycleTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = (timeLeft.days * 24 * 60 * 60) + (timeLeft.hours * 60 * 60) + (timeLeft.minutes * 60) + timeLeft.seconds;
  const progressPercentage = ((259200 - totalSeconds) / 259200) * 100; // 3 days in seconds

  return (
    <Card className="bg-gradient-to-r from-encrypted/10 to-transparent border-encrypted/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-encrypted" />
            <h3 className="font-semibold text-encrypted">Cycle Ends In</h3>
          </div>
          <Unlock className="w-5 h-5 text-encrypted animate-pulse" />
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{timeLeft.days}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{timeLeft.hours}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{timeLeft.minutes}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Min</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{timeLeft.seconds}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Sec</div>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Rankings will be revealed when the cycle ends
        </p>
      </CardContent>
    </Card>
  );
};