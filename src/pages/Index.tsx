import { useState } from "react";
import { MovieRoulette } from "@/components/MovieRoulette";
import { MovieInput } from "@/components/MovieInput";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Film } from "lucide-react";

const Index = () => {
  const [movies, setMovies] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleAddMovie = (movie: string) => {
    setMovies([...movies, movie]);
    setWinner(null);
  };

  const handleRemoveMovie = (index: number) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  const handleMovieSelected = (movie: string) => {
    setWinner(movie);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-carpet/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-spotlight/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cinema bg-clip-text text-transparent drop-shadow-glow">
              Cinema Roulette
            </h1>
            <Film className="w-12 h-12 text-red-carpet animate-float" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Não consegue decidir o que assistir? Deixe a roleta escolher por você! 🎬
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-2xl">★</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left column - Input */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-primary mb-2">
                📝 Adicione seus Filmes
              </h2>
              <p className="text-muted-foreground">
                Monte sua lista de filmes favoritos
              </p>
            </div>
            <MovieInput
              movies={movies}
              onAddMovie={handleAddMovie}
              onRemoveMovie={handleRemoveMovie}
            />
          </div>

          {/* Right column - Roulette */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                🎰 Roleta de Filmes
              </h2>
              <p className="text-muted-foreground">
                Gire a roleta e descubra seu próximo filme
              </p>
            </div>
            <MovieRoulette movies={movies} onMovieSelected={handleMovieSelected} />
          </div>
        </div>

        {/* Winner display como modal */}
        <Dialog open={!!winner} onOpenChange={(open) => !open && setWinner(null)}>
          <DialogContent className="max-w-2xl border-none bg-transparent shadow-none p-0">
            <WinnerDisplay winner={winner} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-cinema" />
    </div>
  );
};

export default Index;
