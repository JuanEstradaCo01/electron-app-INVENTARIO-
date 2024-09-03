const products = document.querySelector("#products");

let form = document.getElementById("formAddProduct");

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const productName = document.querySelector("#name").value;
    const category = document.querySelector("#category").value;
    const quantity = document.querySelector("#quantity").value;
    const price = document.querySelector("#price").value;

    const newProduct = {
        name: productName,
        category: category,
        quantity: quantity,
        price: price
    }

    form.reset()
});