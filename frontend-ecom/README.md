# Zappit Web Client 🚀

A full-featured, high-performance React application serving as the storefront and administrative interface for the Zappit e-commerce platform. Designed to integrate directly with a robust Spring Boot monolithic backend, this frontend delivers a highly responsive shopping experience, secure authentication, and an advanced, AI-enhanced seller dashboard.

## 🏗️ Architecture & Integration
This repository contains the client-side code for Zappit. It is engineered to consume secure REST APIs provided by the Zappit Spring Boot backend, handling high-concurrency data fetching, complex global state management, and strict route protection.

## 🛠️ Tech Stack & Core Libraries

* **Core Framework:** React 19 optimized with Vite for rapid hot module replacement (HMR) and minimized production builds.
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`) and `react-redux` for predictable, centralized state management across Auth, Cart, and Checkout flows.
* **Routing:** React Router DOM (v7) for dynamic client-side routing, protected administrative routes, and seamless component rendering.
* **UI & Styling Engine:**
    * Material-UI (`@mui/material`) for standardized, accessible data display components.
    * Headless UI (`@headlessui/react`) for custom, unstyled accessible interactions.
    * Emotion (`@emotion/react`, `@emotion/styled`) for robust CSS-in-JS encapsulation.
* **Payment Gateway:** Razorpay (`react-razorpay`) integrated for secure, real-time transaction processing.
* **Form Management:** React Hook Form (`react-hook-form`) for performant, minimal-re-render validation of complex data entry (checkout, login, product uploads).

## 🌟 Core Modules & Features

The application is modularized within the `src/components/` and `src/pages/` directories to maintain separation of concerns:

### 🛒 Cart & Checkout (`/cart`, `/checkout`)
* Dynamic cart state synchronized via Redux.
* Multi-step checkout process capturing shipping details and order review.
* Seamless, secure payment processing via Razorpay integration.

### 🔐 Authentication & Authorization (`/auth`)
* JWT-based authentication flow interfacing with the Spring Boot security layer.
* Role-based access control (RBAC) utilizing `PrivateRoute.jsx` to separate Customer and Admin traffic.

### 🛍️ Storefront & Product Discovery (`/products`, `/home`)
* High-performance product grids and detailed view pages.
* Optimized media handling and image carousels utilizing `swiper`.
* Asynchronous product filtering and search capabilities.

### 👔 Admin & AI Seller Dashboard (`/admin`)
* Dedicated control panel for catalog and inventory management.
* **AI-Enhanced Analytics:** Features intelligent insights for sellers to track product performance, optimize listings, and forecast demand.

### 📱 Shared UI Infrastructure (`/shared`)
* Reusable, atomic components: Navbars, Sidebars, and layout wrappers.
* Optimized loading states (`Skeleton.jsx`, `BackDrop.jsx`, `react-loader-spinner`) to prevent cumulative layout shift (CLS).
* Global toast notification system via `react-hot-toast`.

## ⚙️ Development & Configuration

* **Linting & Formatting:** Strict static code analysis enforced via ESLint (`eslint.config.js`) and React Hooks plugins to maintain code quality.
* **Module System:** Native ES6+ module resolution (`type: "module"`).
* **Environment Management:** Environment-specific configurations (API base URLs, Razorpay keys) isolated in `.env` files.

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/zappit-frontend.git](https://github.com/yourusername/zappit-frontend.git)
   cd zappit-frontend
