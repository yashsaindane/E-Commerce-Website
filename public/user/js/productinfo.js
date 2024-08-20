const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
let itemsArray = [];
const selectedProduct = items.find((item) => item.id === parseInt(productId));
itemsArray.push(selectedProduct);
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

function buynow(productId) {
  const clickedProduct = itemsArray.find((item) => item.id === productId);

  if (clickedProduct) {
    window.location.href = `/checkout?id=${clickedProduct.id}`;
  }
}
//main page display

function displayItemsOnHomePage() {
  let containerMain = document.querySelector(".main");
  let innerHTML = "";
  itemsArray.forEach((item) => {
    if (!containerMain) {
      return;
    }

    innerHTML += `


<div class="inside_min">

                <div class="item_obj">
                    <div class="item_image">
                        <div class="item">
                            <img class="pimg" src="${item.image}" alt="products" id="mainimg">
                        </div>
                        <div class="item_butn">
                            
                                <button class="item_btn1 styled "type="button"
                                onclick="addToBag(${item.id})">add to cart</button> 
                                
                                
                           
                            <button class=" item_btn2  styled" type="button" onclick="buynow (${item.id})"
                            >buy now</button>

                        </div>
                    </div>
                    <div class="item_details">
                        <div class="details ">
                            <div class="item_name"><strong>${item.pname}</strong></div>
                            <div class="item_subname">${item.subName}</div>
                        </div>
                        <div class="details item_price">
                            <span class="p_price">${item.price} </span>
                            <span class="p_opreice">${item.oprice}</span>
                            <span class="P_disc">Min ${item.discount}% off</span>
                        </div>
                        <div class="details item_simge">
                            <div class="sep_img">
                            </div>
                            <div class="sep_img">
                                <img class="spimg" src="${item.itemsDiffLook.image1}" alt="products">
                            </div>
                            <div class="sep_img">
                                <img class="spimg" src="${item.itemsDiffLook.image2}" alt="products">
                            </div>
                            <div class="sep_img">
                                <img class="spimg" src="${item.itemsDiffLook.image3}" alt="products">
                            </div>
                            <div class="sep_img">
                                <img class="spimg" src="${item.itemsDiffLook.image4}" alt="products">
                            </div>

                        </div>
                        <div class="details item_details_info">
                            <h4>details</h4>
                            <table>
                                <tr><th>Specifications</th></tr>
                                <tr> <td class="dth">
                                In The Box</td>
                                    <td >Handset, USB C Charge Cable (1m), Documentation</td>
                                </tr>
                                
                                <tr><td class="dth" >Model Number</td>
                                    <td>MTP13HN/A</td></tr>
                                <tr>
                                    <td class="dth">Sound Enhancements</td>
                                    <td>Built-in Stereo Speaker</td>
                                </tr>
                                <tr>
                                    <td class="dth">GPU</td>
                                    <td>
                                    5 Core
                                    </td>
                                </tr>
                               
                                
                               
                                
                                
                            </table>
                           
                        </div>
                        <div class="details item_discount">
                            <h4>available offers<br></h4>
                            
<p>Bank Offer10% off on IDFC FIRST Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above<a href="#">T&C</a>
</p>
<p>Bank OfferFlat ₹750 off on OneCard Credit Card and Credit EMI Transactions on orders of ₹12,500 and above<a href="#">T&C</a>
</p>
<p>Bank OfferExtra ₹1000 off on IDFC FIRST Bank Credit Card EMI Txns on a Net Cart Value of ₹29,990 and above<a href="#">T&C</a>
</p>
<p>Buy this product and Get Extra ₹75 Off on Select Room Heaters<a href="">T&C</a>
</p>      




                        </div>
                        <div class="details item_rating">
                            <h4> Ratings &  Reviews<br><br></h4>
                            <span id="rating">
                                ${item.rate.star} ⭐</span><span> (${item.rate.count})</span>
                            
                        </div>
                        
                    </div>
                </div>
                
                
            </div>`;
  });
  containerMain.innerHTML = innerHTML;
}

let pimg = document.getElementById("mainimg");
let spimg = document.getElementsByClassName("spimg");
//change image icon

//    console.log(pimg);
//    console.log(spimg);

spimg[0].onclick = function () {
  pimg.src = spimg[0].src;
};
spimg[1].onclick = function () {
  pimg.src = spimg[1].src;
};
spimg[2].onclick = function () {
  pimg.src = spimg[2].src;
};
spimg[3].onclick = function () {
  pimg.src = spimg[3].src;
};
