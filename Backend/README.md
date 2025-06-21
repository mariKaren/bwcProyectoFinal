# 📚 Virtual Library API

API RESTful desarrollada con **Laravel**, que permite la gestión de una biblioteca virtual. Soporta operaciones CRUD sobre libros, autores y reseñas literarias, combinando MySQL y MongoDB como motores de base de datos.

## Funcionalidades Principales

- Autenticación con Laravel Sanctum (tokens).
- CRUD de libros y autores (solo admins).
- Reseñas de libros gestionadas por usuarios.
- Control de acceso por roles (admin/user).
- MongoDB para almacenamiento de reseñas (NoSQL).

## Requisitos Previos

- PHP 8.x  
- Composer  
- MySQL  
- MongoDB  
- PECL MongoDB Driver  
- Laravel  

##  Instalación Rápida

1. Cloná el repositorio 
   
2. Instalá las dependencias:
composer install

3. Copiá el archivo .env.example a .env y configurá tus variables:

DB_CONNECTION=mysql
DB_DATABASE=library  
DB_USERNAME=root

DB_CONNECTION_MONGO=mongodb
DB_MONGO_DATABASE=libreriaVirtual
DB_MONGO_URI=mongodb://localhost:27017 o link URI de MongoDB Atlas

4. Instalá Sanctum:
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

5. Importá los archivos dump de MySQL y MongoDB provistos.

6. Iniciá el servidor:
php artisan serve

## Documentación y Endpoints
Para la documentación completa de la API, base de datos y estructura de roles, consultá el archivo Memoria del Proyecto.

🛡️ Proyecto desarrollado con fines educativos.
© 2025 Virtual Library API