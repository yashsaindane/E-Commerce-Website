const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
console.log(productId, "ss", urlParams, queryString);
let itemsArray = [];
const selectedProduct = items.find((item) => item.id === parseInt(productId));
itemsArray.push(selectedProduct);
console.log(itemsArray);

onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagIcon();
  submitForm();
}
console.log(bagItems);
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
  Details();
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
  console.log("bag item objects", bagItemObjects);
}

if (itemsArray == 0) {
  bagItemObjects = bagItemObjects;
} else {
  bagItemObjects = itemsArray;
}

let totalPrice = 0;
let sprice = 0;
let totalDiscount = 0;
let dilivaryCharge;
let paking = 49;
let totalDiscountprice;
let yousave = 0;

bagItemObjects.forEach((item) => {
  totalPrice += item.oprice;
  sprice += item.price;
  totalDiscount = item.oprice - item.price;
});

if (totalPrice < 500) {
  dilivaryCharge = 40;
} else {
  dilivaryCharge = 0;
}
totalDiscountprice = dilivaryCharge + sprice + paking;
yousave = totalDiscount + dilivaryCharge;

$(".price_cantaint").css("width", "20rem");
$(".price_cantaint").html(`<table class="table_style">
    <tr>
        <th colspan="2" class="table_head">PRICE DETAILS</th>
    </tr>
    <tr>
        <td class="price_dt_name" id="itemsno">Price (${bagItemObjects.length} items)</td>
        <td class="price_data"id="totalprice">${totalPrice}</td>
    </tr>
    <tr>
        <td class="price_dt_name">Discount</td>
        <td class="price_data green" id="totalDiscount">− ₹${totalDiscount}</td>
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
        <td id="f_price" id="totalprice" id="totalDiscountprice">₹${totalDiscountprice}</td>
    </tr>
    <tr class="green table_last">
        <td colspan="2">You will save ₹${yousave} on this order</td>
    </tr>
    
    
    </table>`);

// product

let itemsnames = [];
let itemsids = [];

bagItemObjects.forEach((item) => {
  itemsnames.push(item.pname);
  itemsids.push(item.id);
});

console.log(itemsids, itemsnames);

let itemsno = bagItemObjects.length;
let totalprice = totalPrice;
let totaldiscount = totalDiscount;
let totaldiscountprice = totalDiscountprice;

function submitForm() {
  // Get form values of user
  var username = document.getElementById("username").value;
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var state = document.getElementById("state").value;
  var district = document.getElementById("district").value;
  var zip = document.getElementById("zip").value;
  var ccname = document.getElementById("cc-name").value;
  var ccnumber = document.getElementById("cc-number").value;
  var cccvv = document.getElementById("cc-cvv").value;
  var ccexpiration = document.getElementById("cc-expiration").value;

  // Check if form fields are not empty
  if (
    username.trim() !== "" &&
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    address.trim() !== "" &&
    state.trim() !== "" &&
    district.trim() !== "" &&
    zip.trim() !== "" &&
    ccname.trim() !== "" &&
    ccnumber.trim() !== "" &&
    cccvv.trim() !== "" &&
    ccexpiration.trim() !== ""
  ) {
    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullName,
        email,
        address,
        state,
        district,
        zip,
        ccname,
        cccvv,
        ccexpiration,
        action: "submit",
        itemsno,
        totalprice,
        totaldiscountprice,
        totaldiscount,
        itemsids,
        itemsnames,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const messageElement = document.getElementById("lmessage");
        if (data.success) {
          messageElement.style.color = "green";

          if (data.redirect) {
            // Redirect to the specified URL
            window.location.href = data.redirect;
          } else {
            // Handle success without redirection
          }
        } else {
          messageElement.style.color = "red";
        }
        messageElement.textContent = data.message;
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // Handle case where form fields are not filled
    alert("Please fill in all required fields.");
  }
}
