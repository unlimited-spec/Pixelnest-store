const products = {
  web: {name: "HTML & CSS Starter Kit", price: 2000},
  social: {name: "Social Media Template Pack", price: 1500},
  wallpaper: {name: "Neon Focus Wallpapers", price: 800}
};
const cart = {};
const panel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const fmt = n => "₦" + n.toLocaleString("en-NG");
function renderCart(){
  const entries = Object.entries(cart);
  document.getElementById("cartCount").textContent = entries.reduce((sum,[,qty])=>sum+qty,0);
  const items = document.getElementById("cartItems");
  if(!entries.length){items.innerHTML="<p>Your cart is empty.</p>";}
  else {
    items.innerHTML = entries.map(([id,qty])=>`<div class="cart-row"><span>${products[id].name} × ${qty}</span><span>${fmt(products[id].price*qty)} <button data-remove="${id}" aria-label="Remove one">−</button></span></div>`).join("");
  }
  document.getElementById("cartTotal").textContent = fmt(entries.reduce((sum,[id,qty])=>sum+products[id].price*qty,0));
}
document.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{
  const id=button.dataset.product;cart[id]=(cart[id]||0)+1;renderCart();
  button.textContent="Added ✓";setTimeout(()=>button.textContent="Add to cart +",900);
}));
document.getElementById("cartItems").addEventListener("click",e=>{
  const id=e.target.dataset.remove;if(!id)return;
  cart[id]--;if(cart[id]<=0)delete cart[id];renderCart();
});
function openCart(){panel.classList.add("open");overlay.classList.add("show");}
function closeCart(){panel.classList.remove("open");overlay.classList.remove("show");}
document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>alert("This is a demo store. Payment checkout has not been connected yet."));
document.getElementById("year").textContent=new Date().getFullYear();
renderCart();
