# 🏠 RentNest - Property Rental & Management Platform

A modern, full-stack property rental and management web application built with **Next.js**, **Tailwind CSS**, and a secure backend REST API.

RentNest connects **Tenants, Landlords, and Administrators** in a seamless ecosystem for property listings, rental requests, payments, and user management.

---

## 🚀 Live Demos & Links

* **Frontend Repository:** `YOUR_FRONTEND_REPOSITORY_URL`
* **Backend API Base URL:** `YOUR_BACKEND_API_URL`
* **Backend Repository:** https://github.com/saifur2468/L2-A4-Prisma
* **Video Explanation:** `YOUR_VIDEO_URL`

---
---👤 **Admin Credentials **
Email :admin26@gmail.com
Password:123456
 ---  
##

## ✨ Key Features

### 👤 Public Features

* **Browse Categories:** Explore various property types and categories.
* **Search Properties:** Filter and search available properties by location, such as Dhanmondi and Gulshan.
* **Authentication:** Secure user registration and login with JWT support.

### 🏡 Landlord Flow

* **Property Management:** List new properties with details, pricing, amenities, and category mapping.
* **Rental Requests:** Review and approve/reject incoming rental applications from tenants.
* **Secure Payments:** Integrated payment intent creation and confirmation workflow.

### 🛡️ Admin Panel

* **User Oversight:** View all registered platform users and manage account statuses (Ban/Unban users).
* **Listing Management:** Monitor all properties listed across the platform with landlord details.
* **Rental Oversight:** Track and audit all global rental requests and statuses.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* App Router
* Turbopack
* React
* Tailwind CSS
* Lucide Icons
* React Hot Toast

### Backend

* Node.js
* Express.js
* Prisma ORM
* Database

### Authentication & Security

* JWT (JSON Web Tokens)
* Protected Routes
* Role-Based Access Control (RBAC)

---

# ⚙️ Installation & Setup

## Clone the Frontend Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd your-frontend-folder
```

## Install Dependencies

```bash
npm install
```

## Create Environment Variables

Create a `.env.local` file in the frontend project:

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
```

---

# ⚙️ Backend Setup

## Clone Backend Repository

```bash
git clone https://github.com/saifur2468/L2-A4-Prisma.git
cd L2-A4-Prisma
```

## Install Dependencies

```bash
npm install
```

## Configure `.env`

Create a `.env` file:

```env
DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"
JWT_SECRET="YOUR_JWT_SECRET"
STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
PORT=5000
```

---

# 🗄️ Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Database Schema

```bash
npx prisma db push
```

### Prisma Migrations

```bash
npx prisma migrate dev
```

---

# ▶️ Run the Project

## Frontend

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:3000
```

## Backend

```bash
npm run dev
```

Backend will normally run on:

```text
http://localhost:5000
```

---

# 💳 Payment Flow

The application uses **Stripe** for secure online payments.

```text
Tenant
   ↓
Submit Rental Request
   ↓
Landlord Approves Request
   ↓
Tenant Opens Payment Page
   ↓
Create Stripe Payment Intent
   ↓
Complete Payment
   ↓
Backend Verifies Payment
   ↓
Rental Status → ACTIVE
   ↓
Payment History Updated
```
