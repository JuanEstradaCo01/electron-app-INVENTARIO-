fetch(`https://electron-app-inventario.onrender.com/products`)
    .then(response => response.json())
    .then(data => {
        pintarProducts(data.products);
    })
    .catch((error) => console.error("Error al consultar los productos de la DB"));

function pintarProducts(array) {
    const products = document.getElementById("tableProducts")

    array.forEach(item => {
        const tr = document.createElement('tr');
        // Asignamos el contenido al elemento
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td><strong style="color: green;">$</strong> ${item.price}</td>
        `;
        // Insertamos el elemento en el DOM
        products.appendChild(tr);
    });
};