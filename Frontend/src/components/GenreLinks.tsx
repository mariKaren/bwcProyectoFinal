import { Link } from 'react-router';

function GenreLinks() {
    const genres = [
        { id: "ficcion", name: "Ficción" },
        { id: "fantasia", name: "Fantasía" },
        { id: "misterio", name: "Misterio" },
        { id: "romance", name: "Romance" },
        { id: "drama", name: "Drama" },
    ];

    return (
        <div className="flex flex-wrap md:justify-start justify-center gap-5">
            {genres.map((genre) => (
            <Link key={genre.id} to={`/libros/genero`}
            className="bg-beige hover:bg-yellow text-lg text-red px-5 py-2 rounded-full font-semibold transition-colors duration-400">
                {genre.name}
            </Link>
        ))}
        </div>
    );
}

export default GenreLinks;