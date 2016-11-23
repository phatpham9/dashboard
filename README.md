# dashboard

[![Build Status](https://travis-ci.org/phatpham9/dashboard.svg?branch=master)](https://travis-ci.org/phatpham9/dashboard)
[![Dependencies Status](https://david-dm.org/phatpham9/dashboard.svg)](https://github.com/phatpham9/dashboard)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/phatpham9/dashboard/raw/master/LICENSE)
[![Paypal Donate](https://img.shields.io/badge/paypal-donate-blue.svg)](https://www.paypal.me/phatpham9)
[![Fork](https://img.shields.io/github/forks/phatpham9/dashboard.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/phatpham9/dashboard#fork-destination-box)

Dashboard app based on AngularJS, Express and MongoDB

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Requirements

* Mac OS X, Windows, or Linux
* [Git](https://git-scm.com/) installed
* [Node.js](https://nodejs.org/en/) v4.5 or newer
* `npm` v3.10 or newer (new to [npm](https://docs.npmjs.com/)?)
* `bower` v1.7 or newer (install [bower](https://bower.io/#install-bower))
* `grunt-cli` (install [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli))

### Clone the repository

Open up a terminal

```
git clone https://github.com/phatpham9/dashboard.git
cd dashboard
```

### Features

* Component-driven architecture: components based constructed source code both client & server.
* Node ACL: access control lists, APIs authorization.
* Passport.js: Passport local authentication included.
* GruntJS Tasks: clean, copy, concat, uglify, cssmin, ejs, htmlmin, nodemon, watch, concurrent, etc...

## Installing

### Install dependencies

The following command will install node dependencies, then auto install client components via bower.

```
npm install
```

## Configuration

### app.json

This `app.json` information is used for default server config and injected to client source code.

* name: build assets' filename, angular app name, prefix of session id, localstorage data, etc...
* title: app title, title meta tag
* description: description meta tag
* version: build assets' version filename
* year: copyright year
* language: default language of angular app
* cookieId: browser cookie id
* modules: angular modules' name
* author: made with love by & from

### server/config

* `database.js`: host, port and database name
* `email.js`: admin email, email from (whose send to user), email service credentials
* `index.js`: host and port
* `permissions.js`: default permissions of admin user
* `session.js`: session secret, etc...
* `view.js`: expressjs view engine

### server/data/default

Default data to load on starting server. All data must have `isProtected: true`.

* `group.js`: default protected groups such as admin
* `setting.js`: default permissions (stored in db also) and menubar tree
* `user.js`: default users such as admin

## Running

### Development

```
npm start
```

Open the browser and enter `http://localhost:9000/`

### Production

```
npm run build:prod && node server/app
```

## Authors

* [Phat Pham](http://onroads.xyz)