class Chat {
  #_id;
  #email;
  #mensaje;
  #fecha;

  constructor({ _id, email, mensaje, fecha }) {
    this._id = _id;
    this.email = email;
    this.mensaje = mensaje;
    this.fecha = fecha;
  }

  get _id() {
    return this.#_id;
  }

  set _id(_id) {
    if (!_id) throw new Error('"id" is a field required');
    this.#_id = _id;
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    if (!email) throw new Error('"email" is a field required');
    this.#email = email;
  }

  get mensaje() {
    return this.#mensaje;
  }

  set mensaje(mensaje) {
    if (!mensaje) throw new Error('"mensaje" is a field required');
    this.#mensaje = mensaje;
  }

  get fecha() {
    return this.#fecha;
  }

  set fecha(fecha) {
    if (!fecha) throw new Error('"fecha" is a field required');
    this.#fecha = fecha;
  }
}

module.exports = Chat;
