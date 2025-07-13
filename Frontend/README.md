# 📚 Book Worms Club — Frontend

Este proyecto es el frontend de **Book Worms Club**, una plataforma donde los usuarios pueden explorar un catálogo de libros, dejar reseñas, gestionar su lista de deseos y más. Está desarrollado con React, TypeScript y Tailwind CSS.

---

## Funcionalidades principales

- Ver el listado de libros disponibles.
- Ver los detalles de un libro.
- Autenticación de usuarios.
- Ver y dejar reseñas (solo si estás autenticado).
- Eliminar tu propia reseña y, en caso de ser admin, poder eliminar la de cualquier usuario.
- Agregar/quitar libros a tu lista de deseos.
- Página de destacados y sobre nosotros.
- Acceso administrativo (solo usuarios con rol admin):
  - Crear, editar y eliminar libros.
  - Crear autores.

---

## Tecnologías usadas

- **React** (con Vite)
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Toastify** (para notificaciones)
- **Vitest** (para testing)

---

## Pasos para instalar

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/mariKaren/bwcProyectoFinal.git
   cd Frontend

2. Instalar las dependencias:

  npm install

3. Ejecutar el proyecto en modo desarrollo:

  npm run dev

--- 

## Test
Este proyecto usa Vitest para pruebas.

- Ejecutar los tests con:

  npm run test

--- 

## Estrctura del proyecto
```text
src
├──assets           # Imagenes
├── components      # Componentes reutilizables
      └──__tests__  # Tests realizados con Vitests
├── pages           # Vistas principales (Home, Wishlist, Admin)
├── hooks           # Custom hooks como useBookDetail
├── services        # Configuración de llamadas a la API
├── context         # Contexto de autenticación
├── layout          # Layout principal
├── types           # Tipado de entidades (Book, Review, etc.)
└── routes          # App router y protección de rutas admin
```

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

> Se recomienda cambiar estas credenciales en producción.
