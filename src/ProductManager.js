//Partiendo del entregable de la clase 4 


const { promises: fs } = require('fs');

class ProductManager {
  constructor(filePath) {
      this.path = filePath;
      this.products = [];
      this.nextId = 1;

      // Verificar si el archivo existe, si no, crearlo
      this.checkAndCreateFile();
  }

  async checkAndCreateFile() {
      try {
          await fs.access(this.path);
      } catch (error) {
          // El archivo no existe, crearlo con un arreglo vacío
          await fs.writeFile(this.path, '[]', 'utf8');
      }
  }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) { 
            throw new Error('Todos los campos son obligatorios.');
        }//Es la verificación de que estén todos los campos
        
        //Error si se repite código
        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            throw new Error("El código del producto ya existe.");
        }

        //Genero el producto para agregarlo al array
        let newProduct = {
            id: this.nextId++,
            title: title,
            description:  description,
            price:  price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        this.products.push(newProduct);
        //Ahora que tengo armado el array, lo guardo en el archivo
        await this.saveToFile();
    }

    async getProducts(n) {
        //Esta función debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
        await this.loadFromFile();
        if (n) {
            return this.products.slice(0, n);
        }
        //si no pasan parametro n, devuelvo todos los productos
        return this.products;

    }

    async getProductById(id) {
        //Esta función busca el producto por ID en la lista de productos cargados.
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }
    
    async updateProduct(id, updatedProduct) {
        // Actualiza un producto por ID en la lista de productos y guarda la actualización en el archivo
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };

        await this.saveToFile();
    }

    async deleteProduct(id) {
        // Elimina un producto por ID de la lista de productos y guarda la actualización en el archivo
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products.splice(productIndex, 1);

        await this.saveToFile();
    }

    async saveToFile() {
        // Guarda la lista de productos en el archivo "productos.json"
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error);
        }
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            
            // Verifica si el archivo está vacío antes de intentar parsearlo
            if (data.trim() === '') {
                this.products = [];
            } else {
                this.products = JSON.parse(data);
            }

            // Calcular el siguiente ID basado en los productos cargados
            if (this.products.length > 0) {
                const lastProduct = this.products[this.products.length - 1];
                this.nextId = lastProduct.id + 1;
            }
        } catch (error) {
            console.error('Error al cargar productos desde el archivo:', error);
        }
    }
}

module.exports = ProductManager;


//Voy a agregar algunos productos para tener el archivo con productos

// const productManager = new ProductManager('productos.json');

// (async () => {
//     try {
//         // Prueba de agregar un producto
//         await productManager.addProduct("Producto 1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//         //Agrego tres productos genericos para probar y que sean distintos entre si en los campos
//         await productManager.addProduct("Producto 2", "Este es un producto prueba", 300, "Sin imagen", "abc124", 21);
//         await productManager.addProduct("Producto 3", "Este es un producto prueba", 250, "Sin imagen", "abc125", 15);
//         await productManager.addProduct("Producto 4", "Este es un producto prueba", 20, "Sin imagen", "abc126", 20);
//         await productManager.addProduct("Producto 5", "Este es un producto prueba", 100, "Sin imagen", "abc127", 10);
//         await productManager.addProduct("Producto 6", "Este es un producto prueba", 150, "Sin imagen", "abc128", 30);
//         await productManager.addProduct("Producto 7", "Este es un producto prueba", 250, "Sin imagen", "abc129", 5);
//         await productManager.addProduct("Producto 8", "Este es un producto prueba", 300, "Sin imagen", "abc130", 10);
//         await productManager.addProduct("Producto 9", "Este es un producto prueba", 200, "Sin imagen", "abc131", 15);
//         await productManager.addProduct("Producto 10", "Este es un producto prueba", 100, "Sin imagen", "abc132", 20);



//     } catch (error) {
//         console.error("Error en las pruebas:", error);
//     }
// })();



