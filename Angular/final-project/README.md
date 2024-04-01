# Web SPA (Single Page Application) Project - R&C Services

- This project is a web Single Page Application (SPA) built with Angular for the frontend and Firebase for the backend.
- It allows users to register, login, post services, edit or delete them.
- Non-logged in users can only view details of services, while logged-in users have access to additional functionalities like posting services and managing their own posts. Additionally, the application includes a cart functionality.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server - Required to start the project

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies Used

**Frontend:**

- Angular
- HTML
- CSS
- TypeScript
- Firebase Authentication (for user authentication)
- Firebase Firestore (for data storage)

**Backend:**

- Firebase (Authentication and Firestore)

# Features

**Route Guards**

- Registerd/Logged User cannot go to Register/Login page
- Registerd/Logged User cannot go to Edit page or delete Post that he doesnt own
- Guset User cannot go to Cart/Add Service/My Profile pages and doesn't see Logout button
- Guest User cannot add to cart, can only see details

- **Home Page For Guests** (Get sarted redirects to Services)

  ![home-page.png](./pictures-for-readme/home-page.png)

- **User Registration:** Users can create an account to access the full functionality of the application.

  ![register-page.png](./pictures-for-readme/register-page.png)

- **User Login:** Registered users can log in to their accounts securely.

  ![login-page.png](./pictures-for-readme/login-page.png)

- **Service Posting:** Logged-in users can post services they offer.

  ![post-service.png](./pictures-for-readme/post-service.png)

- **Service Details:** (owner of service)

  ![/details-page-owner](./pictures-for-readme/details-page-owner.png)

- Service Details (logged in not owner of service)

  ![/details-page-logged-in-not-owner](./pictures-for-readme/details-page-logged-in-not-owner.png)

- Service Details (guest - not logged in)

  ![/details-page-not-logged-in](./pictures-for-readme/details-page-not-logged-in.png)

- **Service Editing:** Users can edit the services they have posted. + Confirmation Modal

  ![edit-service.png](./pictures-for-readme/edit-service.png)
  ![edit-service-modal](./pictures-for-readme/edit-service-modal.png)

- **Service Deletion:** Users have the ability to delete services they have posted. + Confirmation Modal

  ![delte-service-modal](./pictures-for-readme/delete-service-modal.png)

- **Cart Functionality:** Users can add services to their cart for later purchase or reference. **Owners Cannot Add Their Services To Cart**
  Empty Cart (Browse Services Redirects To Servcies Catalog)
  ![empty-cart.png](./pictures-for-readme/empty-cart.png)
  Cart With Services (Checkout Empties Cart)
  ![cart-with-two-services.png](./pictures-for-readme/cart-with-two-services.png)

- **Services Catalog:** Two types of services: Our/Community where community is the users posted services

Our Services Catalog
![services-catalog-our-services.png](./pictures-for-readme/services-catalog-our-services.png)
Community Services Catalog (users posted services )
![services-catalog-community.png](./pictures-for-readme/services-catalog-community.png)

- **Service Card:** Three types: Logged in not owner/Guest look - Owner/Logged in added to cart

- Logged in not owner
  ![service-card-logged-in-not-owner.png](./pictures-for-readme/service-card-logged-in-not-owner.png)
- Guest look/Owner
  ![service-card-guest-or-owner.png](./pictures-for-readme/service-card-guest-or-owner.png)
- Logged in added to cart
  ![service-card-guest-or-owner.png](./pictures-for-readme/service-card-added-to-card.png)

- **My Profile Page:** This page shows every posted service that the user posted

User has created service
![my-profile-has-posted.png](./pictures-for-readme/my-profile-has-posted.png)
User has not created service
![my-profile-has-not-posted.png](./pictures-for-readme/my-profile-has-not-posted.png)

- **About US Page:** Get Involved Button Redirects To Home Page
  ![/about-us-page.png](./pictures-for-readme/about-us-page.png)

- **Error Page (404)** Redirected when invalid url is entered
  ![/error-page.png](./pictures-for-readme/error-page.png)

- **Current Weather:** Current Weather Is Show In The Nav Bar Regardless Of The User Authenitcation
  ![/current-weather.png](./pictures-for-readme/current-weather.png)

- **Loading Spinner**
  ![/loading-spinner.png](./pictures-for-readme/loading-spinner.png)

# DATA Validations

- **Backend Validation**
  ![/firebase-data-validation.png](./pictures-for-readme/firebase-data-validation.png)

- **Register User**

  Email, Pass and RePass are required
  ![/register-page-validators-required.png](./pictures-for-readme/register-page-validators-required.png)
  Email should be valid email, Pass atleas 6 characters and RePass must match Pass + Terms CheckBox must be checked
  ![/register-page-validators-min-lengths.png](./pictures-for-readme/register-page-validators-min-lengths.png)
  Email is already in use + Terms CheckBox must be checked
  ![/register-page-email-alredy-in-use.png](./pictures-for-readme/register-page-email-alredy-in-use.png)

- **Login User**

  Email and Pass are required
  ![/login-page-required.png](./pictures-for-readme/login-page-required.png)
  Email should be valid email, Pass atleas 6 characters
  ![/register-page-validators-min-lengths.png](./pictures-for-readme/login-page-required-min-length.png)
  Invalid Email or Pass when cannot login
  ![/register-page-validators-min-lengths.png](./pictures-for-readme/login-page-invalid-email-or-pass.png)

- **Add Service**

Name, Image,Price, Description are required
![/post-service-required.png](./pictures-for-readme/post-service-required.png)
Name - 5 chars, Image - must start with data:image/,Price- must be above 0, Description atleas 10 characters
![/register-page-validators-min-lengths.png](./pictures-for-readme/service-add-min-length.png)
Valid data + Terms checkbox
![/service-add-valid-data.png](./pictures-for-readme/service-add-valid-data.png)
