<p align="center" ><a href="https://skytech-8ce24.firebaseapp.com/" target="_blank"><img style="display: block; margin: auto;" src="https://avatars1.githubusercontent.com/u/37063945?s=200&v=4" /></a></p>
<h1 align="center">OPEN DATA EDITOR</h1>
<h4 align="center">Opendata Developer Network</h4>

### Project Description
ODEN (Open Data Developer Network) is a novel system for helping developers easily find and consume Open Data in their mobile apps or websites. Open Data is data that can be freely used  re-used and redistributed by anyone.  ODEN's developer community needs a wealth of Open Data to exist from a variety of sources for the apps they develop.

The issue we have is that not all of those who want to supply Open Data understand the format Open Data requires. The goal of this project is to create an Open Data Editor to make this process easier. ODEN makes use of schemas <a href="http://json-schema.org/">JSON Schema</a> to describe what Open Data looks like.

The Open Data Editor will allow those with limited technical knowledge to easily create/edit Open Data without needing to understand these underlying schemas.  The Open Data Editor will be a dynamic web form that is built from the selected schema and needs to show an HTML representation of the data in an easy to understand visual as it is being put in

This document will walk you through the process of setting up and creating the application of Team 3.

### Members
* <a href="https://github.com/apollo78124">Eunhak (David) Lee</a>
* <a href="https://github.com/Greg-Mercer">Gregory Mercer</a>
* <a href="https://github.com/hawawa">Hank Change</a>
* <a href="https://github.com/mikah13">Mike Hoang</a>

# Table of Contents
* [Technology Used](#technology-used)
* [Getting Started](#getting-started)
* [Firebase Hosting](#connect-mysql-and-php)
* [Credit](#credit)


## Technology Used
* JSON Schema
* HTML5, CSS3, JavaScript
* React
* Material Design
* Firebase


## Getting Started
Let's first clone the repository from GitHub. Choose your workspace directory and enter this into your console:
<br />
``` $ git clone https://github.com/mikah13/test-skt.git```

Once you have everything from our repository. You need to install React. Assuming you have <a href="https://www.npmjs.com/"> NPM</a> installed, simply paste this piece of code into your console:
<br />
```$ npm install react ```

Then you can start the application by running:
```$ npm start```

## Firebase Hosting
Hosting React on Firebase is really easy for new comers. All you have to do is following a few steps below:
* <b>Step 1</b>: Install Firebase: ```$ npm install -g firebase-tools```

* <b>Step 2</b>: Login into Firebase: ```firebase login``` then run this command ```firebase init``` to initialize Firebase hosting environment. Now everything will be totally on the console GUI.

* <b>Step 3</b>: Select the Firebase features you want to use. Database and Hosting are selected by default — all you need to do is press ```Enter``` to go to the next step.

* <b>Step 4</b>: Firebase command-line interface will pull up your list of Firebase projects, where you can then choose the corresponding project using the up and down keys.

* <b>Step 5</b>: Keep the default for the Database Rules file name and just press enter.

* <b>Step 6</b>: Pay attention to the question about public directory, which is the directory that will be deployed and served by Firebase. In our case it is “build”, which is the folder where our production build is located. Type “build” and proceed.

* <b>Step 7</b>: Firebase will ask you if you want the app to be configured as a single-page app. By default it is “no” — in our case, we could really benefit from the configuration, so we’ll type “y” and press enter. Later on you’ll be able to use react-router and the URLs will just work.

* <b>Step 8</b>: Firebase will warn us that we already have “build/index.html,” which we don’t want to be overwritten. Type “n” and press enter to keep our own “index.html,” generated by our build process earlier.

* <b>Step 9:</b>: We are now ready to deploy the app! We’ll do that by running ```$ firebase deploy```. After a few seconds you'll see the URL — where your app is hosted — of your app.

Now if you want to update your application and upload everything to your hosted website, run these 2 commands on your console:
* ```$ npm start build```
* ```$ firebase deploy```
<!-- ## Deploy on Azure
<a href="https://blogs.msdn.microsoft.com/appserviceteam/2016/08/18/announcing-mysql-in-app-preview-for-web-apps/#mysqlconnect"> HERE </a> -->

<!-- ## Fetch Recipe API

## Social Login APIs-->

## Credit
Credit to:
* <a href="https://reactjs.org/">React Documentation</a>
* <a href="https://material-ui.com">Material UI</a>
* <a href="https://firebase.google.com/">Firebase hosting service</a>
* <a href="https://medium.com/@bensigo/hosting-your-react-app-with-firebase-hosting-add1fa08c214">Hosting Tutorial</a>
