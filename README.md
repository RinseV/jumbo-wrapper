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
const jumbo = new Jumbo({username}, {password}, {verbose}) // Creates Jumbo object using username and password, set verbose=true if you want to see all requests
const product = await jumbo.product().getProductFromId('67649PAK'); // Gets product as response from ID
```

### Functions

#### Products
```javascript
Jumbo.product().getProductFromId(productId); // Returns product with given ID
Jumbo.product().getProductsFromName(productName, offset, limit, filters); // Returns list of products that match the name
Jumbo.product().getFirstProductFromName(productName); // Returns first product that mathces the name
```

#### Stores TODO
```javascript
Jumbo.store().getStoreFromId(storeId);
Jumbo.store().getStorePromotionsFromId(storeId);
```

#### Orders TODO
```javascript
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