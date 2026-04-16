# Estado del Arte · IoT PM₂.₅ · UTS 2026

Página web interactiva del estado del arte sobre monitoreo IoT de material particulado PM₂.₅ con ESP32, SDS011 y ThingSpeak.

## 🗂️ Estructura del proyecto

```
estado-del-arte-iot/
├── index.html          ← Página principal (contenido + semántica HTML)
├── css/
│   └── styles.css      ← Todos los estilos (tema claro/oscuro, responsive)
├── js/
│   └── main.js         ← Interactividad (búsqueda, filtros, dark mode, etc.)
├── vercel.json         ← Configuración de deploy para Vercel
└── .gitignore
```

## ✨ Funcionalidades interactivas

- 🔍 **Búsqueda en tiempo real** por título, autores, plataformas o tecnologías (atajo `⌘K`)
- 🏷️ **Filtros por tecnología**: ESP32, SDS011, ThingSpeak, MQTT, Simulación, ML/ANN
- 🌙 **Modo oscuro / claro** persistente (se guarda en `localStorage`)
- 📖 **Expand / Collapse** en cada tarjeta de estudio
- ⬆️ **Botón scroll-to-top** automático
- 📱 **Diseño responsive** — funciona en móvil, tablet y escritorio

## 🚀 Deploy en Vercel

### Opción A — Interfaz web de Vercel (recomendado)
1. Subir este repositorio a GitHub
2. Entrar a [vercel.com](https://vercel.com) → **New Project** → importar el repo
3. Vercel detecta automáticamente que es un sitio estático
4. Click **Deploy** — ¡listo!

### Opción B — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## 🛠️ Desarrollo local

No requiere ningún servidor ni dependencias. Abrir `index.html` directamente en el navegador.

Para un servidor local rápido:
```bash
npx serve .
# o
python3 -m http.server 3000
```

## 📝 Cómo modificar el contenido

| Qué cambiar | Dónde |
|---|---|
| Tarjetas de estudios | `index.html` → sección `#cards-grid` |
| Colores y tipografía | `css/styles.css` → variables `:root` |
| Tema oscuro | `css/styles.css` → `[data-theme="dark"]` |
| Filtros disponibles | `index.html` → `.filter-bar` + `data-tags` en cada card |
| Lógica de búsqueda | `js/main.js` → función `filterCards()` |
| Tabla comparativa | `index.html` → `.compare-wrap table` |
| Referencias | `index.html` → `.ref-box` |

## 🎨 Personalización rápida de colores

Editar las variables en `css/styles.css`:

```css
:root {
  --navy:       #1a3a5c;   /* color principal header */
  --green:      #059669;   /* acentos positivos */
  --amber:      #d97706;   /* acentos de advertencia */
}
```

## 📚 Proyecto académico

**Universidad Tecnológica de Santander (UTS) · 2026**  
Trabajo de grado — Ingeniería en Telecomunicaciones  
Simulación de nodo IoT para vigilancia ambiental de PM₂.₅ en puestos de comida callejera de Bucaramanga.
