# 🎬 Netflix Clone - A Feature-Rich Streaming App

This is a fully-featured clone of the Netflix web application, built with a modern tech stack including **React, Firebase, and Tailwind CSS**.  
The app provides a complete user experience, from secure authentication to browsing and managing a personal list of movies and TV shows.

---

## 🚀 Live Demo
👉 [View Live App](#) *(You will add your Vercel link here after deployment)*

<img width="1335" height="635" alt="Netflix" src="https://github.com/user-attachments/assets/1dc70c4f-2b1c-43ee-b96f-e84cfcd5e948" />


---

## ✨ Features

### 🔐 Full User Authentication
- Secure user **sign-up, sign-in, and sign-out** functionality using Firebase Authentication.  
- **Email Verification**: New users are sent a verification email to prevent fake accounts.  
- **Password Reset**: Users can request a password reset email.  
- **Protected Routes**: All browsing pages are protected, ensuring only authenticated and verified users can access the content.  

### 🎥 Dynamic Content
- All movie and TV show data is fetched in real-time from **The Movie Database (TMDB) API**.  

### 📑 Multiple Pages
- **Home**: A main browse page with a dynamic hero banner and multiple rows of categorized content.  
- **TV Shows & Movies**: Dedicated pages for browsing TV shows and movies separately.  
- **My List**: A personal, persistent list of the user's favorite titles, saved to Firestore.  
- **Account**: A page displaying user details.  

### 🎬 Global Trailer Modal
- Clicking the **Play** button on any movie opens a clean, modal-based trailer player that works across the entire site.  

### 🔎 Real-time Search
- A full-screen search overlay that provides **search-as-you-type** results.  

### 📱 Fully Responsive Design
- Designed to be **functional and visually appealing** on all devices, from small mobile phones to large desktops.  

### 🎨 Polished UI/UX
- Responsive navbar with dynamic **Browse** and profile dropdowns.  
- **Scroll-to-black effect** on the navbar for a professional feel.  
- Interactive movie cards with a **tap-to-reveal** details panel on mobile.  

---

## 🛠 Tech Stack
- **Frontend**: React (with Vite)  
- **Styling**: Tailwind CSS  
- **Backend & Database**: Firebase (Authentication & Firestore)  
- **Routing**: React Router  
- **API**: The Movie Database (TMDB)  
- **Video Player**: react-youtube  

---

## ⚙️ Local Setup & Installation

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the repository
git clone https://github.com/priyanshusc/Netflix-Clone.git
cd Netflix-Clone

### 2️⃣ Install dependencies
npm install

### 3️⃣ Set up Environment Variables
Create a new file in the root named .env.local and add:

### TMDB API Key
VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"

### Firebase Config Keys
VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"

### 4️⃣ Run the development server
npm run dev

