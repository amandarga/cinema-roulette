import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface MovieInputProps {
  movies: string[];
  onAddMovie: (movie: string) => void;
  onRemoveMovie: (index: number) => void;
}

export const MovieInput = ({ movies, onAddMovie, onRemoveMovie }: MovieInputProps) => {
  const [movieName, setMovieName] = useState("");

  const handleAddMovie = () => {
    if (movieName.trim()) {
      onAddMovie(movieName.trim());
      setMovieName("");
      toast.success("Filme adicionado à lista!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMovie();
    }
  };

  return (
    <Card className="p-6 bg-card border-border shadow-deep">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o nome do filme..."
            className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleAddMovie}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {movies.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-semibold">
              Filmes na lista ({movies.length})
            </p>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-foreground">{movie}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveMovie(index)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
