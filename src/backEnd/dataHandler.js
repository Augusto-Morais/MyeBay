import axios from "axios";
import format from "./QueryFormatter.js";
import "dotenv/config";

const API_KEY = process.env.API_KEY;

class Product {
  constructor(title, price, shipping, rating, image, url) {
    this.title = title;
    this.price = price;
    this.shipping = shipping;
    this.rating = rating;
    this.image = image;
    this.url = url;
  }
}

async function getResults(searchString) {
  const mySearch = format(searchString);

  const options = {
    method: "GET",
    url: `https://ebay-search-result.p.rapidapi.com/search/${mySearch}`,
    headers: {
      "X-RapidAPI-Key": `${API_KEY}`,
      "X-RapidAPI-Host": "ebay-search-result.p.rapidapi.com",
    },
  };

  const products = [];

  try {
    const response = await axios.request(options);

    for (const product of response.data.results) {
      products.push(
        new Product(
          product.title,
          product.price,
          product.shipping,
          product.rating,
          product.image,
          product.url
        )
      );
    }

  } catch (error) {
    console.error(error);
  }

  return products;
}

export default getResults;
