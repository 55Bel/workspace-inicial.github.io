let usuario = localStorage.getItem('usuario');
if (usuario) {
    document.getElementById('nombre-usuario').textContent = `${usuario}`;
}

// Obtener catID del localStorage
let catID = localStorage.getItem("catID");
// Acceder al archivo JSON de la categoría para obtener el nombre de la categoría
fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
    .then(response => response.json())
    .then(data => {
        const catName = data.catName; // Aquí obtenemos el nombre de la categoría

        // Ahora obtenemos el productID para mostrar la información del producto seleccionado
        let productID = localStorage.getItem('productID');
        if (productID) {
            // Hacer una solicitud a la API o archivo JSON que contiene la información del producto
            fetch(`https://japceibal.github.io/emercado-api/products/${productID}.json`)
                .then(response => response.json())
                .then(productData => {
                    // Mostrar la información del producto en la página
                    document.getElementById('categoria').textContent = catName; // Mostrar la categoría correcta
                    document.getElementById('nombre-producto').textContent = productData.name;
                    document.getElementById('descripcion').textContent = productData.description;
                    document.getElementById('precio').textContent = `${productData.cost} ${productData.currency}`;
                    document.getElementById('vendidos').textContent = productData.soldCount;
                    document.getElementById('imagen').src = productData.image; // Mostrar la imagen del producto
                })
                .catch(error => console.error('Error al cargar la información del producto:', error));
        }
    })
    .catch(error => console.error('Error al cargar la información de la categoría:', error));
