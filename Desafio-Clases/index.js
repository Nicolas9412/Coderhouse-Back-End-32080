class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(nombre) {
    this.mascotas.push(nombre);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    const libro = { nombre, autor };
    this.libros.push(libro);
  }
  getBookNames() {
    const nombresLibros = [];
    this.libros.map((libro) => nombresLibros.push(libro.nombre));
    return nombresLibros;
  }
}

const usuario = new Usuario(
  "Florencia",
  "Tibaudo",
  [
    { nombre: "Moby Dick", autor: " Herman Melville" },
    { nombre: "Frankenstein", autor: "Mary Shelley" },
  ],
  ["Oso", "Michi"]
);

console.log(`Mi nombre completo es ${usuario.getFullName()}`);
console.log(`Hasta ayer tenía ${usuario.countMascotas()} mascotas`);
usuario.addMascota("Tiburoncin");
console.log(
  `Mi mama me trajo de sorpresa una nueva mascota y ahora tengo ${usuario.countMascotas()}`
);
usuario.addBook("Un mundo feliz", "Aldous Huxley");
console.log(
  `Me compre un nuevo libro y mi colección esta formada por ${usuario.getBookNames()}.`
);
