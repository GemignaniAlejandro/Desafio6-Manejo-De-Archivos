const fs = require('fs');

class Archivo
{
    constructor(nombreArchivo)
    {
        this.nombreArchivo = nombreArchivo;
        Archivo.arrayProductos;    
    }
    
    static arrayProductos;

    async leer()   
    {   
        try 
        {
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            
            this.arrayProductos = contenido.split(",\r\n")
            
            this.arrayProductos.splice(this.arrayProductos.length-1,1);
            
            console.log("Productos: ", this.arrayProductos);
        } 
        catch(error)
        {
            console.log(`No existe el archivo: ${this.nombreArchivo}. Error: ${error}`);
            return [];
        }
    }

    async guardar(objProducto)
    {
        try
        {   
            const contenido = fs.readFileSync(this.nombreArchivo, 'utf-8');
            
            this.arrayProductos = contenido.split(",\r\n")
            
            this.arrayProductos.splice(this.arrayProductos.length-1,1);
            
            objProducto.id = this.arrayProductos.length+1;
            
            await fs.promises.appendFile(this.nombreArchivo, `${JSON.stringify(objProducto)},\r\n`);

            console.log("Producto agregado.");
        }
        catch(error)
        {
            console.log(`No existe el archivo: ${this.nombreArchivo}. Error: ${error}`);
            return [];
        }
    }
    
    async borrar()
    {
        try
        {
            await fs.promises.unlink(this.nombreArchivo);
            console.log('Archivo borrado.');    
        } 
        catch(error)
        {
            console.log(`No se pudo borrar el archivo '${this.nombreArchivo}' porque no existe . Error: ${error}`);
        }
            
    }
}

let producto = 
{
    title: 'Calculadora',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

let productos = new Archivo('productos.txt');



productos.guardar(producto);
productos.leer();

//productos.borrar();

