import { Jumbo } from './jumbo';
require('dotenv').config();
const username = process.env.JUMBO_USERNAME;
const password = process.env.JUMBO_PASSWORD;

async function main() {
    const jumbo = new Jumbo(username, password, false);
    const res = await jumbo.product().getFirstProductFromName('melk');
    console.log(res.product.data.title);
}

main();
