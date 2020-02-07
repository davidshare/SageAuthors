/* eslint-disable max-len */
// Signup constants
export const SIGNUP_SUCCESS = 'User created successfully';
export const SIGNUP_ERROR = 'Sorry, the user could not be created';

// signin constants
export const INVALID_SIGNIN
  = 'Invalid login: either your email or password is not correct.';
export const SIGNIN_SUCCESS = 'The user successfully signed in.';

// VALIDATION CONSTANTS
export const EMAIL_REGEX = /^([a-z_.!@#$%^&*0-9]{3,25})@([a-z]{3,20})\.([a-z]){2,7}(\.[a-z]{2,5})?$/i;
export const PASS_REGEX = /^(?=.*[0-9])([a-zA-Z0-9!@#$.%^&*~`?><,.';"|}{}+-=)()|]{8,20})$/;
export const NAME_REGEX = /^([a-zA-Z]){3,20}$/;
export const USERNAME_REGEX = /^([a-z0-9_]){5,16}$/;
export const UUID_REGEX = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i; // UUID Regex credit to @jakewtaylor

// USER CONSTANTS
export const INVALID_FIRSTNAME
  = 'Invalid firstname: Please supply a valid first name.';
export const INVALID_LASTNAME
  = 'Invalid lastname: Please supply a valid last name.';
export const INVALID_EMAIL = 'Invalid email: Please supply a valid email.';
export const INVALID_USERNAME
  = 'Invalid username: Please supply a valid username. Minimum of 5 characters, maximum of 16 either letters or numbers.';
export const INVALID_PASSWORD
  = 'Invalid password: Please supply a valid password.';
export const EMAIL_EXISTS
  = 'Sorry, this email address has already been registered.';
export const USERNAME_EXISTS = 'Sorry, this username has already been used.';
export const REQUIRED_FIELDS = 'All fields are required.';
export const REQUIRED_TITLE = 'The title is required.';
export const INVALID_TITLE
  = 'Invalid Todo title: please supply a valid todo title.';
export const NOT_A_USER = 'Sorry, the user does not exist.';
export const INVALID_USER_ID = 'Sorry, the userId is invalid';


// AUTH CONSTANTS
export const REQUIRED_PASSWORD = 'Password error: no password provided.';
export const REQUIRED_COMPARE_PASSWORDS = 'Please supply both passwords.';
export const INVALID_TOKEN
  = 'Authentication failed: Please supply a valid token.';

//API prefix
export const API_PREFIX = '/api/v1/';

// Category
export const CREATE_CATEGORY_ERROR = 'Sorry: could not create the category.';
export const CREATE_CATEGORY_SUCCESS = 'The category was created successfully.';
export const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9\s?:]{4,255}$/;
export const INVALID_CATEGORY = 'Sorry, the category is invalid';
export const INVALID_CATEGORY_ID = 'Sorry, the categoryId is invalid';
export const CATEGORY_EXISTS = 'Sorry, the category already exists';

// Article
export const CREATE_ARTICLE_ERROR = 'Sorry: could not create the category.';
export const CREATE_ARTICLE_SUCCESS = 'The article was created successfully.';
export const NOT_A_CATEGORY = 'Sorry, the category does not exist.';
export const INVALID_ARTICLE
  = 'Please create a valid article. An article cannot be less than 10 characters.';
export const REQUIRED_ARTICLE_FIELDS = 'Please the article title, body, userId, and categoryId are required.';
export const ARTICLE_EXISTS = 'Sorry, you already have an article with this title.';
export const ARTICLE_NOT_FOUND = 'The article was not found.';
export const GET_ARTICLE_SUCCESS = 'Got the articles successfully';
