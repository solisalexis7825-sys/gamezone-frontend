cconst API_URL = "https://gamezone-backend-1.onrender.com/videojuegos";

// Mostrar videojuegos
async function obtenerVideojuegos(){

    const res = await fetch(API_URL);

    const datos = await res.json();

    const tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    datos.forEach(juego => {

        tabla.innerHTML += `
        <tr>
            <td>${juego.nombre}</td>
            <td>${juego.genero}</td>
            <td>${juego.plataforma}</td>
            <td>$${juego.precio}</td>
            <td>${juego.desarrollador}</td>

            <td>
                <button onclick="editarJuego('${juego._id}')">
                    Editar
                </button>

                <button onclick="eliminarJuego('${juego._id}')">
                    Eliminar
                </button>
            </td>
        </tr>
        `;
    });
}

// Guardar videojuego
document.getElementById("formJuego")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const juego = {

        nombre: document.getElementById("nombre").value,

        genero: document.getElementById("genero").value,

        plataforma: document.getElementById("plataforma").value,

        precio: Number(
            document.getElementById("precio").value
        ),

        desarrollador:
        document.getElementById("desarrollador").value
    };

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(juego)
    });

    document.getElementById("formJuego").reset();

    obtenerVideojuegos();
});

// Editar
async function editarJuego(id){

    const nombre = prompt("Nuevo nombre:");

    if(!nombre) return;

    await fetch(`${API_URL}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            nombre
        })
    });

    obtenerVideojuegos();
}

// Eliminar
async function eliminarJuego(id){

    if(confirm("¿Eliminar videojuego?")){

        await fetch(`${API_URL}/${id}`,{
            method:"DELETE"
        });

        obtenerVideojuegos();
    }
}

obtenerVideojuegos();