(function () {
    let products = [];
    const productForm = document.getElementById('product-form');
    const inputMessage = document.getElementById('input-message');
    const productList = document.getElementById('product-List');
  
    const socket = io();
  
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newProduct = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            code: document.getElementById('code').value,
            stock: parseInt(document.getElementById('stock').value)
        };
    
        // Agregar el nuevo producto a la lista local de productos
        //products.push(newProduct);

        //console.log(products);
    
        // Emitir un evento WebSocket para notificar sobre el nuevo producto
        socket.emit('new-product', newProduct);

    });
  

    function updateProducts(products = []) {
        productList.innerHTML = ''; // Limpia la lista actual de productos
        products.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${product.id}, Título: ${product.title}, Precio: ${product.price}, Stock: ${product.stock}, Código: ${product.code}, Descripción: ${product.description}, Status: ${product.status} `;
            productList.appendChild(listItem);
        });
    }
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('start', (data) => {
        products = data;
        updateProducts(products);
    });

    socket.on('notification', (data) => {
        products = data;
        console.log("Alguien agrego un producto");
        updateProducts(products);
    });
  
  
})();