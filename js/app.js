"use strict";

const ordersTable = document.getElementById("myTable");
const form = document.getElementById("newOrder");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

window.onload = () => {
  orders.forEach(displayOrder);
};

function Order(meal, price, img) {
    this.meal = meal;
    this.price = price;
    this.img = img;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const meal = document.getElementById("meal").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("mealImage").value;

    const myOrder = new Order(meal, price, img);
    orders.push(myOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    displayOrder(myOrder);
    form.reset();
});

function displayOrder(obj) {
    const item = document.createElement("tr");
    item.innerHTML = `
        <td>${obj.meal}</td>
        <td>${obj.price}</td>
        <td><img src="${obj.img}" width="50" /></td>
    `;
    ordersTable.appendChild(item);
}

document.getElementById("clearOrders").addEventListener("click", () => {
    localStorage.removeItem("orders");
    orders = [];
    ordersTable.innerHTML = `
        <tr>
            <th>Meal</th>
            <th>price</th>
            <th>Image</th>
        </tr>
    `;
});
