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

Node.js API wrapper for [Jumbo](https://www.jumbo.com/).

This package is still a work in progress.

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

## Usage

```javascript
// Creates Jumbo object using username and password, set verbose=true if you want to see all requests
const jumbo = new Jumbo(username, password, verbose, config);
// Gets product as response from ID
const product = await jumbo.product().getProductFromId('67649PAK');
```

### Functions

You **don't** need to be logged in to use the following functions:

#### Products

```javascript
// Returns product with given ID
Jumbo.product().getProductFromId(productId);
// Returns list of products that match the name sorted by sort
Jumbo.product().getProductsFromName(productName, offset, limit, filters, sort);
// Returns first product that matches the name sorted by sort
Jumbo.product().getFirstProductFromName(productName, sort);
```

#### Promotions

```javascript
// Returns promotion of given store (via store ID)
Jumbo.promotion().getPromotionsFromStore(storeId);
```

#### Recipes

```javascript
// Returns recipe of given recipe ID
Jumbo.recipe().getRecipeFromId(recipeId);
// Returns recipes for given recipe name
Jumbo.recipe().getRecipesFromName(recipeName, offset, count);
// Returns the first recipe that matches the name
Jumbo.recipe().getFirstRecipeFromName(recipeName);
// Returns the recipes that match the filter (ID)
Jumbo.recipe().getRecipesFromFilterId(filterId, offset, count);
```

#### Stores

```javascript
// Returns store with given ID
Jumbo.store().getStoreFromId(storeId);
// Returns stores sorted by distance that are closest to given location
Jumbo.store().getStoresFromLongLat(long, lat);
// Returns closest store given location
Jumbo.store().getNearestStoreFromLongLat(long, lat);
```

#### Categories

```javascript
// Returns category information for given category ID
Jumbo.category().getCategoryFromId(categoryId);
```

#### Lists

```javascript
// Returns a list for given list ID
Jumbo.list().getListFromId(listId);
// Returns lists for given list name (the name is case sensitive and very specific)
Jumbo.list().getListsByName(listName, offset, limit);
// Returns the most popular (most followed) lists
Jumbo.list().getPopularLists();
// Returns the items of a given list
Jumbo.list().getItemsFromList(listId);
```

You **do** need to be logged in to use the following functions, for instructions how to login, see [Auth](#Auth).

#### Orders

```javascript
// Returns order from ID (if order is yours)
Jumbo.order().getMyOrderById(orderId);
// Returns all of your orders
Jumbo.order().getMyOrders();
// Returns your latest order (must be logged in)
Jumbo.order().getLatestOrder();
// Returns your order matching the given status
Jumbo.order().getMyOrdersByStatus(status);
// Returns your latest order (date descending) that matches the given status
Jumbo.order().getMyLatestOrderByStatus(status);
// Returns the user's relevant orders (which includes shipping times)
Jumbo.order().getMyRelevantOrders();
```

There are some order-specific things to keep in mind. To sort by order status, you can use the `OrderStatus` enum that has 3 options: `Processing`, `Open` and `Completed`. A `Processing` status will go out for delivery shortly and an `Open` status will not go out for delivery yet. When the order is actually out for delivery, the status will change to `ReadyToDeliver`.

It is also important to note that the delivery times (`order.order.data.delivery`) and order cut-off time (`order.order.data.orderCutOffDate`) are automatically converted to `Date` objects which makes working with them a little easier. The delivery time (`order.order.data.delivery.time`) however, is not converted to a date object since this can be either a time interval (i.e. `10:00 - 12:00`) or a set time (i.e. `10:42`). When retrieving relevant orders, the shipping times are also automatically converted to `Date` objects (if defined).

#### Users

```javascript
// Returns info of currently logged in user
Jumbo.user().getMyInfo();
```

#### Lists

```javascript
// Returns all of your lists
Jumbo.list().getMyLists();
// Returns all of your 'smart' lists
Jumbo.list().getMySmartLists();
// Returns all of your followed lists
Jumbo.list().getMyFollowedLists();
// Checks whether you are following a given list (ID)
Jumbo.list().isFollowingList(listId);
// Follows the given list (ID)
Jumbo.list().followList(listId);
// Unfollows the given list (ID)
Jumbo.list().unfollowList(listId);
```

### Example usage

For all of these examples, please keep in mind that your function in which you request something should be `async` since the requests return a `Promise`.

#### Product

If I want to find the first 5 product names that match a given query:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findFirstFiveProducts(productName: string) {
    const jumbo = new Jumbo();
    const products = await jumbo.product().getProductsFromName('melk', 0, 5);
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
  'Jumbo Houdbare Halfvolle Melk Voordeelverpakking 6 x 1',
  'Jumbo Verse Volle Melk 1L'
]
```

#### Store

If I want to find the name of the store that is closest to a given location:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function findJumboStore(longitude: number, latitude: number) {
    const jumbo = new Jumbo();
    const res = await jumbo
        .store()
        .getNearestStoreFromLongLat(longitude, latitude);
    console.log(res.store.data.name);
}

findJumboStore(4.4993409, 51.9106489);
```

```sh
Jumbo Rotterdam Vijf Werelddelen
```

#### Order

If I want to see the ID of the latest order of my Jumbo account:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function getLatestOrder(username: string, password: string) {
    const jumbo = new Jumbo(username, password);
    const res = await jumbo.order().getMyLatestOrder();
    console.log(res.order.data.id);
}

findJumboStore({ username }, { password });
```

Keep in mind that you need to be logged in to get your orders, for instructions see [Auth](#Auth).

#### List

If I want to find the names of the first three lists with the "Winter" list category:

```javascript
import { Jumbo } from 'jumbo-wrapper';

async function getFirstThreeListsFromCategory(category: string) {
    const jumbo = new Jumbo();
    const lists = await jumbo.list().getListsByName(category, 0, 3);
    const names = lists.items.map((list) => {
        return list.title;
    });
    console.log(names);
}

getFirstThreeListsFromCategory('Winter');
```

```sh
[ 'Budget koken', 'Soepen', 'Koken met groente' ]
```

Keep in mind that while you don't need to be logged in to view public lists, if you want to view your own list you must login first.

### Advanced usage

Every request can also be provided with additional headers and queries. If you want to add your own headers or queries to any request, simply do the following:

```javascript
import { Headers, Query } from '../jumbo';

const myHeaders: Headers = {
    Connection: 'keep-alive',
};

const myQueries: Query = {
    distance: '15000',
};

const store = await jumbo
    .store()
    .getStoresFromLongLat(
        long,
        lat,
        undefined,
        undefined,
        myHeaders,
        myQueries
    );
```

Keep in mind that you must use the `Headers` and `Query` interfaces defined in `../jumbo`.

It is also possible to provide a custom Axios config in case you want to use a proxy in between the API requests, this is needed if you are sending requests from an IP that is not Dutch (Jumbo will block foreign requests). To provide a custom config, simply make your own `AxiosRequestConfig` object and supply it via the Jumbo constructor:

```javascript
const axiosConfig: AxiosRequestConfig = {
    httpsAgent: new https.Agent({
        maxVersion: 'TLSv1.2',
    }),
};

const jumbo = new Jumbo(undefined, undefined, false, axiosConfig);
```

## Auth

The token is created via creation of the `Jumbo` object:

```javascript
const jumbo = new Jumbo(username, password);
```

Since you need a username and password, I'd recommend providing them via a `.env` file. A `.env.example` file is provided, once your username and password are filled in, you can create a `Jumbo` object as follows:

```javascript
require('dotenv').config({ path: '.env.local' });
const username = process.env.JUMBO_USERNAME;
const password = process.env.JUMBO_PASSWORD;

const jumbo = new Jumbo(username, password);
```

Keep in mind that you do need the [dotenv](https://www.npmjs.com/package/dotenv) package to load `.env` files.

Once authenticated, you'll be able to access your orders as well as see your user information and your lists:

```javascript
const orders = await jumbo.orders().getMyOrders();
const users = await jumbo.users().getMyInfo();
const lists = await jumbo.list().getMyLists();
```
