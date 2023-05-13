const fs = require ("fs");

class ProductManager {

    #products;
    
    constructor() { 
        this.patch = "./productos.json"; 
        this.#products = [];
    };

    #createId() {
        let maxId = this.#products.reduce((max, prod) => {  // uso de reduce en lugar de un FOR utilizado en desafio 1.
            if (prod.id > max) {  // uso if para comprenderlo mejor.
                return prod.id;
            } else {
                return max;
            }
        }, 0);
        return ++maxId;
    };

    addProduct = async ( title, description, price, thumbnail, code, stock)=> {  
       let newproducts= { id: this.#createId() , title, description, price, thumbnail, code, stock };
       this.#products.push(newproducts) // guardo el objeto en array vacio.
       const productsString = JSON.stringify(this.#products);  // guardo en formato string
       await fs.promises.writeFile(this.patch, productsString); // guardo en archivo.JSON
    };


    getProducts = async () => {
        const productsFile = await fs.promises.readFile(this.patch, "utf-8");
        const prodRead = JSON.parse(productsFile); // paso el string en formato objeto.
        console.log(prodRead)
    }; 

    getProductById = async(id)=> {

        const productsFile = await fs.promises.readFile(this.patch, "utf-8");  
        const prodRead = JSON.parse(productsFile);

        const searching = prodRead.find(prod => prod.id === id); // en busca de UN ID.
        searching??console.log("Not found");  // si no lo encuentra , respuesta no encontrado. Uso ternario.  
        
    };  


    deleteProduct = async(id) => {
        const productsFile = await fs.promises.readFile(this.patch, "utf-8");  // busco en el archivo
        const prodRead = JSON.parse(productsFile); // parseo
        let filtering= prodRead.filter(prodF => prodF.id != id);  // filtro el id que tengo como parametro par aeliminarlo
       
        const productsString = JSON.stringify(filtering); // lo vuelvo a guardar en formato string.
        await fs.promises.writeFile(this.patch, productsString); // guardo en archivo.JSON sin el id que filtre.
        console.log ( "removed product"); // devuelvo un mesaje que indica que el producto fue eliminado.
    };

    

 updateProduct = async (id) => {


      
       const productsFile = await fs.promises.readFile(this.patch, "utf-8");  
       const prodRead = JSON.parse(productsFile);
       let searchingf = prodRead.find(prod => prod.id === id);

       const DB= {id:3,title:"blue jean",description:"T. ML",price:8500,thumbnail:"thumbnail 3",code:"abc126",stock:60};

       if(searchingf){
        this.deleteProduct(id);
            

} else{console.log("not filtering")}

await fs.promises.readFile(this.patch, "utf-8");  
await fs.promises.appendFile(this.patch, JSON.stringify(DB));

}

    }


const productM = new ProductManager(); 

//productM.addProduct("shorts", "T. XL", 1000, "thumbnail 1", "abc124", 20);
//productM.addProduct("shirt", "T. SL", 2000, "thumbnail 2", "abc125", 30 ); 
//productM.addProduct("blue jean", "T. ML", 1000, "thumbnail 3", "abc126",60 );    
//productM.addProduct("pants", "T. XL", 3000, "thumbnail 4", "abc127", 50 );

///Testeos:

//productM.getProducts(); // Me trae todos los productos del JSON en formato objeto.
//productM.getProductById(2); // busco el ID que quiero en el JSON parseado.
//productM.getProductById(8); // ID (8) no encontrado como respuesta.
//productM.deleteProduct(4) ; // elimino el id (4) usando filter y reescribiendo.
//productM.addProduct( 3, "blue jean", "T. ML", 1500, "thumbnail 3", "abc126",60)
productM.updateProduct(3);

