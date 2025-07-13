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
├── README.md # Este archivo (general) ```

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

### 2. Configurar el Frontend y el Backend
Cada módulo tiene su propio archivo README.md con instrucciones detalladas.

- Frontend: /Frontend/README.md

- Backend: / Backend/README.md

Seguí los pasos correspondientes según la carpeta.

