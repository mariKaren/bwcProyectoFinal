# 📚 Book Worms Club

**Book Worms Club** es una plataforma web que permite explorar un catálogo de libros, gestionar reseñas y administrar contenido. El sistema cuenta con dos módulos principales: **Frontend** (cliente) y **Backend** (API), integrados para ofrecer una buena experiencia tanto a usuarios lectores como a administradores.

---

## Funcionalidades Generales

- Catálogo de libros con vista de detalles.
- Sistema de autenticación de usuarios (roles: `user` y `admin`).
- Gestión de reseñas:
  - Usuarios pueden crear, ver y eliminar sus propias reseñas.
  - Admins pueden eliminar cualquier reseña.
- Sistema de wishlist (lista de deseos).
- Panel de administración:
  - CRUD de libros.
  - Creación de autores.
- Página "Sobre Nosotros".
- Listado de libros destacados.

---

## Estructura del Proyecto
```text
BookWormsClub/
├── Frontend/ # Cliente (React + TS)
│     ├── src/
│     └── README.md
├── Backend/ # API (Laravel)
│     ├── app/
│     └── README.md
├── README.md # Este archivo (general)
```

---

## Tecnologías Utilizadas

### Frontend:
- React + TypeScript
- TailwindCSS
- React Router DOM
- Toastify
- Vitest (Testing)

### Backend:
- Laravel 10
- MySQL 
- Sanctum (autenticación)
- PHPUnit (Testing)

---

## Instrucciones de Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/book-worms-club.git
```

### 2. Configurar el Frontend y el Backend
Cada módulo tiene su propio archivo README.md con instrucciones detalladas.

- Frontend: /Frontend/README.md

- Backend: / Backend/README.md

Seguí los pasos correspondientes según la carpeta.

---
## Manejo de archivos e imágenes en Laravel

Las imágenes (como portadas de libros) se almacenan en `storage/app/public`, pero para que sean accesibles desde el navegador, es necesario crear un enlace simbólico con:

```bash
php artisan storage:link
```
Este paso es obligatorio para que las imágenes se vean correctamente en el navegador.

---
## Usuarios y Roles

En esta aplicación existen dos tipos de roles:

- **Admin**: tiene acceso completo al sistema (crear, editar y eliminar libros, autores, etc.).
- **User**: rol asignado automáticamente al registrarse mediante la aplicación.

> Solo los usuarios con rol `user` pueden registrarse a través del formulario de registro.

### Usuario administrador precreado

Para fines de prueba, el proyecto ya incluye un usuario administrador:

- **Email**: `karen@example.com`
- **Contraseña**: `1234`


