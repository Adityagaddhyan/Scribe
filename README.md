# Scribe

A blogging app in development.

---
## Requirements

For development, you will only need Node.js and a node global package.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
### MongoDB  
For installation: https://www.mongodb.com/


####    If the installation was successful, you should be able to run the following command.

    $ node --version
    v.10.15.2
    
    $mongo --version
    MongoDB shell version v3.6.8

    $ npm --version
    5.8.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g



---

## Install

    $ git clone https://github.com/Adityagaddhyan/Scribe.git
    $ cd Scribe
    $ npm install

## About the app
-   Express as middleware and for routing
-   NodeJS for backend
-   VanillaJS for front end
-   Mongoose for mongoDB object modelling
-   MongoDB database

## Running the project
    $ mongod
    $ node app.js
or

    $ npm start
    #this will use nodemon. Make sure nnodemon is installed. If not, run:
    npm install nodemon
 
