# Ecomshop

A comprehensive, modern full-stack E-Commerce application built with the latest React ecosystem technologies including Next.js 15, React 19, and Tailwind CSS 4. This project includes both a customer-facing storefront and a fully-featured admin dashboard.

## 🌟 Key Features

### 🛍️ Storefront (Client-side)

- **Home & Discovery:** Engaging homepage with hero carousels (Embla Carousel) and Lottie animations.
- **Product Catalog:**
  - Browse products with advanced filtering and pagination.
  - Search functionality with an interactive command menu (CMDK).
  - Detailed product pages with rich text rendering (React Markdown).
- **Authentication:**
  - Secure user login and registration with form validation.
  - JWT-based authentication (access token + refresh token).
  - Refresh token rotation (issue new refresh token on each use and invalidate old one).
  - Secure token storage via HttpOnly cookies (`Secure`, `SameSite`).
- **Shopping Cart & Checkout:**
  - Multi-step, seamless checkout process.
  - Secure payment integration via **Stripe**, **VNPay**.
- **User Account Management:**
  - Profile settings with avatar uploading and cropping (React Easy Crop).
  - Order history and tracking.
- **Real-time Customer Support:** Live chat widget connecting customers directly to store admins using WebSockets.

### 📊 Admin Dashboard

- **Analytics & Overview:** Visualized data and sales metrics using **Recharts**.
- **Product Management:** Create, read, update, and delete (CRUD) products. Includes a markdown editor (`@uiw/react-md-editor`) for rich product descriptions.
- **Category & Brand Management:** Organize products efficiently by managing categories and brands.
- **Order Management:** Track and update customer order statuses.
- **Customer Management:** View and manage registered users.
- **Admin Chat Center:** Real-time interface to handle customer inquiries instantly.

### ⚙️ Core Application Features

- **Responsive UI:** Fully optimized for mobile and desktop screens.
- **Optimistic UI & Caching:** Fast interactions and data fetching handled by TanStack Query.
- **Toast Notifications:** Elegant user feedback using Sonner.

---

## 🛠️ Tech Stack

### Framework & Core

- **[Next.js 15](https://nextjs.org/):** React framework (App Router) running on Turbopack for ultra-fast development.
- **[React 19](https://react.dev/):** The latest version of React for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Strictly typed code for better maintainability and fewer bugs.

### Styling & UI Library

- **[Tailwind CSS 4](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/):** Unstyled, accessible UI primitives (Dialogs, Dropdowns, Tabs, etc.).
- **[Lucide React](https://lucide.dev/):** Beautiful and consistent iconography.
- **[Embla Carousel](https://www.embla-carousel.com/):** Lightweight and fluid carousel component.

### State Management & Data Fetching

- **[Zustand](https://zustand-demo.pmnd.rs/):** Small, fast, and scalable bearbones state-management.
- **[TanStack React Query (v5)](https://tanstack.com/query/v5):** Powerful asynchronous state management, server-state caching, and data fetching.
- **[Axios](https://axios-http.com/):** Promise-based HTTP client for API requests.

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/):** Performant, flexible, and extensible forms with easy-to-use validation.
- **[Zod](https://zod.dev/):** TypeScript-first schema declaration and validation library.

### Real-time & Payments

- **[Socket.io Client](https://socket.io/):** Bidirectional and low-latency communication for the live chat feature.
- **[Stripe](https://stripe.com/), [VNPay](https://vnpay.vn/):** Payment infrastructure for the internet.

### Additional Libraries

- **Recharts:** Composable charting library built on React components.
- **Sonner:** An opinionated toast component for React.
- **CMDK:** Fast, unstyled command menu React component.
- **React Easy Crop:** A React component to crop images with easy interactions.
- **Lottie React:** Render After Effects animations natively.
- **Date-fns & React Day Picker:** For date manipulation and calendar selection.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

### Installation

1. Clone the repository
2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory and configure the necessary environment variables:

```env
# Example Variables
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Running the Development Server

Start the application with Turbopack enabled:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Access the storefront at `/`
- Access the admin dashboard at `/admin`

## 📦 Building for Production

To build the application for production, run:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```
