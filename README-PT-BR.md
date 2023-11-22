
# Interface de API do eBay

Nesse projeto, o usuário preenche o campo de entrada com o produto que deseja, e vários cards contendo informações dos resultados são listados com o auxílio de uma [API](https://rapidapi.com/ruamazi/api/ebay-search-result) do Ebay

### Tecnologias Utilizadas

* [NodeJS](https://nodejs.org/en)
	- axios
	- dotenv
	- ejs
	- express
	- nodemon
</br>
* [Express](https://expressjs.com/pt-br/)
* [RapidAPI](https://rapidapi.com/hub)

### Como rodar o projeto

1. Crie uma conta no [RapidAPI](rapidapi.com/)
2. Na sua conta, no canto superior direito, selecione a opção personal billing
3. Em my apps, selecione a aba Authorization e copie a sua API key para o arquivo ```.env```:
```dosini
API_KEY = "yourAPI_KEY goes here"
```
4. Com o projeto aberto no seu editor, rode o seguinte comando no terminal:
 ```
npm run start
```
  A seguinte mensagem será exibida no terminal:
  ```
App running on http://localhost:yourPort
```
Para usar a aplicação, basta ir no endereço indicado acima.

A porta usada pode ser modificada no arquivo ```server.js```


## API usada para listar produtos

Para exibir os produtos, uma [API](https://rapidapi.com/ruamazi/api/ebay-search-result) de busca de produtos pelo eBay foi utilizada. Esta, por sua vez, foi feita por este [usuário](https://rapidapi.com/user/ruamazi)

O único parâmetro relevante para esta API é a string de pesquisa

Solicitação:
```javascript
import axios from  "axios";

const options = {
  method: 'GET',
  url: 'https://ebay-search-result.p.rapidapi.com/search/iphone',
  headers: {
    'X-RapidAPI-Key': '464352fabdmsha871afb5af4cc45p1e3d6bjsn86691f3152e0',
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
Resultados:
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

## Problemas enfrentados

### Problema 1:
Como os produtos seguem um padrão de informações, havia a necessidade de exibir essas informações após recebê-las como um objeto Product, definido no arquivo ```src/backEnd/dataHandler.js```.
* Como solucionar: usando ejs, foi possível não só exibir as informações de cada produto, como verificar a existência de um atributo:
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

### Problema 2:
Descrição do problema
* Como solucionar: explicar a solução.

## Próximos passos

Descreva se você pretende, pensou ou gostaria de elaborar uma nova feature para o seu projeto definindo os próximos passos.
