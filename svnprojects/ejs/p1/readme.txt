npm init

name: (p1) mynpmproject
version: (1.0.0) 
description: Simple Web Server
entry point: (app.js) app3.js
test command: 
git repository: 
keywords: 
author: Manish Khanchandani
license: (ISC) 
About to write to /Users/mkhancha/web/bootstrap/svnprojects/ejs/p1/package.json:

{
  "name": "mynpmproject",
  "version": "1.0.0",
  "description": "Simple Web Server",
  "main": "app3.js",
  "dependencies": {
    "express": "^4.13.3"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Manish Khanchandani",
  "license": "ISC"
}


Is this ok? (yes) 



now you will see above code in package.json

now run,
npm install


or if you want to install module through command line, then use following, it will add it in your dependencies
npm install express --save

add following in dependencies,
"body-parser":"*"

and then run
npm install