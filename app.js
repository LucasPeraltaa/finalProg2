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
    listado.innerHTML =""
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

async function actualizar(){
    btnUpd.hidden = true
    btnAdd.hidden = false
    resp = await axios.put("http://localhost:3000/inventario" + auxiliar,{producto: producto.value, 
                            cantidad: cantidad.value, precio:precio.value})
    listar()
    producto.value = ""
    cantidad.value = ""
    precio.value = ""
}

// CRUD CLIENTES

const nombre = document.getElementById("cliNombre")
const duenio = document.getElementById("cliDuenio")
const direccion = document.getElementById("cliDireccion")

const listado2 = document.getElementById("lisCli")

const btnAdd2 = document.getElementById("addCli")
const btnUpd2 = document.getElementById("updCli")

let auxiliar2
listar2()

async function guardar2(){

    resp = await axios.get("http://localhost:3000/cliente")

    respuesta = resp.data.some(function(clientes){
        return clientes.nombre == nombre.value
    })

    try {
        if (respuesta == false) {
            
            resp = await axios.post("http://localhost:3000/cliente", {nombre:nombre.value,
                                    duenio:duenio.value, direccion:direccion.value})

            alert("Guardado")

            listarClientes()
            nombre.value = ""
            duenio.value = ""
            direccion.value = ""
        }
        else{
            alert("No se pudo guardar")

            listarClientes()
            nombre.value = ""
            duenio.value = ""
            direccion.value = ""
        }
    } catch (error) {
        
    }
    listar2()
}

async function listar2(){
    resp2 = await axios.get("http://localhost:3000/cliente")
    listado2.innerHTML =""
    resp2.data.forEach(element2 => {
        listado2.innerHTML +=
        " El Id: " + element2.id + " -- " + " Nombre: " +
        element2.nombre + " -- " + " Dueño: " + element2.duenio + " -- " + " Direccion: " + element2.direccion +' '+'<button onclick="borrar2(' + element2.id +')"><img src="DELETE-ICON.png" alt="" style="height: 20px; width: 20px;"></button>' +
        '<button onclick="mostrar2(' + element2.id +')"><img src="RESFRESH-ICON.png" alt="" style="height: 20px; width: 20px;"></button>'+
        "<br>";
    })
}

async function borrar2(id2){
    resp = await axios.get("http://localhost:3000/ventas")
    respuesta = resp.data.some(function(clientes){
        return clientes.idCliente == id2
    })

    try{
        if (respuesta == false) {
            await axios.delete("http://localhost:3000/clientes" + id2)

            alert("Se borro correctamente")
        }
        else{
            alert("No se puede borrar")
        }
    }
    catch (error){
        console.log(error)
        alert("Error de borrado")
    }

    listar2()
}

async function actualizar2(){
    btnUpd2.hidden = true
    btnAdd2.hidden = false

    resp2 = await axios.put("http://localhost:3000/clientes" + auxiliar2, {nombre: nombre.value,
                            duenio:duenio.value, direccion:direccion.value})

    nombre.value = ""
    duenio.value = ""
    direccion.value = ""
    listar2()
}

// CRUD VENTAS (solo me piden 2 tablas, posiblemente lo termine sacando)

const cantVenta = document.getElementById("venCantidad")
const totalVenta = document.getElementById("venTotal")
const idCliente = document.getElementById("venCliente")
const idInventario = document.getElementById("venProducto")

const listado3 = document.getElementById("lisVen")

const btnAdd3 = document.getElementById("addPro")
const btnUpd3 = document.getElementById("")

let auxiliar3
lista3()

async function listar3(){

    resp3 = await axios.get("http://localhost:3000/ventas")
    listado3.innerHTML = ""
    resp3.data.forEach(async element3 => { 
        resp = await axios.get("http://localhost:3000/inventario" + element3.idInventario)
        resp2 = await axios.get ("http://localhost:3000/clientes" + element3.idCliente)
        listado3.innerHTML +=
         element3.cantidad + element3.totalVenta
    });
}