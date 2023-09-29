const express = require("express");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

let peliculas = [
	{
		id: 1,
		titulo: "Casablanca",
		director: "Michael Curtiz",
		añoLanzamiento: 1942,
		genero: "Drama/Romance",
		calificacion: 9.2,
	},
	{
		id: 2,
		titulo: "El Padrino",
		director: "Francis Ford Coppola",
		añoLanzamiento: 1972,
		genero: "Crimen/Drama",
		calificacion: 9.2,
	},
	{
		id: 3,
		titulo: "Lo que el viento se llevó",
		director: "Victor Fleming",
		añoLanzamiento: 1939,
		genero: "Drama/Romance",
		calificacion: 8.1,
	},
	{
		id: 4,
		titulo: "Ciudadano Kane",
		director: "Orson Welles",
		añoLanzamiento: 1941,
		genero: "Drama/Misterio",
		calificacion: 8.3,
	},
	{
		id: 5,
		titulo: "El Padrino II",
		director: "Francis Ford Coppola",
		añoLanzamiento: 1974,
		genero: "Crimen/Drama",
		calificacion: 9.0,
	},
	{
		id: 6,
		titulo: "La lista de Schindler",
		director: "Steven Spielberg",
		añoLanzamiento: 1993,
		genero: "Biografía/Drama",
		calificacion: 8.9,
	},
	{
		id: 7,
		titulo: "Pulp Fiction",
		director: "Quentin Tarantino",
		añoLanzamiento: 1994,
		genero: "Crimen/Drama",
		calificacion: 8.9,
	},
	{
		id: 8,
		titulo: "El bueno, el malo y el feo",
		director: "Sergio Leone",
		añoLanzamiento: 1966,
		genero: "Western",
		calificacion: 8.8,
	},
	{
		id: 9,
		titulo: "El señor de los anillos: El retorno del rey",
		director: "Peter Jackson",
		añoLanzamiento: 2003,
		genero: "Aventura/Drama",
		calificacion: 8.9,
	},
	{
		id: 10,
		titulo: "La trilogía de El Padrino",
		director: "Francis Ford Coppola",
		añoLanzamiento: 1972,
		genero: "Crimen/Drama",
		calificacion: 9.0,
	},
];
// Obtener la lista de todas las peliculas(GET).
app.get("/socios/v1/peliculas", (req, res) => {
	if (peliculas.length > 0) {
		res.status(200).json({
			estado: 1,
			mensaje: "Existen peliculas",
			peliculas: peliculas,
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No existen peliculas",
		});
	}
});
// Obtener un pelicula por su ID (GET).
app.get("/socios/v1/peliculas/:id", (req, res) => {
	const id = req.params.id;
	const pelicula = peliculas.find((peliculas) => peliculas.id == id);
	if (pelicula) {
		res.status(200).json({
			estado: 1,
			mensaje: "Pelicula encontrada",
			pelicula: pelicula,
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No existen pelicula",
		});
	}
});
// Agregar una nueva pelicula (POST).
app.post("/socios/v1/peliculas", (req, res) => {
	const { titulo, director, genero, calificacion } = req.body;
	const id = Math.round(Math.random() * 1000);
	if (
		(titulo == undefined || director == undefined || calificacion == undefined,
		genero == undefined)
	) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
		});
	} else {
		const pelicula = {
			id: id,
			titulo: titulo,
			director: director,
			genero: genero,
			calificacion: calificacion,
		};
		const longitudInicial = peliculas.length;
		peliculas.push(pelicula);
		if (peliculas.length > longitudInicial) {
			res.status(201).json({
				estado: 1,
				mensaje: "Pelicula creada correctamente",
				pelicula: pelicula,
			});
		} else {
			res.status(500).json({
				estado: 0,
				mensaje: "No se agrego correctamente",
			});
		}
	}
});

// Actualizar un pelicula por su ID (PUT).
app.put("/socios/v1/peliculas/:id", (req, res) => {
	const { id } = req.params;
	const { titulo, director, genero, calificacion } = req.body;
	if (
		(titulo == undefined || director == undefined || calificacion == undefined,
		genero == undefined)
	) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
		});
	} else {
		const posActualizar = peliculas.findIndex((pelicula) => pelicula.id == id);
		if (posActualizar != -1) {
			peliculas[posActualizar].titulo = titulo;
			peliculas[posActualizar].director = director;
			peliculas[posActualizar].calificacion = calificacion;
			peliculas[posActualizar].genero = genero;
			res.status(200).json({
				estado: 1,
				mensaje: "pelicula actualizada correctamente",
				pelicula: peliculas[posActualizar],
			});
		} else {
			res.status(404).json({
				estado: 0,
				mensaje: "No se actualizo",
			});
		}
	}
});
// Eliminar un pelicula por su ID (DELETE).
app.delete("/socios/v1/peliculas/:id", (req, res) => {
	const { id } = req.params;
	const indiceEliminar = peliculas.findIndex((pelicula) => pelicula.id == id);
	if (indiceEliminar != -1) {
		peliculas.splice(indiceEliminar, 1);
		res.status(201).json({
			estado: 1,
			mensaje: "pelicula eliminada correctamente",
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No se elimino",
		});
	}
});

app.listen(port, () => {
	console.log("Ejecutandose en el servidor: ", port);
});
