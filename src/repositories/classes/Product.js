class Product {
  #_id;
  #title;
  #price;
  #thumbnail;

  constructor({ _id, title, price, thumbnail }) {
    this._id = _id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  get _id() {
    return this.#_id;
  }

  set _id(_id) {
    if (!_id) throw new Error('"id" is a field required');
    this.#_id = _id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (!title) throw new Error('"title" is a field required');
    this.#title = title;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    if (!price) throw new Error('"price" is a field required');
    if (isNaN(price)) throw new Error('"price" must be number');
    if (price < 0) throw new Error('"price" must be positive');
    this.#price = price;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  set thumbnail(thumbnail) {
    if (!thumbnail) throw new Error('"thumbnail" is a field required');
    this.#thumbnail = thumbnail;
  }
}

module.exports = Product;
