let cart = [];
let total = 0;

function toggleItem(name, price, id) {
    const btn = document.getElementById(id);
    const index = cart.findIndex((item) => item.name === name);

    if (index === -1) {
        cart.push({ name, price });
        total += price;
        btn.innerHTML = `Remove Item <i class="fa-solid fa-circle-minus"></i>`;
        btn.classList.remove("add");
        btn.classList.add("remove");
    } else {
        cart.splice(index, 1);
        total -= price;
        btn.innerHTML = `Add Item <i class="fa-solid fa-circle-plus"></i>`;
        btn.classList.remove("remove");
        btn.classList.add("add");
    }
    renderCart();
}

function renderCart() {
    const table = document.getElementById("cartTable");
    const empty = document.getElementById("emptyCart");

    if (cart.length === 0) {
        empty.style.display = "block";
        table.style.display = "none";
    } else {
        empty.style.display = "none";
        table.style.display = "table";
    }

    table.innerHTML = `
<tr>
<th>S.No</th>
<th>Service</th>
<th>Price</th>
</tr>
`;

    cart.forEach((item, i) => {
        table.innerHTML += `
<tr>
<td>${i + 1}</td>
<td>${item.name}</td>
<td>₹${item.price}</td>
</tr>
`;
    });

    document.getElementById("total").innerText = total;
}

function book() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const error = document.getElementById("errorMsg");
    const success = document.getElementById("successMsg");

    error.style.display = "none";
    success.style.display = "none";

    if (cart.length === 0) {
        error.innerText = "Add items before booking.";
        error.style.display = "block";
        return;
    }

    if (!name || !email || !phone) {
        error.innerText = "All fields are required.";
        error.style.display = "block";
        return;
    }

    let services = cart.map((item) => `${item.name} - ₹${item.price}`).join("\n");

    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        total: total,
        services: services,
    };

    emailjs.send("service_e1hvjzi", "template_yhngf3b", templateParams).then(
        function () {
            success.style.display = "block";

            cart = [];
            total = 0;
            renderCart();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            document.querySelectorAll(".remove").forEach((btn) => {
                btn.innerHTML = `Add Item <i class="fa-solid fa-circle-plus"></i>`;
                btn.classList.remove("remove");
                btn.classList.add("add");
            });
        },
        function () {
            error.innerText = "Failed to send confirmation email.";
            error.style.display = "block";
        }
    );
}

function subscribeNewsletter() {
    const name = document.getElementById("newsName").value.trim();
    const email = document.getElementById("newsEmail").value.trim();

    if (!name || !email) {
        alert("Please enter name and email.");
        return;
    }

    alert("Thank you for subscribing!");

    document.getElementById("newsName").value = "";
    document.getElementById("newsEmail").value = "";
}
