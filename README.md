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

 ### Functions

 ```javascript
Jumbo.product().getProductFromId(productId);
Jumbo.store().getStoreFromId(storeId);
Jumbo.store().getStorePromotionsFromId(storeId);
 ```

 ## Auth
 The token is created via creation of the ```Jumbo``` object:
 ```javascript
const jumbo = new Jumbo(username, password);
const token = jumbo.token;
 ```
Once authenticated, you'll be able to access your orders:
```javascript
const orders = jumbo.orders().getMyOrders();
```