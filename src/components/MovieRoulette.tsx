import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, Sparkles } from "lucide-react";

interface MovieRouletteProps {
  movies: string[];
  onMovieSelected: (movie: string) => void;
}

export const MovieRoulette = ({ movies, onMovieSelected }: MovieRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const spinRoulette = () => {
    if (movies.length === 0 || isSpinning) return;

    setIsSpinning(true);
    let spins = 0;
    const maxSpins = 30 + Math.floor(Math.random() * 20);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalIndex = Math.floor(Math.random() * movies.length);
        setCurrentIndex(finalIndex);
        onMovieSelected(movies[finalIndex]);
      }
    }, 100 + spins * 3);
  };

  return (
    <div className="relative flex flex-col items-center gap-8">
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-spotlight pointer-events-none" />
      
      {/* Roulette wheel */}
      <div className="relative">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-card border-4 border-primary shadow-glow flex items-center justify-center overflow-hidden relative">
          {/* Decorative ring */}
          <div className="absolute inset-4 rounded-full border-2 border-gold opacity-30" />
          <div className="absolute inset-8 rounded-full border border-red-carpet opacity-20" />
          
          {/* Center display */}
          <div className="text-center z-10 px-6">
            {movies.length > 0 ? (
              <>
                <Film className={`w-12 h-12 mx-auto mb-4 text-primary ${isSpinning ? "animate-spin" : ""}`} />
                <p className={`text-xl md:text-2xl font-bold text-primary transition-all ${isSpinning ? "blur-sm" : ""}`}>
                  {movies[currentIndex]}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground text-lg">
                Adicione filmes para começar
              </p>
            )}
          </div>

          {/* Rotating border effect */}
          {isSpinning && (
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          )}
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-red-carpet drop-shadow-glow" />
        </div>
      </div>

      {/* Spin button */}
      <Button
        onClick={spinRoulette}
        disabled={movies.length === 0 || isSpinning}
        size="lg"
        className="bg-gradient-cinema text-primary-foreground font-bold text-lg px-8 py-6 shadow-deep hover:shadow-glow transition-all disabled:opacity-50"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        {isSpinning ? "Sorteando..." : "Sortear Filme"}
      </Button>
    </div>
  );
};
