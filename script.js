
// Ejercicio - Gráficas con Star Wars ⚔️ 🔫
// API ENDPOINT --> https://swapi.dev/api/films/

// Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
// En el eje X el nombre de la película
// En el eje Y año de publicación

// Cada una de las películas
// Nombre (X)
// Año de publicación (Y)
let arrayNombresPelis;
let arrayAnios;

async function pelisStarWars() {
  // Bloque try / catch para manejo de errores
  try {
    // Guardamos la respuesta http del sistema
    let response = await fetch(`https://swapi.dev/api/films/`)

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    let data = await response.json();
    let pelis = data.results;
    arrayNombresPelis = pelis.map(peli => peli.title);
    arrayFechasPelis = pelis.map(peli => peli["release_date"]);

    arrayAnios = arrayFechasPelis.map(elemento => elemento.slice(0, 4))

  } catch (error) {
    // Manejar errores de red o del servidor
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}
pelisStarWars()

async function imprimirGrafico() {
  try {
    await pelisStarWars();

    new Chartist.Line('.ct-chart', {
      labels: arrayNombresPelis,
      series: [
        arrayAnios
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  } catch (error) {
    // Manejar errores de red o del servidor
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}

imprimirGrafico()


// x es horizontal
// y es vertical

// Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver
// En el eje X el nombre del personaje
// En el eje Y el número de películas en las que ha participado.

let arrayNombresPjs;
let numPelis;

async function personajesStarWars() {
  // Bloque try / catch para manejo de errores
  try {
    // Guardamos la respuesta http del sistema
    let response = await fetch(`https://swapi.dev/api/people/`)

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    let data = await response.json();
    let personajes = data.results;
    arrayNombresPjs = personajes.map(pj => pj.name);
    arrayPelis = personajes.map(peli => peli.films);
    numPelis = arrayPelis.map(arrayPelis => arrayPelis.length);

  } catch (error) {
    // Manejar errores de red o del servidor
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}


async function imprimirGrafico2() {
  try {
    await personajesStarWars();

    new Chartist.Bar('.ct-chart2', {
      labels: arrayNombresPjs,
      series: numPelis
    }, {
      distributeSeries: true
    });
    
    
  } catch (error) {
    // Manejar errores de red o del servidor
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}

personajesStarWars()
imprimirGrafico2()

