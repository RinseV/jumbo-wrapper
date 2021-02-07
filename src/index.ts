import { Jumbo } from './jumbo';
require('dotenv').config();
const username = process.env.JUMBO_USERNAME;
const password = process.env.JUMBO_PASSWORD;

async function main() {
    const jumbo = new Jumbo(username, password, false);
    const products = await jumbo.product().getProductsFromName('melk', 0, 5);
    console.log(
        products.map((product) => {
            return product.product.data.title;
        })
    );
}

main();
