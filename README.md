# E-Shop

## Descripton

This is SPA that users can browse and "purchase" any kind of items, only authorized users can interact with the application.

The user stays logged in by storing token in Local Storage.

Protected routes are used to ensure that only users can access to Catalog View, Purchased Items View and Cart View.

## View Pages

Catalog - In catalog page users can browse through all items.
Purchased Items - In this page the user can preview all of the items that was purchased by them.
Cart - In cart page the user can add more or remove the quantity of the chosen product and proceed with the "perchase".
Register - In register page by submiting an username and password an user can be registered in the server while being provided with unique id and authentication token.
Login - Here by submiting correct username and password, the user will be granted with all the access for authenticated users.
Logout - By pressing logout the local storage is being cleared.

## Used Libraries

-   React
-   React-cookie
-   React-dom
-   React-router-dom
-   Axios
-   React-scripts
-   Typescript
-   Web-vitals

## Setup

1. Clone Repository
2. In terminal run npm install
3. In terminal run npm start
