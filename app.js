//----------------ENTIDAD--------------------------//

class Cafe{
    constructor(marca,tipoCafe,precio,id){ 
        this.marca = marca; 
        this.tipoCafe = tipoCafe;  
        this.precio = precio;
        this.id = id;
    }
}

//--------------------PRODUCTOS--------------------------//

const cafes = []

const cafe1 = new Cafe ("Rambla", "Nicaragua", 1400, 1);
const cafe2 = new Cafe ("Rambla", "Colombia", 1400, 2);
const cafe3 = new Cafe ("Puerto Blest", "Colombia", 1200, 3);
const cafe4 = new Cafe ("Puerto Blest", "Guatemala", 1200, 4);
const cafe5 = new Cafe ("Puerto Blest", "Peru", 1200, 5);
const cafe6 = new Cafe ("Puerto Blest", "El salvador", 1200, 6);


cafes.push(cafe1)
cafes.push(cafe2)
cafes.push(cafe3)
cafes.push(cafe4)
cafes.push(cafe5)
cafes.push(cafe6)

console.log(cafes)


let ObjtoJson = JSON.stringify(cafes)
localStorage.setItem("cafes",ObjtoJson)

let cards =  document.getElementById("listaProductos")

cafes.forEach (e => {

    //VARIEDADED DE CAFES
    let div1 = document.createElement("div")
    div1.setAttribute("class", "card card-body text-center ")
        
    let h5 = document.createElement("h5")
    h5.textContent= e.marca
    div1.appendChild(h5)
    h5.setAttribute("class", "card-title")

    
    let h6 = document.createElement("h6")
    h6.textContent= e.tipoCafe
    div1.appendChild(h6)
    h6.setAttribute("class", "card-subtitle mb-2 text-muted")


    let p1 = document.createElement("p")
    p1.textContent= e.precio
    div1.appendChild(p1)
    p1.setAttribute("class", "card-text")

    let a= document.createElement("a")   
    a.textContent= "Comprar"
    div1.appendChild(a)
    a.setAttribute("class", "btn btn-secondary")
    a.setAttribute("onclick", `añadirCarrito(${e.id})`)

cards.appendChild(div1)

})

//----------------------CARRITO--------------------------//

let carrito = []

const añadirCarrito = (idPorOnclick) => {

    const objetoIdentificado = cafes.find (e => e.id == idPorOnclick)
    console.log(objetoIdentificado)

    let carritoNEW= JSON.parse(localStorage.getItem("carrito"))

    if (JSON.parse(localStorage.getItem("carrito")) != null) {
        let carritoNEW = JSON.parse(localStorage.getItem("carrito"))
        carritoNEW.push(objetoIdentificado)

        localStorage.setItem("carrito", JSON.stringify(carritoNEW))
        location.reload()
    
    }

    else {
        carrito.push(objetoIdentificado)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        location.reload()
    }

}

//-------------------IMPRIMIR DATOS------------------------//

let carritoID = document.getElementById("carrito")
let tablePrint = document.getElementById("table")

const printCarrito = () => {

    let carritoDelStorage = JSON.parse(localStorage.getItem("carrito"))

    if (carritoDelStorage != null) {

        carritoDelStorage.forEach(e => {

        let table = document.createElement("tr")

        let th1 = document.createElement("th")
        th1.setAttribute("class", "col-2 text-center")
        th1.textContent = `${e.marca}`
        table.appendChild(th1)

    
        let th2 = document.createElement("th")
        th2.setAttribute("class", "col-2 text-center")
        th2.textContent = `${e.tipoCafe}`
        table.appendChild(th2)

        let th3 = document.createElement("th")
        th3.setAttribute("class", "col-2 text-center")
        th3.textContent = `${e.precio}`
        table.appendChild(th3)

        tablePrint.appendChild(table)
        
    })

}
else{
    document.getElementById("err").textContent = "Tu carrito de compras esta vacío"
}
}

printCarrito()

//----------------------PEDIDO--------------------------//
let total= document.getElementById("total")

const precioTotal = () => {

    let carritoDelStorage  = JSON.parse (localStorage.getItem("carrito"))

    let precioTotal = 0;

    if (carritoDelStorage != null) {
    carritoDelStorage.forEach(e=> {
    
    precioTotal = precioTotal + e.precio
    console.log(precioTotal);

    })
}
else{
    document.getElementById("total").textContent = "0"
}
    total.textContent =  precioTotal
}

//BTN CLEAR
let btnClear = document.getElementById("clear")

btnClear.addEventListener("click", () => {
    localStorage.clear()
    location.reload()
})

precioTotal()


