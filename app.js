// CRUD CLIENTES

const nombre = document.getElementById("cliNombre");
const duenio = document.getElementById("cliDuenio");
const direccion = document.getElementById("cliDireccion");

const listaClientes = document.getElementById("lisCli");

const btnAddCli = document.getElementById("addCli");
const btnUpdCli = document.getElementById("updCli");

let auxiliarCliente;
listarClientes();


// CRUD INVENTARIO

const producto = document.getElementById("invProducto");
const cantidad = document.getElementById("invCantidad");
const precio = document.getElementById("invPrecio");

const listaProductos = document.getElementById("lisPro");

const btnAddPro = document.getElementById("addPro");
const btnUpdPro = document.getElementById("updPro");

let auxiliarInventario;
listarClientes();