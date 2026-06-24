# Fly Away Frontend

SPA en React + TypeScript para consumir la API local de Fly Away.

## Requisitos

- Node.js instalado
- Backend Fly Away corriendo en `http://localhost:8080`

## Como correr

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

## Funcionalidades

- Registro con validacion de campos vacios y errores del backend.
- Login con JWT guardado en `localStorage`.
- Nombre del usuario autenticado usando `GET /users/current`.
- Busqueda de vuelos por numero, aerolinea y rango de fechas.
- Reserva de vuelos para usuarios autenticados.
- Detalle de reserva y listado de reservas guardadas en `localStorage`.
- Logout y rutas protegidas.

