
let cart = [];
let total = 0;

function toggleItem(name, price, id) {
    const btn = document.getElementById(id);
    const index = cart.findIndex(item => item.name === name);

    if (index === -1) {
        // ADD ITEM
        cart.push({ name, price });
        total += price;

        btn.innerHTML = `Remove Item <i class="fa-solid fa-circle-minus"></i> `;
        btn.classList.remove("add");
        btn.classList.add("remove");

    } else {
        // REMOVE ITEM
        cart.splice(index, 1);
        total -= price;

        btn.innerHTML = `Add Item <i class="fa-solid fa-circle-plus"></i> `;
        btn.classList.remove("remove");
        btn.classList.add("add");
    }
    renderCart();
}

function renderCart(){
  const table = document.getElementById("table");
  const empty = document.getElementById("emptyCart");

  if(cart.length === 0){
    empty.style.display = "block";
    table.style.display = "none";
  }else{
    empty.style.display = "none";
    table.style.display = "table";
  }

  table.innerHTML = `
    <tr>
      <th>S.No</th>
      <th>Service Name</th>
      <th>Price</th>
    </tr>`;

  cart.forEach((item,i)=>{
    table.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
      </tr>`;
  });

  document.getElementById("total").innerText = total;
}

function book() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const error = document.getElementById("errorMsg");
  const success = document.getElementById("successMsg");

  // Reset messages
  error.style.display = "none";
  success.style.display = "none";

  // 1️⃣ Cart empty check
  if (cart.length === 0) {
    error.innerText = "Add the items to the cart to book";
    error.style.display = "flex";
    return;
  }

  // 2️⃣ Form validation
  if (name === "" || email === "" || phone === "") {
    error.innerText = "All fields are required";
    error.style.display = "flex";
    return;
  }

  // ✅ SUCCESS (all good)
  success.style.display = "block";
}
