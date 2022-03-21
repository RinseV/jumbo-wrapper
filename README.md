<div align="center">
  <h1>
    Jumbo API Wrapper
  </h1>
  </br>
  <p>
    <a href="https://www.npmjs.com/package/jumbo-wrapper"><img src="https://img.shields.io/npm/v/jumbo-wrapper" alt="NPM version" /></a>
    <a href="https://github.com/RinseV/jumbo-wrapper"><img src="https://img.shields.io/npm/l/jumbo-wrapper" alt="NPM license" /></a>
    <a href="https://www.npmjs.com/package/jumbo-wrapper"><img src="https://img.shields.io/librariesio/release/npm/jumbo-wrapper" alt="NPM dependencies"/></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/jumbo-wrapper/"><img src="https://nodei.co/npm/jumbo-wrapper.svg" alt="npm installnfo" /></a>
  </p>
</div>

Unofficial Node.js API wrapper for [Jumbo Supermarkten](https://www.jumbo.com/).

## Installation

```sh
npm install jumbo-wrapper
```

or

```sh
yarn add jumbo-wrapper
```

then

```javascript
import { Jumbo } from 'jumbo-wrapper';
```

## Basic usage

```javascript
// Creates Jumbo object using username and password, set verbose=true if you want to see all requests
const jumbo = new Jumbo({ username, password, verbose: true });
// Gets product as response from ID
const product = await jumbo.product().getProductFromId('67649PAK');
```

More information about the functions and parameters can be found on the [wiki](https://github.com/RinseV/jumbo-wrapper/wiki).
## Example usage

For all of these examples, please keep in mind that your function in which you request something should be `async` since the requests return a `Promise`.

#### Product

If I want to find the first 5 product names that match a given query:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findFirstFiveProducts(productName: string) {
    const jumbo = new Jumbo();
    const products = await jumbo.product().getProductsFromName(productName, {
        limit: 5
    });
    console.log(
        products.map((product) => {
            return product.product.data.title;
        })
    );
}

findFirstFiveProducts('melk');
```
```sh
[
  'Jumbo Verse Halfvolle Melk 2L',
  'Jumbo Verse Halfvolle Melk 1L',
  'Jumbo Verse Halfvolle Melk 1, 5L',
  'Jumbo Karnemelk & Halfvolle Melk',
  'Jumbo Houdbare Halfvolle Melk Voordeelverpakking 6 x 1L'
]
```

You can also add diet and allergen filters:
```javascript
import { Jumbo, ProductDietFilter, ProductAllergenFilter } from 'jumbo-wrapper';

async function findLactoseFreeMilk() {
    const jumbo = new Jumbo();
    const products = await jumbo.product().getProductsFromName('melk', {
        limit: 5,
        filters: {
            diet: [ProductDietFilter.LactoseIntolerant],
            allergens: [ProductAllergenFilter.Lactose]
        }
    });
    console.log(
        products.map((product) => {
            return product.product.data.title;
        })
    );
}
findLactoseFreeMilk();
```
```sh
[
  'Alpro This is Not M*lk Drink Halfvol Gekoeld 1L',
  'Alpro This is Not M*lk Drink Vol Gekoeld 1L',
  'HiPRO Proteïne Drink Houdbaar Vanille 330ml',
  'Alpro Sojadrink Houdbaar 1L',
  'Alpro Barista Haver Houdbaar 1L'
]
```
Keep in mind that Jumbo makes a (good) distinction between the dietary restrictions (lactose intolerant) and allergen restrictions (lactose free). The allergens supplied via the filter are the ones that are **not** allowed in the product.



#### Store

If I want to find the name of the store that is closest to a given location:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findJumboStore(longitude: number, latitude: number) {
    const jumbo = new Jumbo();
    const res = await jumbo.store().getStoresFromLongLat({
        long: longitude,
        lat: latitude,
        limit: 1
    });
    console.log(res[0].store.data.name);
}

findJumboStore(4.4993409, 51.9106489);
```

```sh
Jumbo Rotterdam Vijf Werelddelen
```

#### List

If I want to find the names of the first three lists with the "Winter" list category:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function getFirstThreeListsFromCategory(category: string) {
    const jumbo = new Jumbo();
    const lists = await jumbo.list().getListsByName(category, {
        limit: 3
    });
    const names = lists.items.map((list) => {
        return list.title;
    });
    console.log(names);
}

getFirstThreeListsFromCategory('Winter');
```

```sh
[ 'Budget koken', 'Koken met groente', 'Soepen' ]
```

Keep in mind that while you don't need to be logged in to view public lists, if you want to view your own list you must login first.

#### Order

<b>NOTE:</b> Authentication is currently not working, for more info see [this issue](https://github.com/RinseV/jumbo-wrapper/issues/1).

If I want to see the ID of the latest order of my Jumbo account:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function getLatestOrder(username: string, password: string) {
    const jumbo = new Jumbo(username, password);
    const res = await jumbo.order().getMyLatestOrder();
    console.log(res.order.data.id);
}

getLatestOrder('example@mail.com', 'password');
```

Keep in mind that you need to be logged in to get your orders, for instructions see [Authentication](https://github.com/RinseV/jumbo-wrapper/wiki/Authentication).
