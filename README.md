# Pink Blueberry Salon Web Application

## Project Overview

The Pink Blueberry salon web application is a sophisticated digital experience that embodies luxury, artistry, and natural beauty. This project provides a premium Progressive Web Application (PWA) that serves as both a booking platform and e-commerce destination for a high-end hair salon.

### Key Features
- Luxury digital experience reflecting the salon's premium positioning
- Seamless booking system with Chipotle-inspired ease of use
- Sophisticated e-commerce platform for salon products
- Comprehensive rewards program for customer loyalty
- Mobile-first responsive design for optimal user experience across all devices

## Project Structure

The project follows a modern architecture with clear separation of concerns:

```
PinkBlueberry/
├── .git/                  # Git repository
├── .github/               # GitHub CI/CD workflows and configuration
├── api/                   # Backend API server
├── webapp/                # Frontend web application (React)
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── assets/        # Media files and static resources
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions and helpers
│       ├── pages/         # Page components for routing
│       ├── services/      # API service integrations
│       └── store/         # State management (Redux)
└── webadmin/              # Admin dashboard application
```

## Technology Stack

### Frontend (webapp)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6.3
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**:
  - Radix UI primitives
  - Lucide React for icons
  - Recharts for data visualization
  - Embla Carousel for image carousels
  - Date-fns for date manipulation
  - Sonner for toast notifications

### Design System
- **Atomic Design** methodology for components
- **Mobile-first** responsive design
- **Tailwind CSS** for utility-first styling
- **Tailwind Typography** for rich text content
- **Tailwind Animate** for animation utilities
- **Class Variance Authority** for component variants

## Key Functionality

The application is structured around these core user journeys:

1. **Booking System**
   - Service selection with visual cards
   - Stylist profiles with portfolios
   - Calendar and time slot selection
   - Client information form
   - Booking confirmation

2. **E-commerce Platform**
   - Product catalog browsing
   - Shopping cart functionality
   - Secure checkout process
   - Order history and tracking

3. **Rewards Program**
   - Points balance dashboard
   - Tier progression visualization
   - Earning opportunities display
   - Redemption catalog
   - Transaction history

## Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-organization/PinkBlueberry.git
cd PinkBlueberry

# Install webapp dependencies
cd webapp
npm install
# or with bun
bun install

# Start development server
npm run dev
# or with bun
bun run dev
```

### Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `build:dev`: Build with development settings
- `lint`: Run ESLint for code quality
- `preview`: Preview production build locally

## Design Philosophy

The application follows these core design principles:

1. **Luxury Simplicity**
   - Generous white space creates breathing room
   - Minimal cognitive load with clear visual hierarchy
   - Premium materials and subtle animations

2. **Chipotle-Inspired Flow**
   - Linear, step-by-step processes
   - Visual feedback at each stage
   - Clear progress indicators
   - Easy modification and backtracking

3. **Mobile-First Approach**
   - Touch-friendly interface elements
   - Responsive breakpoints for all devices
   - Progressive enhancement for larger screens

## Brand Identity

The Pink Blueberry brand identity features:

- **Watercolor Blueberry**: Represents artistry and natural beauty
- **Gold Typography**: Conveys luxury and premium quality
- **Color Palette**:
  - Pink Spectrum: Elegant femininity
  - Blue Spectrum: Trust and professionalism
  - Gold Accents: Luxury highlights
  - Neutral Base: Clean backgrounds

## Project Status

This project is under active development following an agile methodology. See the issues and project boards for current priorities and roadmap.

## License

[Proprietary - All Rights Reserved]
