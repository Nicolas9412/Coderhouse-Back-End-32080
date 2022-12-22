import React, { useState, useEffect } from "react";

const Modal = ({
  setModal,
  selectedProduct,
  setSelectedProduct,
  getProducts,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setTitle(selectedProduct.title);
      setPrice(selectedProduct.price);
      setThumbnail(selectedProduct.thumbnail);
    }
  }, []);

  const onHandleSaveProduct = (event) => {
    event.preventDefault();
    selectedProduct
      ? fetch(`http://localhost:8080/api/products/${selectedProduct?.uuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: selectedProduct?.uuid,
            title,
            price: parseInt(price),
            thumbnail,
          }),
        })
      : fetch("http://localhost:8080/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, price: parseInt(price), thumbnail }),
        });
    limpiarCampos();
    getProducts();
  };

  const limpiarCampos = () => {
    setTitle("");
    setPrice(0);
    setThumbnail("");
    setModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="backshadow">
      <div className="custom-modal">
        <div className="delete-icon" onClick={limpiarCampos}>
          x
        </div>
        <form
          className="form-group d-flex flex-column justify-content-center align-items-center"
          onSubmit={onHandleSaveProduct}
        >
          <h2 className="text-center mt-5 mb-3">
            {selectedProduct ? "Actualizar producto" : "Añadir producto"}
          </h2>
          <div className="my-3 w-75">
            <label className="fw-bold mb-1">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="my-3 w-75">
            <label className="fw-bold mb-1">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter a price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="my-3 w-75">
            <label className="fw-bold mb-1">Thumbnail</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a thumbnail"
              value={thumbnail}
              onChange={(event) => setThumbnail(event.target.value)}
            />
          </div>
          <div className="w-75 d-flex justify-content-end mt-3">
            <input
              type="button"
              className="btn btn-danger me-3"
              value="Cancelar"
              onClick={limpiarCampos}
            />
            <input
              type="submit"
              className="btn btn-primary"
              value={selectedProduct ? "Actualizar" : "Guardar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
