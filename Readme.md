
# Note Vault

A full-stack MERN notes application that provides a simple, secure, and distraction-free environment for creating, organizing, and managing personal notes.

Users can register an account, securely log in using JWT authentication, and manage their own private collection of notes.

The project was built primarily for learning modern full-stack web development and serves as a portfolio project.

![Home Page](Screenshots/home.png)

More screenshots are available in the **Screenshots** folder.

---

## Technologies Used

### Frontend

- React 19
- Vite
- React Router
- Bootstrap 5
- Axios
- Zustand

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- CORS
- dotenv

---

## Assets & Credits

- Background illustrations: https://www.vecteezy.com
- Icons and logo: https://www.flaticon.com

---

# Project Setup (Windows)

## Prerequisites

Make sure the following are installed:

- Node.js (LTS recommended)
- npm
- MongoDB Community Server (or MongoDB Atlas)
- Git (optional but recommended)

---

## 1. Clone the repository

```bash
git clone "https://github.com/Unknown56860/Note_Vault.git"
```

or download the project ZIP and extract it.

---

## 2. Navigate into the project

Open the folder:

```
Note_Vault
```

Inside it, open:

```
noteVault
```

---

## 3. Create the environment file

Copy

```
.env.example
```

Rename the copy to

```
.env
```

---

## 4. Configure MongoDB

If using a local MongoDB installation, make sure a database named

```
note_vault
```

exists.

Otherwise if you have Atlas, replace the value of

```
MONGO_URL
```

inside `.env` with your MongoDB Atlas connection string.

Example:

```env
MONGO_URL=mongodb://localhost:27017/note_vault
```

or

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/note_vault
```

---

## 5. Backend configuration

Open

```
backend-express/serverConfig.js
```

Comment:

```javascript
dotenv.config();
```

Uncomment:

```javascript
dotenv.config({ path: "../.env" });
```

---

## 6. Frontend configuration

Open

```
frontend-react/vite.config.js
```

Uncomment:

```javascript
envDir: "../"
```

---

## 7. Install dependencies

Open **two** Command Prompt windows.

### Terminal 1

```bash
cd backend-express
npm install
```

### Terminal 2

```bash
cd frontend-react
npm install
```

---

# Running the Project

## Start the backend

Open a Command prompt window inside

```
backend-express
```

run

```bash
node server.js
```

Expected output should look similar to:

```text
injected (5) from env ...
[MongoDB]: database ready
[Server]: listening on port 3000
```

---

## Start the frontend

Open a Command prompt window inside

```
frontend-react
```

run

```bash
npm run dev
```

After a few seconds Vite will display a URL similar to

```
http://localhost:5173
```

Open the URL in your browser.

---

# Project Structure

```
noteVault/
│
├── backend-express/
│   ├── src/
│   ├── server.js
│   └── serverConfig.js
│
├── frontend-react/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── .env
└── .env.example
```

---

# Project Workflow

1. Register a new account.
2. Login using your credentials.
3. JWT authentication stores a secure HTTP-only cookie.
4. Create new notes.
5. View all notes.
6. Open any note.
7. Edit existing notes.
8. Delete notes.
9. Update or delete your profile.
10. Logout.

---

# Features

- User registration
- Secure login with JWT authentication
- HTTP-only authentication cookies
- Personal note vault
- Create notes
- View all notes
- Read individual notes
- Edit notes
- Delete notes
- Update profile
- Delete account
- Responsive Bootstrap interface
- Toast notifications
- Protected backend routes
- MongoDB persistent storage

---

# Future Improvements

- Search functionality
- Categories and tags
- Rich text editor
- Markdown support
- File attachments
- Dark mode
- User avatars
- Pagination
- Password reset
- Email verification
- Improved profile management
- Automated testing
- Docker support
- CI/CD pipeline

---

# Purpose

This project was built as a side project for learning, experimentation, and portfolio purposes.

---

# Contributing

Contributions of any kind are welcome.

Feel free to fork the repository, open issues, or submit pull requests to improve the project.

---

# License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.


