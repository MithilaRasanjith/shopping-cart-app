# FreshCart Shopping Cart Application

## 1. Project Overview

FreshCart is a web-based shopping cart application built using React and Firebase. The system allows users to browse products, filter products by category, add products to a shopping cart, update quantities, checkout, and place orders. Admin users can manage products through an admin panel.

## 2. Technologies Used

- React
- Vite
- JavaScript
- CSS
- Firebase Authentication
- Firebase Firestore
- GitHub

## 3. Main Features

### User Features

- Browse products
- Filter products by category
- Add products to cart
- Increase or decrease product quantity
- Remove products from cart
- View cart total dynamically
- Checkout with order summary
- Login with Google
- Place orders

### Admin Features

- Admin-only access
- Add new products
- Edit existing products
- Delete products
- Store products in Firestore

## 4. Authentication

The application currently supports Google login using Firebase Authentication.

Facebook login and Passkey authentication are planned as future enhancements.

## 5. Database

The project uses Firebase Firestore.

Main collections:

products
orders

products collection

Stores product information such as:

name
category
price
description
image
active
orders collection

Stores order information such as:

userId
userName
userEmail
items
totalPrice
status
createdAt
6. Security

The application uses Firebase Authentication and Firestore Security Rules.

Only the selected admin email can add, edit, or delete products.

Normal users can:

View products
Add products to cart
Place orders after login
7. How to Run the Project

Install dependencies:

npm install

Run the development server:

npm run dev

Open the local URL shown in the terminal, usually:

http://localhost:5173
8. Current Limitations
Payment is not implemented.
Facebook login is not finalized.
Passkey authentication is not implemented.
Order history page is not included yet.
Product image upload is not included yet.
9. Future Enhancements
Facebook login integration
Passkey authentication using WebAuthn
User order history page
Payment gateway integration
Delivery address management
Email order confirmation
Product image upload using Firebase Storage
Admin order management dashboard
10. Conclusion

FreshCart successfully implements the core requirements of an online shopping cart system. It includes product browsing, cart management, checkout, Google login, Firestore database integration, and admin product management.