# MERN Note App

#### Video Demo: https://youtu.be/rfHMIb_y4Xg

#### Description:

MERN Note App is a full-stack web application designed to help users securely manage their personal notes online. The main problem this project aims to solve is the lack of a simple and secure place where users can store, organize, and access their notes from anywhere. Many users rely on insecure or unorganized methods for storing notes, and this application provides a structured and authenticated solution.

This project was developed as the Final Project for CS50x. It demonstrates how modern web applications are built using a client-server architecture, secure authentication, and database-driven functionality. The application allows users to register, log in, and manage their own notes privately. Each user only has access to their own data.

---

### Frontend (Client Side)

The client side of the application is built using React. React was chosen because it allows building dynamic user interfaces using reusable components. React Router is used to manage navigation between pages such as login, registration, password reset, and the notes dashboard.

Material UI is used to design a clean, responsive, and user-friendly interface. The layout automatically adapts to different screen sizes, making the application usable on both desktop and mobile devices. Framer Motion is used to add smooth animations, which improves the overall user experience.

Axios is used on the client side to communicate with the backend server. All requests related to authentication and note management are sent through HTTP requests. Protected routes are implemented to ensure that users cannot access private pages unless they are authenticated.

The client also includes offline detection logic. If the user loses internet connectivity, the application detects it and notifies the user, improving usability and preventing confusion.

---

### Backend (Server Side)

The backend of the application is built using Node.js and Express. Express is used to create RESTful APIs that handle authentication, note management, and password reset functionality. MongoDB is used as the database to store users and notes.

User authentication is handled using JSON Web Tokens (JWT). When a user logs in successfully, the server generates a JWT token and sends it back to the client. This token is then used to authenticate future requests. Cookies are used to store the token securely.

Passwords are never stored as plain text. Before saving a password in the database, it is hashed using bcrypt. This ensures that even if the database were compromised, user passwords would remain protected.

---

### Notes Management

Each note is associated with a specific user ID. This design ensures that users can only access their own notes. The backend provides endpoints to create, read, update, and delete notes (CRUD operations). These endpoints are protected using authentication middleware to prevent unauthorized access.

Tags are implemented to allow users to organize notes more effectively. This helps users quickly filter and manage large numbers of notes.

---

### Password Reset with OTP

The application includes a password reset feature implemented using a One-Time Password (OTP) system. When a user requests a password reset, the server generates an OTP code and temporarily stores it. The user must provide the correct OTP before being allowed to reset their password.

This approach keeps the entire reset logic securely on the server side and avoids reliance on external email services. It also demonstrates how sensitive operations can be handled securely using temporary tokens and server-side validation.

---

### Security Considerations

Security was a major focus in this project. Password hashing, JWT authentication, protected routes, and secure HTTP headers using Helmet are all implemented to protect user data. These measures help prevent common vulnerabilities such as unauthorized access and data exposure.

---

### Design Decisions

One of the main design decisions was separating the client and server into two independent applications. This makes the project more scalable and easier to maintain. Another important decision was implementing OTP-based password reset instead of email-based solutions, which keeps the project simple and compatible with free hosting platforms.

---

### Conclusion

MERN Note App is a complete full-stack application that demonstrates the core concepts learned in CS50, including programming logic, web development, security, and database management. This project helped solidify my understanding of how real-world web applications are designed and built.


---
### ⚠️ Notes & Limitations

Email-based password reset was not implemented due to the lack of free plans from third-party email services. Instead, I implemented a secure OTP-based password reset system that is fully handled and verified on the server to demonstrate the complete reset flow without external dependencies.

Google login was removed to reduce complexity and avoid reliance on external authentication services. The related code is still present in the project for reference and future enhancement.