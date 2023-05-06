const fs = require ("fs");

class ProductManager {

    #products;

    constructor() { 
        this.patch = "./productos.json"; // crea una ruta patch, no se explico en clase.
        this.#products = [];
    }

    #createId() {
        let maxId = this.#products.reduce((max, prod) => {  // uso de reduce en lugar de un FOR utilizado en desafio 1.
            if (prod.id > max) {  // uso if para comprenderlo mejor.
                return prod.id;
            } else {
                return max;
            }
        }, 0);
        return ++maxId;
    }

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
    } 

    getProductById = async(id)=> {

        const productsFile = await fs.promises.readFile(this.patch, "utf-8");  
        const prodRead = JSON.parse(productsFile);

        const searching = prodRead.find(prod => prod.id === id); // filtro en busca de UN ID.
        searching??console.log("Not found");  // si no lo encuentra , respuesta no encontrado. Uso ternario.
       
    }    

}
  

//  

     //   if (this.#products.find(prod => prod.code === code)) {  // permite encontrar codigo repetido
     //       return console.log( `The code ${code} is repeated`); 
     //          }



   //     if (!Object.values(newproducts).includes(undefined)) {  // todos los campos son obligatorios tienen un valor, si no falta un valor todo OK, sino sera un valor UNDEFINED. 
 
    //        this.products.push(newproducts);
   
    //       } else {  console.log("All fields are required")}
   
        //return  newproducts;

    //  }

    
const productM = new ProductManager(); 

//productM.addProduct("shorts", "T. XL", 1000, "thumbnail 1", "abc124", 20);
//productM.addProduct("shirt", "T. SL", 2000, "thumbnail 2", "abc125", 30 ); 
//productM.addProduct("blue jean", "T. ML", 1000, "thumbnail 3", "abc126",60 );    
//productM.addProduct("pants", "T. XL", 3000, "thumbnail 4", "abc127", 50 );

///Testeos:

//productM.getProducts(); // Me trae todos los productos del JSON en formato objeto.
//productM.getProductById(2); // busco el ID que quiero en el JSON.
//productM.getProductById(8); // ID (8) no encontrado como respuesta.
