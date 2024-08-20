onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  tprice();
}
console.log(bagItems);
console.log(bagItemObjects);


function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag_item_count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function loadBagItemObjects() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];

  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function removeFromBag(itemId) {
  //romve single item
  const indexToRemove = bagItems.indexOf(itemId);

  if (indexToRemove !== -1) {
    bagItems.splice(indexToRemove, 1);
  }

  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  alert("want to remove item");
  loadBagItemObjects();
  displayBagItems();
  onLoad();
}

function displayBagItems() {
  let cart = document.querySelector(".cart_contanit");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  cart.innerHTML = innerHTML;
}

function generateItemHTML(item) {
  return `

    <div class="items_cantaint">
        <div class="item">
            <div class="p_img">
                <img src="${item.image}" alt="item">
            </div>
            <div class="p_data">
                <div class="p_name">${item.pname}</div>
                <div class="subname">${item.subName}</div>
                <div class="price"><span class="oprice">${item.oprice}</span>
                <span class="dprice">${item.price}</span>
                <span class="discount">${item.discount}%off</span></div>              
            </div>
        </div>
        <div class="qantity">
            <div class="quntiy_sar">
                
                <div class="btns"><button type="button" onclick="window.location.href='#';"> save for later</button></div>
                <div class="btns"><button type="button" onclick="removeFromBag(${item.id}) "> remove</button></div>
            </div>
        </div>
    
    </div>
`;
}

// functional

function tprice() {
  let totalPrice = 0;
  let sprice = 0;
  let totalDiscount = 0;
  let dilivaryCharge;
  let paking = 49;
  let totalDiscountprice;
  let yousave = 0;

  bagItemObjects.forEach((item) => {
    totalPrice += item.oprice;
    sprice += item.oprice;
    totalDiscount = item.oprice - item.price;
  });

  if (totalPrice < 500) {
    dilivaryCharge = 40;
  } else {
    dilivaryCharge = 0;
  }

  if (bagItemObjects.length == 0) {
    totalPrice = 0;
    totalDiscount = 0;
    dilivaryCharge = 0;
    paking = 0;
    totalDiscountprice = 0;
    yousave = 0;

    alert("cart is empty");
    const btn = document.querySelector(".order_containt");
    btn.style.display = "none";
  }
  totalDiscountprice = dilivaryCharge + sprice + paking;
  yousave = totalDiscount + dilivaryCharge;

  let priceContainer = document.querySelector(".price_cantaint");
  priceContainer.innerHTML = `
    <table class="table_style">
    <tr>
        <th colspan="2" class="table_head">PRICE DETAILS</th>
    </tr>
    <tr>
        <td class="price_dt_name">Price (${bagItemObjects.length} items)</td>
        <td class="price_data">${totalPrice}</td>
    </tr>
    <tr>
        <td class="price_dt_name">Discount</td>
        <td class="price_data green">− ₹${totalDiscount}</td>
    </tr>
    <tr>
    
        <td class="price_dt_name">Delivery Charges</td>
        <td class="price_data"><span class="stric">₹${dilivaryCharge}</span><span class="green"> Free</span>
        </td>
    </tr>
    <tr>
    
        <td class="price_dt_name">Secured Packaging Fee</td>
        <td class="price_data">₹${paking}</td>
    </tr>
    <tr>
        <td id="f_price">Total Amount
        </td>
        <td id="f_price">₹${totalDiscountprice}</td>
    </tr>
    <tr class="green table_last">
        <td colspan="2">You will save ₹${yousave} on this order</td>
    </tr>
    
    
    </table>`;
}
