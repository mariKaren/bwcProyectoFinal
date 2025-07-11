export default function Contact(){
    return (
        <section className="mt-10">
            <div className="bg-beige max-w-4xl text-brown mx-auto py-12 px-6 sm:px-12 md:px-20 rounded-2xl shadow-md space-y-6">
                <h2 className="text-3xl font-bold text-red text-center">Contacto</h2>
                <p className="text-lg text-gray leading-relaxed">
                Si querés saber más sobre nuestra plataforma, colaborar o simplemente compartir una idea, podés escribirnos a:
                </p>
                <p className="text-lg font-semibold text-brown">
                <a href="mailto:contacto@tusitio.com" className="underline hover:text-orange transition-colors">
                    contacto@tusitio.com
                </a>
                </p>
                <p className="text-lg text-gray leading-relaxed">
                Te responderemos a la brevedad. ¡Gracias por tu interés!
                </p>
            </div>
        </section>
    );
};

