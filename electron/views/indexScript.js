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
        <h2 id="notExistProducts">¡No hay productos registrados!</h2>
    `;
    // Insertamos el elemento en el DOM
    products.appendChild(div);
}

function printProducts(array) {
    const table = document.getElementById("table")

    array.forEach(item => {
        const tbody = document.createElement('tbody');
        // Asignamos el contenido al elemento
        tbody.innerHTML = `       
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td><strong style="color: green;">$</strong> ${item.price}</td>
                    <td id="btnContainer">
                    <button id="${item.id}" class="edit-btn">Editar</button>
                    <button id="${item._id}" class="delete-btn">Eliminar</button>
                    </td>
                </tr>
        `;
        // Insertamos el elemento en el DOM
        table.appendChild(tbody);

        document.getElementById(`${item.id}`).addEventListener("click", () => openFloatWindow(item.id));
        document.getElementById(`${item._id}`).addEventListener("click", () => deleteProduct(item._id));
    });

    function openFloatWindow(id) {
        window.open(
            './editProduct.html',
            'ventanaFlotante',
            `width: "100vh",
          height: "100vh"`
        );
        fetch(`https://electron-app-inventario.onrender.com/product/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log({data})
            })
            .catch((error) => console.error("Error al consultar los productos de la DB", error));
    }

    function deleteProduct(id) {
        Swal.fire({
            title: "Advertencia",
            text: `Esta accion es irrevesible`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://electron-app-inventario.onrender.com/deleteProduct/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.code !== 200) {
                            Swal.fire({
                                title: "Error",
                                text: `${data.message}`,
                                icon: "error"
                            });
                        }

                        Swal.fire({
                            title: "Eliminado",
                            text: `${data.message}`,
                            icon: "success"
                        });
                    })
                    .catch((error) => console.error("Error:", error));
            }
        });
    }
};