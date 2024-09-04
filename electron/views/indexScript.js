fetch(`https://electron-app-inventario.onrender.com/products`)
    .then(response => response.json())
    .then(data => {
        if (data.products.length === 0) {
            printNotExistsProducts();
        } else {
            printProducts(data.products);
        }
    })
    .catch((error) => console.error("Error al consultar los productos de la DB", error));

function printNotExistsProducts() {
    const products = document.getElementById("products")

    const div = document.createElement('div');
    // Asignamos el contenido al elemento
    div.innerHTML = `
        <h2>No hay productos registrados</h2>
    `;
    // Insertamos el elemento en el DOM
    products.appendChild(div);
}

function printProducts(array) {
    const products = document.getElementById("products")

    array.forEach(item => {
        const table = document.createElement('table');
        // Asignamos el contenido al elemento
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoria</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody id="tableProducts">
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td><strong style="color: green;">$</strong> ${item.price}</td>
                </tr>
            </tbody>
        
        `;
        // Insertamos el elemento en el DOM
        products.appendChild(table);
    });
};