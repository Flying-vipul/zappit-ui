<div align="center">
  <img src="https://img.icons8.com/fluent/96/000000/shop.png" alt="Zappit Logo" />
  <h1>Zappit E-Commerce Web Client 🛒</h1>
  <p><strong>A high-performance, enterprise-grade React frontend designed for seamless online shopping and robust store administration.</strong></p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" />
</div>

<br />

## 📖 Overview
Welcome to the frontend repository for the **Zappit E-Commerce Ecosystem**. This project provides the customer-facing storefront and the powerful dynamic seller dashboard. It is designed from the ground up to integrate flawlessly with our high-concurrency Spring Boot monolithic backend architecture. 

We prioritize a **modern glassmorphic aesthetic**, lightning-fast page loads with **Vite**, and strict, predictable global state management utilizing **Redux Toolkit**.

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Dynamic Catalog & Filtering**: Seamless product browsing, categorization, and robust search functionalities.
- **Real-Time Cart Synchronization**: Redux-powered shopping cart providing instant feedback and unified cross-component state updates.
- **Secure Checkout Flow**: Integrated tightly with **Razorpay** for frictionless, enterprise-secure live transaction processing.
- **Fluid UI & Dark Mode**: Custom CSS & Context-API-based theming for a premium visual experience regardless of user preference.
- **High-Performance Rendering**: Leveraging React 19's optimized rendering and skeleton loaders to eliminate cumulative layout shift (CLS).

### 👔 Admin & Seller Dashboard
- **Role-Based Access Control (RBAC)**: Route protection completely detaches customer pathways from administrative entry points via local JWT handling.
- **Data-Rich Analytics Tables**: Controlled via `@mui/x-data-grid` for filtering through high volumes of orders, categories, and sellers.
- **Media Management**: Powered by **Cloudinary**, giving administrators the ability to easily upload, compress, and attach product images securely.
- **Intelligent Seller Ecosystem**: Modern dashboards and tools structured to simplify large-inventory storefronts.

---

## 🛠️ Tech Stack & Architecture Deep Dive

Our client-side architecture strictly separates concerns among Routing, State Management, Form validation, and API service invocation. 

* **Core Framework**: React 19.x & Vite (Instant HMR & Optimized Bundles)
* **State Engine**: Redux Toolkit & React-Redux
* **Routing**: React Router DOM v7
* **UI Components**: Material-UI (MUI), Headless UI, React Icons
* **Form Management**: React Hook Form (handles complex form states natively without triggering cascading re-renders)
* **Carousels & Media**: Swiper
* **Notifications & Feedback**: React Hot Toast, React Loader Spinner
* **Network & Security**: Axios with integrated Interceptors attached securely to the backend endpoints.

---

## 🚀 Local Development Setup

To get this frontend up and running locally and connect it to your Spring Boot instance, follow these steps:

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Flying-vipul/zappit-ui.git

# Navigate into the project directory
cd zappit-ui/frontend-ecom

# Install dependencies securely
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of the `frontend-ecom` directory to connect the UI to your APIs:

```env
# Backend API Location
VITE_BACK_END_URL=http://localhost:8080

# Cloudinary Integration (Required for File Uploads in Admin)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key

# Razorpay Keys (Required for complete Checkout Flows)
VITE_RAZORPAY_KEY=your_publishable_api_key
```

### 4. Running the App
```bash
# Start the local Vite development server
npm run dev
```
Navigate to `http://localhost:5173` to explore the UI.

---

## 🛡️ Security Best Practices
- **Environment Isolation:** All environment configurations are fully isolated and explicitly excluded via `.gitignore`.
- **JWT Protection:** Access tokens are injected safely via Axios interceptors inside `src/api/api.js` to avoid exposing credential headers plain texts in React component levels.
- **Route Guards:** Implementation of strict client-side guarding leveraging robust local storage authentications.

---

<div align="center">
  <p>Built with ❤️ by the Zappit Team</p>
</div>
