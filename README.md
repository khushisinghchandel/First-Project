# RentHunt 🏠

RentHunt is a full-stack web application that allows users to discover, list, and review rental properties. Built with the MERN stack (using EJS for server-side rendering), this project follows the MVC (Model-View-Controller) architecture and implements secure, stateful user authentication.

## 🚀 Live Demo
*(https://renthunt.onrender.com/listings)*

## ✨ Key Features

* **Stateful Authentication:** Secure user registration, login, and session management using Passport.js and `connect-mongo`.
* **Authorization Pipeline:** Custom Express middleware chains (`isLoggedIn`, `isOwner`) to protect RESTful routes and ensure users can only edit/delete their own properties and reviews.
* **Complex Data Relationships:** Utilizes MongoDB and Mongoose to handle One-to-Many relationships (Listings to Reviews) using document referencing and population.
* **Cloud Media Management:** Integrated Multer and Cloudinary for seamless, multi-image uploads and dynamic image transformations.
* **Geocoding & Interactive Maps:** Uses the Mapbox SDK for forward geocoding, converting user-inputted locations into spatial coordinates to render interactive property maps.
* **Centralized Error Handling:** Robust backend architecture that wraps asynchronous operations to catch unhandled promise rejections and database validation errors, preventing server crashes.

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript), ejs-mate
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose, MongoStore
* **Security & Auth:** Passport.js, passport-local, express-session
* **APIs & Services:** Cloudinary, Mapbox SDK
