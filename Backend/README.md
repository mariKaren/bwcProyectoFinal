# Virtual Library API

API RESTful desarrollada con **Laravel**, que permite la gestión de una biblioteca virtual. Soporta operaciones CRUD sobre libros, autores,listas de deseos y reseñas literarias.

## Funcionalidades Principales

- Autenticación basada em tokens con Laravel Sanctum.
- CRUD de libros y autores (solo admins).
- Gestión de reseñas literarias (usuarios y admins).
- Módulo de libros destacados.
- Wishlist personal por usuario.
- Control de acceso por roles (admin/user).

## Tecnologías usadas

- PHP 8.x  
- Composer  
- MySQL   
- Laravel 
- Sanctum 

## Test

Se incluyen tests funcionales (Feature) desarrollados con PHPUnit, ubicados en tests/Feature.
- Ejecutar los tests con:

    php artisan test

##  Instalación Rápida

1. Cloná el repositorio 

   ```bash
   git clone https://github.com/mariKaren/bwcProyectoFinal.git
   cd Backend
   
2. Instalá las dependencias:
    composer install

3. Copiá el archivo .env.example a .env y configurá tus variables:
    
    DB_CONNECTION=mysql
    DB_DATABASE=library  
    DB_USERNAME=root

4. Generá la clave de la app:

    php artisan key:generate

5. Importá el archivo dump de MySQL provisto.

6. Iniciá el servidor:

    php artisan serve

