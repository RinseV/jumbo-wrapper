# Jumbo API Wrapper
 Node.js API wrapper for [Jumbo](https://www.jumbo.com/).

 ## Installation
 ```npm
 npm install jumbo-wrapper
 ``` 
 or 
 ```npm
 yarn add jumbo-wrapper
 ```

 ```javascript
 import { Jumbo } from 'jumbo-wrapper';
 ```

 ## Usage
 ```javascript
const product = await Jumbo.product().getProductFromId('WIP'); // Gets product as response from ID
 ```
