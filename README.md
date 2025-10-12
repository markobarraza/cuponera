# Beta Falabella — Generador de Cupones y Contadores

Proyecto React que permite crear, editar, ordenar y exportar “Cupones” y “Contadores” para su uso en páginas de Falabella.
[Cuponera/contador](https://markobarraza.github.io/cuponera/)

## ✨ Funcionalidades

- ✅ Crear/editar/eliminar cupones y contadores.
- ✅ Cargar imagen por SKU (Uso de API) o por URL directa.
- ✅ Reordenar elementos en grilla con Swapy
- ✅ Exportar a HTML y volver a importar para reconstruir el array.

## 🛠️ Tecnologías utilizadas

- React + Vite
- React Router
- Context API (estado global)
- CSS Modules y CSS plano
- Swapy (drag & drop)
- FileReader API (importar HTML)

# Requisitos
- Node.js 18+ (recomendado)
- npm 9+ o pnpm/yarn

## Instalación
- macOS (Terminal):
```bash
npm install
npm run dev
```
- Build:
```bash
npm run build
npm run preview
```

## Uso básico
1. Ir a “Cuponera” o “Contadores”.
2. Completar formulario (puedes usar SKU o URL de imagen).
3. Agregar elemento y reordenar en la grilla si es necesario.
4. Descargar HTML desde el botón de “Descargar”.
5. Para cargar un HTML previo: usar el input de archivo en el formulario.