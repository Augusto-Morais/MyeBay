# eBay API Interface

In this project, the user fills in the input field with the product they want, and several cards containing information about the results are listed with the help of an [API](https://rapidapi.com/ruamazi/api/ebay-search- result) from Ebay

![image](https://github.com/S41K10/MyeBay/assets/89564462/0fbdabe7-dbbb-49c1-b819-b672beb1ea71)


### Technologies Used

* [NodeJS](https://nodejs.org/en)
  - axios
  - dotenv
  - ejs
  - express
  - nodemon

* [Express](https://expressjs.com/pt-br/)
* [RapidAPI](https://rapidapi.com/hub)

### How to run the project

1. Create an account on [RapidAPI](rapidapi.com/)
2. In your account, in the top right corner, select the personal billing option
3. In my apps, select the Authorization tab and copy your API key to the ```.env``` file:
```dosini
API_KEY = "your API_KEY goes here"
```
4. With the project open in your editor, run the following command in the terminal:
  ```
npm run start
```
   The following message will be displayed on the terminal:
   ```
App running on http://localhost:yourPort
```
To use the application, simply go to the address indicated above.

The port used can be modified in the ```server.js``` file


## API used to list products

To display the products, an eBay product search [API](https://rapidapi.com/ruamazi/api/ebay-search-result) was used. This, in turn, was made by this [user](https://rapidapi.com/user/ruamazi)

The only relevant parameter for this API is the search string

Request:
```javascript
import axios from "axios";

const options = {
   method: 'GET',
   url: 'https://ebay-search-result.p.rapidapi.com/search/iphone',
   headers: {
     'X-RapidAPI-Key': 'yourAPI_KEY',
     'X-RapidAPI-Host': 'ebay-search-result.p.rapidapi.com'
   }
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
console.error(error);
}
```
Results:
```json
{ "results": [ 
	{ 
		 "title": "Apple iPhone 8 64GB Factory Unlocked Verizon AT&T T-Mobile Sprint Good", 
		 "price": "$144.40",
		 "shipping": "", 
		 "location": "", 
		 "rating": "4.5 out of 5 stars.",
		 "image": "https://i.ebayimg.com/thumbs/images/g/-6sAAOSw5ThiK~Z2/s-l300.jpg",
	     "url": "https://www.ebay.com/itm/274505797468epid=22015564103&hash=item3fe9d20f5c:g:-6sAAOSw5ThiK~Z2&amdata=enc%3AAQAIAAAAsHEQyGVfIalTIraqoBOA%2FA%2B%2FyjqaenKqM3FV4f1KyyDhpOVKGyK5oJYrayTnLszoNiaJA7hgKR0mDznXSIOSB16gmqaCc%2BHOfUP9My5vEnpMV%2BHNZzuQXwyftsH5FofowIydq5ZTz4ZoS43FKOfZUC5MbmyKnNhQdXDOrGsnV3VjIJYVQcqyd20b1fVmR580AWiCjeBuCLZba1WuAFWO%2FLVcZjN1DyPLkkG2C1NY2JGy%7Ctkp%3ABlBMUILlweT-Yg", 
	     "id": "5c54de87-4bbf-48bc-9f24-50b2211eb14b" }, 
	{ 
		"title": "Apple iPhone XR - 64GB - All Colors - Factory Unlocked - Good Condition", 						
		"price": "$209.99", "shipping": "", 
		"location": "", 
		"rating": "5.0 out of 5 stars.", 
		"image": "https://i.ebayimg.com/thumbs/images/g/H2YAAOSw8KthE6N8/s-l300.jpg", 
		"url": 
		"https://www.ebay.com/itm/174911368932?epid=13023706562&hash=item28b987aee4:g:H2YAAOSw8KthE6N8&amdata=enc%3AAQAIAAAAwC%2BPxGL4vtuLVwgf11E1ujPsBxbTv0aK4jZDQl6sbroVBPTKos6yXeLh16uB%2BTHXwmdUuGgID42n11%2BIxqDCQ280t5ZkBI%2FlpaA0cyspHTVDdSQJxbtei8uYXbX3quZpbmKVT0QvRPcCNzf%2Fq1la6nnB5IJ%2BbjegItPk%2BMdQy%2BV0LJsh%2F5kNyqYxIEoWsG0cP8V95Zdnb8BNau30rBAdQBX6uHSmFzjcBHTyDHKyeITIpBxpMHl6d7X5zedRfMe1wg%3D%3D%7Ctkp%3ABlBMUILlweT-Yg", 
		"id": "e93e3136-7737-42dc-8d49-d5a895ea5274" 
	}, 
		more results...
```

## Problems faced

### Problem 1:
Products received by the API needed to be added to a list and standardized.
* How to solve: in the file ```src/backEnd/dataHandler.js``` a Product class was created to standardize the products:
```javascript
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
```
The above class is used to create an instance for each product in the HTTP request response:
```javascript
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
}
```

### Problem 2:
As products follow a pattern of information, there was a need to display it after receiving it as a Product object, as shown in problem 1.
* How to solve: in the file ```src/main.js```, the function ```getResults()``` is used to obtain the products based on the URL query, in addition to sending the list to the front -end:
```javascript
router.get("/search", async function (req, res) {
   const mySearch = req.query.mySearch;
   const results = await getResults(mySearch);
   res.render(path.join(__dirname, "../views/pages/results.ejs"), {
     data: results,
   });
});
```
Finally, using ejs, it was possible to not only display the information for each product, but also check the existence of an attribute:
```javascript
<% data.forEach(element=> { %>

<span  class="product">
	<a  href="<%= element.url %>">
		<img  src="<%= element.image %>"  alt="product image goes here" />
	</a>
	
	<div  class="product-info">
		<p  id="title"><%= element.title %></p>
		<p  id="price"><%= element.price %></p>
		<p  id="shipping"><%= element.shipping %></p>
		<% if(element.rating) { %>
			<p  id="rating"><%= element.rating %></p>
		<% } %>
	</div>
</span>

<% }) %>
```
