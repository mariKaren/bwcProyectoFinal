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

## Test
Este proyecto usa Vitest para pruebas.

- Ejecutar los tests con:

  npm run test

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
