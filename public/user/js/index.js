console.log("hellow ");
let itemclick;
let bagItems;
onLoad();
function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}
console.log(bagItems);
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  displayBagIcon();
}
function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag_item_count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

// onclick="window.location.href='../html/productinfo.html'; "

function clk(productId) {
  const clickedProduct = items.find((item) => item.id === productId);

  if (clickedProduct) {
    window.location.href = `./productinfo?id=${clickedProduct.id}`;
  }
}

function displayItemsOnHomePage() {
  let itemContainer = document.querySelector(".outer_container");
  let innerHtml = "";
  items.forEach((item) => {
    if (!itemContainer) {
      return;
    }

    innerHtml += `<div class="product_container" onclick="clk(${item.id})" >


  <div class="product_image">
      <img src="${item.image}" alt="product">
  </div>
  <div class="product_name">
      ${item.pname};
  </div>
  <div class="product_subname">
      ${item.subName}
  </div>
  <div class="product_rate">
      ${item.rate.star} ⭐(${item.rate.count})
  </div>  
  <div class="product_discount">
      <span class="p_price">${item.price} </span>
      <span class="p_opreice">${item.oprice}</span>
      <span class="P_disc">Min ${item.discount}% off</span>
      
</div>
</div>`;
  });
  itemContainer.innerHTML = innerHtml;
}
