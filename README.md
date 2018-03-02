# TOP CHEF

> Eat well and cheaper than usually

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Requirement](#requirement)
- [Structure of the project](#structure-of-the-project)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirement

First of all, to launch the project we need a device with 'NodeJs' installed. You can install it [here](https://nodejs.org/en/)

## Structure of the project

Our web application is split in two part :

* Server-side with Node.js

 This part is used to scrape Michelin & LaFourchette website and store data into a JSON file with all the information we need.

 The module [michelin](https://github.com/Rabz-9/top-chef/tree/master/modules/michelin) is used to scrape all the French starred restaurants, then we store the result into a JSON file.

 
```js
const michelin = require('michelin');

console.log(michelin.get());
```
