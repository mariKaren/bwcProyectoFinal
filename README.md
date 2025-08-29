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

![Captura de pantalla](https://github.com/user-attachments/assets/1ae122e5-22ae-4164-9977-76e30aaf38e7)
![Captura de pantalla](https://github.com/user-attachments/assets/fc12010c-414a-40cc-87ce-efb8cd4a2c48)
![Captura de pantalla 2025-08-28 122149](https://github.com/user-attachments/assets/db9ee44a-b786-4d25-bf01-bba2e9c4e6a1)
![Captura de pantalla 2025-08-28 122204](https://github.com/user-attachments/assets/6ba8eb1e-77a6-4a48-874d-ccd260337ebf)
![Captura de pantalla 2025-08-28 122248](https://github.com/user-attachments/assets/16137187-8c5e-4c0a-99e0-06fe9f42f47e)
![Captura de pantalla 2025-08-28 122322](https://github.com/user-attachments/assets/af31dd2d-fa45-4e8a-9e95-09af94377b83)
![Captura de pantalla 2025-08-28 122649](https://github.com/user-attachments/assets/ee49d0b2-35cb-498a-868d-46a99efc7417)
![Captura de pantalla 2025-08-28 122705](https://github.com/user-attachments/assets/04a3e6b7-4e2d-454b-9295-3c44e2cf5f1e)






