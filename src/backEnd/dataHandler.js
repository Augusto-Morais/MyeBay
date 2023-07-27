import axios from "axios";
import jsdom from "jsdom";
import format from "./QueryFormatter.js";

class Product {
  constructor(img, name, store, price, link) {
    this.img = img;
    this.name = name;
    this.store = store
    this.price = price;
    this.link = link;
  }
}

async function getResults(searchString) {
  let mySearch = format(searchString);

  let values = await axios
  .request({
    timeout: 60000,
    signal: AbortSignal.timeout(60000),
    method: "GET",
    url: `https://www.buscape.com.br/search?q=${mySearch}&hitsPerPage=48`
  })
    .then(function (response) {
      const dom = new jsdom.JSDOM(response.data);
      let results = dom.window.document.querySelectorAll(
        ".Paper_Paper__HIHv0.Paper_Paper__bordered__iuU_5.Card_Card__LsorJ.Card_Card__clicable__5y__P.SearchCard_ProductCard__1D3ve"
      );
      let cont = 0;

      let list = [];

      results.forEach(function (element) {
        let productName = element
          .getElementsByTagName("h2")
          .item(0).textContent;
        let store = element
          .getElementsByClassName(
            "Text_Text__h_AF6 Text_MobileLabelXs__ER_cD Text_MobileLabelSAtLarge__YdYbv SearchCard_ProductCard_BestMerchant__f4t5p"
          )
          .item(0).textContent;
        let price = element
          .getElementsByClassName("Text_Text__h_AF6 Text_MobileHeadingS__Zxam2")
          .item(0).textContent;

        let imgCard = element
          .getElementsByClassName("SearchCard_ProductCard_Image__ffKkn")
          .item(0);
        let imgSrc = imgCard.getElementsByTagName("img").item(0).src;

        if(!imgSrc.startsWith("https://i.zst.com.br/")){
          imgSrc = imgCard.getElementsByTagName("img").item(1).src
        }

        let link = element
          .getElementsByClassName("SearchCard_ProductCard_Inner__7JhKb")
          .item(0)
          .getAttribute("href");

        if (link.startsWith("/")) {
          const temp = link;
          link = "https://www.buscape.com.br" + temp;
        }

        list.push(new Product(imgSrc,productName, store, price, link));

        cont++;
      });


      return list;
    })
    .catch((error) => {
      return error;
    });

  return values;
}


export default getResults;
