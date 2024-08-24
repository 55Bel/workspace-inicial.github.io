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
    