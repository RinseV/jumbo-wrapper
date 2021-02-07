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
then
```javascript
import { Jumbo } from 'jumbo-wrapper';
```

## Usage
```javascript
// Creates Jumbo object using username and password, set verbose=true if you want to see all requests
const jumbo = new Jumbo(username, password, verbose) ;
// Gets product as response from ID
const product = await jumbo.product().getProductFromId('67649PAK'); 
```

### Functions

#### Products
```javascript
// Returns product with given ID
Jumbo.product().getProductFromId(productId); 
// Returns list of products that match the name
Jumbo.product().getProductsFromName(productName, offset, limit, filters); 
// Returns first product that mathces the name
Jumbo.product().getFirstProductFromName(productName); 
```

#### Stores TODO
```javascript
// Returns store with given ID
Jumbo.store().getStoreFromId(storeId);
// Return store promotions with given ID
Jumbo.store().getStorePromotionsFromId(storeId);
```

#### Orders TODO
To get your orders, you must be logged in, see [Auth](#Auth).
```javascript
// Returns all of your orders
Jumbo.order().getMyOrders();
// Returns your latest order (must be logged in)
Jumbo.order().getLatestOrder();
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