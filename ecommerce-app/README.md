
# 🛒 MERN Stack E-Commerce Application

This is a full-featured E-Commerce web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to register, browse products, filter by category, add items to cart, place orders, and view their order history. Admin users can manage products and view all orders.

---

## 🚀 Tech Stack

- **Frontend**: React, React Router DOM, Context API, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **Deployment (Optional)**: Render / Vercel / Railway

---

## ✨ Features

### 👤 User Features
- Register/Login with JWT authentication
- Browse and filter products by category
- Add to cart, checkout with mock payment
- View personal order history (with images)

### 🔧 Admin Features
- View all users’ orders
- Add, edit, delete products
- Mark orders as delivered

---

## 🧭 Project Structure

```
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
```

---

## 🔌 Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-ecommerce-app.git
cd mern-ecommerce-app
```

### 2. Install Dependencies

```bash
# For client
cd client
npm install

# For server
cd ../server
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in `server/` with:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the App

```bash
# From project root
cd server
npm run dev

# In another terminal
cd ../client
npm start
```

---

## 📝 To Do

- Add Stripe or Razorpay for real payment integration
- Add product reviews and ratings
- Improve responsive UI and SEO

---

## 📅 Project Created

May 29, 2025

---

## 👨‍💻 Author

Made with ❤️ by Skanda Kumar H S
