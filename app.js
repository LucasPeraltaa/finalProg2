// CRUD INVENTARIO

const producto = document.getElementById("invProducto");
const cantidad = document.getElementById("invCantidad");
const precio = document.getElementById("invPrecio");

const listado = document.getElementById("lisInv");

const btnAdd = document.getElementById("addPro");
const btnUpd = document.getElementById("updPro");

let auxiliar
listar()

async function guardar(){
    resp = await axios.post("http://localhost:3000/inventario",{producto: producto.value, 
                            cantidad: cantidad.value, precio:precio.value})

    listar()
    producto.value = ""
    cantidad.value = ""
    precio.value = ""

    alert("Grabado")

    .catch(() => {
        alert("Se produjo un error al guardar")
    })
}

async function listar(){
    resp = await axios.get("http://localhost:3000/inventario")
    listado.innerHTML = ""
    resp.data.forEach(element => {
        listado.innerHTML += "El ID: " + element.id + " -- " + " Producto: " + element.producto +
        " -- " + "Cantidad: " + element.cantidad + " -- " + "Precio: " + element.precio + ' ' + '<button onclick="borrar(' + element.id +')"><img src="DELETE-ICON.png" alt="" style="height: 20px; width: 20px;"></button>' +
        '<button onclick="mostrar(' + element.id +')"><img src="DELETE-ICON.png" alt="" style="height: 20px; width: 20px; "></button>'+
        "<br>";
    })
}

async function borrar(id){

    resp = await axios.get("http://localhost:3000/venta")
    respuesta = resp.data.some(function(producto){
        return producto.idInventario == id
    })

    try {
        if (respuesta == false) {
            await axios.delete ("http://localhost:3000/inventario" + id)
            alert("Borrado Correctamente")
        }
        else{
            alert("No se pudo eliminar")
        }
    } catch (error) {
        console.log(error)
        alert("Error al borrar")
    }
    listar()
}

async function mostrar(id){
    btnUpd.hidden = false
    btnAdd.hidden = true
    auxiliar = id
    resp = await axios.get("http://localhost:3000/inventario" + id)
    producto.value = resp.data.producto
    cantidad.value = resp.data.cantidad
    precio.value = resp.data.precio
}