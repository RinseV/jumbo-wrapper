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
You don't need to be logged in to find products.
```javascript
// Returns product with given ID
Jumbo.product().getProductFromId(productId); 
// Returns list of products that match the name
Jumbo.product().getProductsFromName(productName, offset, limit, filters); 
// Returns first product that mathces the name
Jumbo.product().getFirstProductFromName(productName); 
```

#### Stores TODO
You don't need to be logged in to find stores.
```javascript
// Returns store with given ID
Jumbo.store().getStoreFromId(storeId);
// Returns stores sorted by distance that are closest to given location
Jumbo.store().getStoresFromLongLat(long, lat);
// Returns closest store given location
Jumbo.store().getNearestStoreFromLongLat(long, lat);
```

#### Orders TODO
To get your orders, you must be logged in, see [Auth](#Auth).
```javascript
// Returns all of your orders
Jumbo.order().getMyOrders();
// Returns your latest order (must be logged in)
Jumbo.order().getLatestOrder();
```

### Example usage
For all of these examples, please keep in mind that your function in which you request something should be ``async`` since the requests return a ``Promise``.
#### Product
If I want to find the first 5 product names that match a given query:
```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findFirstFiveProducts(productName: string): string[] {
    const jumbo = new Jumbo();
    const products = await jumbo.product().getProductsFromName('melk', 0, 5);
    console.log(
        products.map((product) => {
            return product.product.data.title;
        })
    );
}

findFirstFiveProducts("melk");
```
```node
[
  'Jumbo Verse Halfvolle Melk 2L',
  'Jumbo Verse Halfvolle Melk 1L',
  'Jumbo Verse Halfvolle Melk 1, 5L',
  'Jumbo Houdbare Halfvolle Melk Voordeelverpakking 6 x 1',
  'Jumbo Verse Volle Melk 1L'
]
```

#### Store
If I want to find the name of the store that is closest to a given location:
```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findJumboStore(longitude: number, latitude: number): string {
    const jumbo = new Jumbo();
    const res = await jumbo.store().getNearestStoreFromLongLat(longitude, latitude);
    console.log(res.store.data.name);
}

findJumboStore(4.4993409, 51.9106489);
```
```node
Jumbo Rotterdam Vijf Werelddelen
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