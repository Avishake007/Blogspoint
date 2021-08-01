# Blogspoint
### Frontend: ###    
*  _ReactJs_
### Backend: ###    
 * _ExpressJs_ and _NodeJs_
### Database: ###  
*   _MongoDB_
### Components :  ###
* Home Page
*  About Page
*  Register Page
*  Login Page
*  Logout Page
*  Error Page

### NPM Packages used ###
* ExpressJs
* Nodemon
* JsonWebToken
* Mongoose
* BcryptJs
* Dotenv
### Operations ####
*  Created UserSchema for the database which will contain all the information of the user while registration.
*  Hashed the password using   _bcryptJs_   (12 rounds)
*  Saved the _hashed password_ of the user in the database.
*  Authentication is provided using _jsonwebtoken_   by creating and assigning a unique secret key for each user.
*   While login the user email id and password are checked for their existence in the database.
