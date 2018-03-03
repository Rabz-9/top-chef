# TOP CHEF

> Eat well and cheaper than usually

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Requirement](#requirement)
- [Structure of the project](#structure-of-the-project)
- [Launch the project](#lauch-the-project)
- [Quick over view of the Client-Side](#quick-overview-of-the-client-side)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirement

First of all, to launch the project we need a device with 'NodeJs' installed. You can install it [here](https://nodejs.org/en/)

## Structure of the project

Our web application is split in two part :

* Server-side with Node.js

 This part is used to scrape Michelin & LaFourchette website and store data into a JSON file with all the information we need.

 The module [michelin](https://github.com/Rabz-9/top-chef/tree/master/modules/michelin) is used to scrape all the French starred restaurants, then we store the result into a JSON file.

 The module [lafourchette](https://github.com/Rabz-9/top-chef/tree/master/modules/lafourchette) is used to when we have all the French starred restaurants, we're going to get the deals(if there are deals) and store it into a JSON file.

 * Client-side with React

 This part is the Front-End, in this part we're going to list all the French starred restaurants and their current deals.


 ## Launch the project

All the information are stored into JSON file, so you need just to launch the Client-side with React with the following command:  

1. Move to the directory of the React Application
```js

cd docs/top-chef-app/src

```

2. Then launch the Client-Side:
```js

npm start

```

## Quick overview of the Client-Side

* Home Page :

![Alt tag](https://github.com/Rabz-9/top-chef/tree/master/img/screen1.png "Screen1")

* Restaurant Cards :

![Alt tag](https://github.com/Rabz-9/top-chef/tree/master/img/screen2.png "Screen2")

![Alt tag](https://github.com/Rabz-9/top-chef/tree/master/img/screen3.png "Screen3")

* Result when we click on **"Book now" ** :

![Alt text](https://github.com/Rabz-9/top-chef/tree/master/img/screen4.png "Screen4")
