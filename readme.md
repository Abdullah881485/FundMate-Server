# FundMate Server

### LoanLink – Microloan Request & Approval Tracker System (Backend)

## 📌 Project Overview

FundMate Server is the backend API for **LoanLink**, a microloan request, approval, and management system.  
It handles authentication, role-based authorization, loan management, loan applications, and Stripe payment processing.

Built using **Node.js, Express, MongoDB, Firebase Admin SDK, and Stripe**, this server ensures secure data handling and smooth communication with the client application.

---

## 🚀 Live API URL

🌐 **Server Base URL:** https://fundmate-server.vercel.app

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- Firebase Admin SDK (JWT Verification)
- Stripe Payment Gateway
- dotenv
- CORS

---

## 🔐 Security Features

- Firebase JWT token verification
- Protected private routes
- Environment variables for:
  - MongoDB credentials
  - Firebase service key
  - Stripe secret key
- Secure role-based access control (Admin / Manager / Borrower)

---

## 📂 Core API Features

### 👤 User Management

- Register new users
- Get users with pagination (Admin only)
- Update user roles (Admin)
- Get user role by email

### 💳 Loan Management

- Add new loans
- Update loan information
- Delete loans
- Get all loans with pagination
- Get available loans for Home Page
- Loan details by ID
- Manager-specific loan management

### 📝 Loan Applications

- Apply for loan (Borrower)
- View my loan applications
- View all applications (Admin)
- Filter applications by status
- Approve / Reject loan applications
- Delete pending loan applications

### 💰 Payment System

- Stripe checkout session creation
- Fixed $10 application fee
- Payment success verification
- Update application fee status
- Store payment history
- View payment details by loan ID

---

## 🧾 API Endpoints Overview

### Authentication

- Firebase JWT verification middleware

### Loans

- `POST /allLoan`
- `PATCH /allLoan/:id`
- `DELETE /allLoan/:id`
- `GET /allLoan`
- `GET /loanDetails/:id`
- `GET /availableLoan`

### Applications

- `POST /allApplication`
- `GET /allApplication`
- `GET /myLoanApplication`
- `PATCH /pendingApplication/:id`
- `DELETE /allApplication/:id`

### Users

- `POST /users`
- `GET /users`
- `PATCH /users/:id`
- `GET /users/:email/role`

### Payments

- `POST /applicationFee`
- `PATCH /paymentSuccess`
- `GET /payment`

---

## 🧪 Error Handling

- Proper status codes for unauthorized access
- Handles invalid JWT tokens
- Prevents unauthorized data access
- Handles Stripe payment verification errors

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and include:

```env
PORT=5000
DB_USER=your_db_user
DB_PASS=your_db_password
STRIPE_KEY=your_stripe_secret_key
CLIENT_DOMAIN=https://fundmate-client.vercel.app
FB_SERVICE_KEY=base64_encoded_firebase_service_key
```
