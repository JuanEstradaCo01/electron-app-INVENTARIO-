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

    fetch(`https://electron-app-inventario.onrender.com/addProduct`, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.code !== 201) {
                Toastify({
                    text: `${data.message}`,
                    duration: 3000,
                    gravity: "bottom",
                    position: "rigth",
                    stopOnFocus: false,
                    style: {
                        background: "red",
                        white
                    }
                }).showToast();
            }
            Toastify({
                text: `${data.message}`,
                duration: 3000,
                gravity: "bottom",
                position: "rigth",
                stopOnFocus: false,
                style: {
                    color: "white",
                    background: "rgb(0, 120, 45)",
                }
            }).showToast();
        })
        .catch((error) => console.error("Error:", error));

    form.reset()
});