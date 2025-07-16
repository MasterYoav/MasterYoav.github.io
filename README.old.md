# Interactive Portfolio Website

A modern, performant, and responsive portfolio website built with Next.js, Three.js, and Framer Motion.

## 🚀 Features

- **Interactive 3D Elements**: Powered by Three.js and React Three Fiber
- **Smooth Animations**: Using Framer Motion with 144Hz support
- **Responsive Design**: Mobile-first approach, supporting all screen sizes
- **Dark Theme**: Modern and eye-friendly design
- **Performance Optimized**: Code-splitting, lazy loading, and optimized 3D rendering
- **Type-Safe**: Built with TypeScript
- **SEO Friendly**: Built-in Next.js optimizations

## 📦 Tech Stack

- **Framework**: Next.js 15.4.1
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Styling**: TailwindCSS
- **Language**: TypeScript

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── 3d/              # Three.js components
│   │   └── HeroScene.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── LoadingScreen.tsx
│   └── Navigation.tsx
└── types/               # TypeScript declarations
    └── maath.d.ts
```

## 🎨 Customization Guide

### Modifying Content

1. **Personal Information**:
   - Edit text content in each section component under `src/components/sections/`
   - Update skills in `Skills.tsx`
   - Modify projects in `Projects.tsx`

2. **Styling**:
   - Global styles in `src/app/globals.css`
   - Component-specific styles using Tailwind classes
   - Color scheme can be modified in `tailwind.config.js`

3. **3D Scene**:
   - Customize the hero scene in `src/components/3d/HeroScene.tsx`
   - Adjust camera settings and particle properties

### Performance Optimization

1. **3D Performance**:
   - Adjust particle count based on device performance
   - Use `useFrame` hook with care
   - Implement level of detail (LOD)

2. **Animation Performance**:
   - Use `transform` instead of animating layout properties
   - Implement `will-change` for heavy animations
   - Utilize `useMemo` for complex calculations

3. **Loading Strategy**:
   - Lazy load below-the-fold content
   - Preload critical assets
   - Implement progressive loading

## 📱 Responsive Design

The website implements a mobile-first approach with the following breakpoints:

```typescript
// Breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
3xl: '1920px' // Ultra-wide screens
```

### Responsive Strategy:
- Mobile-first design approach
- Fluid typography using clamp()
- Responsive spacing using relative units
- Adaptive 3D scene complexity
- Optimized touch interactions

## ⚡ Performance Features

1. **High Refresh Rate Support**:
   - RAF synchronization
   - Optimized animation frames
   - Hardware acceleration

2. **Code Splitting**:
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

3. **Asset Optimization**:
   - Responsive images
   - WebP format support
   - Lazy loading media

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Linting
npm run lint
```

## 📈 Performance Monitoring

The website includes built-in performance monitoring:
- Lighthouse scores
- Web Vitals tracking
- FPS monitoring for 3D scenes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
