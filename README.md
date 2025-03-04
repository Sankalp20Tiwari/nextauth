# 📌 NextAuth Authentication System

A secure and scalable authentication system built using Next.js, TypeScript, and NextAuth.js. It supports user authentication with features such as signup, login, password reset, email verification, and profile management.

## 🚀 Features

✅ Secure authentication with NextAuth.js  
✅ Email-based user verification  
✅ Password reset functionality  
✅ Middleware for route protection  
✅ API-based authentication handling  
✅ Fully typed with TypeScript  
✅ Modular and scalable project structure  

## 📂 Folder Structure

```
nextauth/
│-- src/
│   ├── app/
│   │   ├── api/              # API routes for authentication
│   │   ├── forgotpassword/   # Forgot password page
│   │   ├── login/            # Login page
│   │   ├── profile/          # User profile page
│   │   ├── resetpassword/    # Password reset page
│   │   ├── signup/           # Signup page
│   │   ├── verifyemail/      # Email verification page
│   │   ├── layout.tsx        # Layout file
│   │   ├── page.tsx          # Main entry page
│   │   ├── globals.css       # Global styles
│   ├── components/           # Reusable UI components
│   ├── dbConfig/             # Database configuration
│   ├── helpers/              # Utility functions
│   ├── models/               # Database models
│   ├── utils/                # Helper utilities
│   ├── middleware.ts         # Middleware for route protection
│-- .env                      # Environment variables
│-- next.config.ts            # Next.js configuration
│-- package.json              # Dependencies and scripts
│-- README.md                 # Project documentation
```

## ⚙️ Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/nextauth.git
   cd nextauth
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file and add the required variables:
   ```env
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_secret_key
   EMAIL_SERVER=smtp://your-email-server
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

## 🔌 API Endpoints

| Endpoint          | Method | Description |
|------------------|--------|-------------|
| `/api/auth/signup` | POST | User signup |
| `/api/auth/login`  | POST | User login  |
| `/api/auth/logout` | POST | Logout user |
| `/api/auth/reset-password` | POST | Reset password |
| `/api/auth/verify-email` | GET | Verify user email |

## 🚀 Deployment

### **Deploy on Vercel**
1. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Run the deployment command:
   ```sh
   vercel
   ```


## 🛠 Technologies Used

- **Next.js** - React framework for server-side rendering
- **NextAuth.js** - Authentication library
- **TypeScript** - Strongly typed JavaScript
- **MongoDB** - Database for storing user credentials
- **Tailwind CSS** - Styling framework
- **Docker** - Containerization for deployment

---

### ✨ Contribute & Support
Feel free to contribute to this project by creating issues or submitting pull requests. If you find this useful, give it a ⭐ on GitHub!

