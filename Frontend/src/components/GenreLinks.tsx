import { Link } from "react-router";

type Genre = {
    id: string;
    name: string;
};

interface GenreLinksProps {
    variant: "link" | "button";
    onSelectGenre?: (genreId: string) => void; // opcional si es button
}

const genres: Genre[] = [
    { id: "ficcion", name: "Ficción" },
    { id: "fantasia", name: "Fantasía" },
    { id: "misterio", name: "Misterio" },
    { id: "romance", name: "Romance" },
    { id: "drama", name: "Drama" },
    { id: "ciencia", name: "Ciencia" }
];

function GenreLinks({ variant, onSelectGenre }: GenreLinksProps) {
    return (
        <div className="flex flex-wrap justify-evenly lg:mx-20 gap-5">
        {genres.map((genre) =>
            variant === "link" ? (
            <Link
                key={genre.id}
                to={`/generos?genre=${genre.id}`} 
                className="bg-beige hover:bg-yellow text-lg text-red px-5 py-2 rounded-full font-semibold transition-colors duration-400"
            >
                {genre.name}
            </Link>
            ) : (
            <button
                key={genre.id}
                onClick={() => onSelectGenre && onSelectGenre(genre.id)}
                className="bg-beige hover:bg-yellow text-lg text-red px-5 py-2 rounded-full font-semibold transition-colors duration-400"
            >
                {genre.name}
            </button>
            )
        )}
        </div>
    );
}

export default GenreLinks;