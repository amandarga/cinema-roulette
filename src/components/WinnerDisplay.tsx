import { Card } from "@/components/ui/card";
import { Trophy, Sparkles } from "lucide-react";

interface WinnerDisplayProps {
  winner: string | null;
}

export const WinnerDisplay = ({ winner }: WinnerDisplayProps) => {
  if (!winner) return null;

  return (
    <Card className="p-8 bg-gradient-cinema border-none shadow-deep relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-spotlight animate-pulse" />
      
      <div className="relative z-10 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-spotlight animate-float" />
          <Trophy className="w-12 h-12 text-spotlight" />
          <Sparkles className="w-8 h-8 text-spotlight animate-float" />
        </div>
        
        <div>
          <p className="text-sm uppercase tracking-widest text-primary-foreground/80 mb-2">
            🎬 Filme Sorteado 🎬
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground drop-shadow-lg">
            {winner}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-1 pt-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-3xl animate-float" style={{ animationDelay: `${i * 0.1}s` }}>
              ⭐
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
