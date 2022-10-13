const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrit = {}
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
items.addEventListener('click', e => {
    agregarCarrito(e)
})
//fetch para leer el archivo json
const fetchData = async () => {
    try {
        const respuesta = await fetch('api.json')
        const data = await respuesta.json()
        agregarCards(data)
    }
    catch (error){
        console.log(error)
    }
}
//funcion para anadir cards por cada producto en el array
const agregarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.marca
        templateCard.querySelector('h4').textContent = producto.modelo
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}
//funcion para llamar a los botones de cada card
const agregarCarrito = e => {

    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
} 
//funcion para agregar los elementos del objeto
const setCarrito = objeto => {
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        marca: objeto.querySelector('h5').textContent,
        modelo: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: ""
    }

    console.log(producto)
}