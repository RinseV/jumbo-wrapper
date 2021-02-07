import { Jumbo, requestMethod } from './jumbo';
require('dotenv').config();
const fetch = require('node-fetch');
const username = process.env.JUMBO_USERNAME;
const password = process.env.JUMBO_PASSWORD;

async function main() {
    const jumbo = new Jumbo(username, password, true);
    // Doesn't work
    const res = await jumbo.request('products/52950PAK', requestMethod.GET);
    console.log(res);

    // Works fine
    // const res2 = await fetch(
    //     'https://random-data-api.com/api/users/random_user'
    // );

    // console.log(res2);
}

main().catch((err) => console.log(err));
