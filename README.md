#  Task Manager 🚀

A premium, full-stack task management application with a focus on simplicity and elegant design. Build with React, Node.js, and Tailwind CSS.

## ✨ Features

- **Authentication**: Secure signup and login with standard JWT implementation.
- **Board-based Organization**: Create multiple boards for different projects or areas of your life.
- **Premium UI**: Modern dark-mode aesthetic with glassmorphism and smooth transitions.
- **Responsive**: Fully optimized for various screen sizes.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zustand (State Management), Lucide React (Icons).
- **Backend**: Node.js, Express, JWT, BcryptJS.
- **Database**: MongoDB (via Mongoose).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd To-Do

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://ts11145t_db_user:nci8xP8EGScX3auI@cluster0.rzapysd.mongodb.net/todo-app
JWT_SECRET=your_super_secret_key_here
```

### 3. Run the Application

#### Start the Backend:

```bash
cd server
npm run dev # or node index.js
```

#### Start the Frontend:

```bash
cd client
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app!

## 📜 License

MIT License.
