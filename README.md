# SageAuthors

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b064299d42334bb2b219c306dd62067e)](https://app.codacy.com/manual/davidshare/SageAuthors?utm_source=github.com&utm_medium=referral&utm_content=davidshare/SageAuthors&utm_campaign=Badge_Grade_Dashboard)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/de6cb87330e0458abdc8ab3043c630ab)](https://www.codacy.com/manual/davidshare/SageAuthors?utm_source=github.com&utm_medium=referral&utm_content=davidshare/SageAuthors&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.com/davidshare/SageAuthors.svg?branch=develop)](https://travis-ci.com/davidshare/SageAuthors)

SageAuthors is a platform for creating and sharing blog posts.

## UI hosted on gh pages
- pending

## Server side hosted on Heroku
- pending

## API Documentation
- pending

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/davidshare/SageAuthors.git
```
2. Install dependencies 
```
e.g yarn install.
```
3. Start the application by running the start script.

e.g yarn start (for production environment) or yarn start:dev(for development environment)

4. Install postman to test all endpoints on port 3000.

### Test
run test using 'yarn test'.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th><th>REQUIRES AUTHENTICATION</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td> <td>User signup</td> <td>No</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/signin</td> <td>User signin</td><td>No</td></tr>

<tr><td>POST</td> <td>/api/v1/artices</td>  <td>Creat a new article</td><td>Yes</td></tr>

<tr><td>GET</td> <td>/api/v1/articles</td>  <td>Get all articles</td><td>No</td></tr>

<tr><td>GET</td> <td>/api/v1/articles/s/:slug</td>  <td>Get an article by slug</td></tr>

<tr><td>GET</td> <td>/api/v1/articles/user</td>  <td>Gets all articles for a particular user</td><td>No</td></tr>
 
</table>

### Coding Style
* Airbnb style guide. 

## Features

 ### Admin
 * Admins can view all users
 * Admins can view all articles
 * Admins can block a user
 * Admins can block an article

 ### Users
 * A user can create an account
 * A user can signin to his/her account
 * A user can view all articles
 * A user can update and delete his profile
 * A user can create an article
 * A user can update an article
 * A user can delete an article
 * A user can report an article
 * A user can follow another user
 * A user can react to an article
 * A user can share an article
 * A user can comment on an article
 * A user can reply to a comment on an article
 * A user can bookmark an article
 * A user can view the author profile
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

## Author
* David Essien

## License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details.

## Acknowledgement
- pending
