const About = () => {
    return (
        <section className="min-h-[80vh] sm:mx-4 flex items-center justify-center">
        <div className="bg-beige max-w-4xl text-brown py-12 px-6 sm:px-12 md:px-20 rounded-2xl shadow-md space-y-6">
            <h2 className=" text-2xl sm:text-3xl font-bold text-red text-center">Sobre nosotros</h2>

            <p className="text-lg text-gray leading-relaxed">
            En <strong className="text-brown">Book Worms Club</strong>, somos un equipo apasionado por los libros y la lectura.
            Hemos creado esta plataforma con un propósito claro: conectar a lectores de todo tipo para que puedan compartir su amor por la literatura.
            </p>

            <p className="text-lg text-gray leading-relaxed">
            Nuestra app/página web nace de la idea de que cada libro tiene una historia, no solo en sus páginas, sino también en las experiencias y opiniones de quienes lo leen.
            Aquí, puedes descubrir nuevas lecturas, escribir tus propias reseñas, compartir tus opiniones y guardar esos títulos que deseas leer en el futuro.
            </p>

            <p className="text-lg text-gray leading-relaxed">
            Queremos que este espacio sea un refugio para todos los amantes de los libros, un lugar donde las palabras se conviertan en un puente entre lectores
            y donde la pasión por la lectura se transforme en comunidad.
            </p>

            <p className="text-lg text-gray leading-relaxed">
            Te invitamos a ser parte de esta aventura literaria, a inspirarte con cada reseña y a compartir tu voz con quienes, como tú,
            encuentran en los libros un mundo infinito por descubrir.
            </p>
        </div>
        </section>
    );
    
};

export default About;