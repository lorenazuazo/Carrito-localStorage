//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //cuando se agrega un curso presionando "Agrear al carrito"
    listaCurso.addEventListener('click', agregarCurso);

    //eleimina elemento del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vacia el carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

    //cargar el carrito si en el localStorage hay elementos

document.addEventListener('DOMContentLoaded', () =>{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
})
};

//funciones
/**
 * @param {Event} e
 */
function agregarCurso(e){
    
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
};
//elimina elementos del carrito
function eliminarCurso(e) {
    
    if(e.target.classList.contains('borrar-curso')){
        const idCurso = e.target.getAttribute('data-id');
        //eliminar el curso
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== idCurso );
        carritoHTML();
    };
};

function vaciarCarrito(){
    articulosCarrito = [];
    limpiaHTML();
    localStorage.clear();
}

//lee el contenido del html y extrae la info del curso
function leerDatosCurso(curso){
    //objeto con los datos del curso
    const infoCurso = {
        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };
    //revisa si el curso que estamos creando ya existe en el arr
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){
        //actuliza cantidad
        const cursos = articulosCarrito.map(curso =>{            
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    }else{
        //agrega el curso al carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    };
    
    carritoHTML();
};

//muestra el carrito en el html
function carritoHTML(){
    //limpiar HTML
    limpiaHTML();

    articulosCarrito.forEach(curso =>{
        const {img,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${img}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
};

function limpiaHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //recomendada es mas rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}
