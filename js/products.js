// Cargar el archivo JSON desde la URL
fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = data.products.map(product => `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <div class="card-price">${product.cost} ${product.currency}</div>
                <p class="card-text">${product.description}</p>
            </div>
            <div class="card-footer">
                <p class="card-sold-count">Vendidos ${product.soldCount}</p>
            </div>
        </div>

        `).join('');
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
   
    let usuario = localStorage.getItem('usuario');
    if (usuario) {
        document.getElementById('nombre-usuario').textContent = `${usuario}`;
    };
    let products = []; // Aquí almacenaremos los productos después de cargar el JSON

// Capturando los elementos del DOM
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const filterBtn = document.getElementById('filterBtn');
const sortOptions = document.getElementById('sortOptions');
const productList = document.querySelector('.product-list');

// Función para mostrar productos en la página
function displayProducts(filteredProducts) {
  productList.innerHTML = ''; // Limpiar la lista antes de mostrar productos
  filteredProducts.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <h4>${product.name}</h4>
      <p>Precio: $${product.price}</p>
      <p>Vendidos: ${product.sold}</p>
    `;
    productList.appendChild(productItem);
  });
}

// Filtrar productos por rango de precio
function filterProducts() {
  const minPrice = parseFloat(minPriceInput.value) || 0; // Si no hay valor, toma 0
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity; // Si no hay valor, toma Infinity

  // Filtrar productos por precio
  const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);

  // Ordenar los productos después de filtrarlos
  sortProducts(filteredProducts);
}

// Ordenar productos según la opción seleccionada
function sortProducts(filteredProducts) {
  const sortValue = sortOptions.value;

  if (sortValue === 'ascPrice') {
    filteredProducts.sort((a, b) => a.price - b.price); // Orden ascendente por precio
  } else if (sortValue === 'descPrice') {
    filteredProducts.sort((a, b) => b.price - a.price); // Orden descendente por precio
  } else if (sortValue === 'descRelevance') {
    filteredProducts.sort((a, b) => b.sold - a.sold); // Orden descendente por relevancia (más vendidos)
  }

  // Mostrar los productos filtrados y ordenados
  displayProducts(filteredProducts);
}

// Cargar productos desde un archivo JSON
function loadProducts() {
  fetch('productos.json') // Ruta al archivo JSON
    .then(response => response.json())
    .then(data => {
      products = data; // Guardar los productos en la variable global
      displayProducts(products); // Mostrar los productos al cargar la página
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

// Agregar eventos a los controles
filterBtn.addEventListener('click', filterProducts); // Filtrar productos al hacer clic en el botón
sortOptions.addEventListener('change', () => sortProducts(products)); // Ordenar productos al cambiar la opción

// Cargar productos al cargar la página
loadProducts();

















