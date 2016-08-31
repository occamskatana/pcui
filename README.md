#Playbook Web Interface

##Getting Started

The command line for Playbook is mainly comprised of gulp tasks. We use gulp heavily to serve the app in development, and build it for production. In production, we use express.js to serve the app. 

##Development
Use 
 >gulp serve 

to boot the development server. Changes will be automatically reflected in the browser. 

##Production

Use 

>gulp build 

to compile and concatenate all assets for production. After that 

>npm start 

can be used to test production code. 