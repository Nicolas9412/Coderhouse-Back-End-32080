import "./App.css";
import { useEffect, useState } from "react";
import { Modal } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = () => {
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query{
          getProducts{
            id,
            title,
            price,
            thumbnail
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProducts(result.data.getProducts);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onHandleDeleteProduct = (id) => {
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        mutation{
          deleteProduct(id:"${id}"){
            id
          }
        }
        `,
      }),
    });
    getProducts();
  };

  return (
    <>
      <h1 className="text-center my-3">Autogestion de productos</h1>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary" onClick={() => setModal(true)}>
          Añadir producto
        </button>
      </div>
      <div className="row">
        {modal && (
          <Modal
            setModal={setModal}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            getProducts={getProducts}
          />
        )}
        {products.map((element) => (
          <div className="card col-2 m-3" key={element.id}>
            <img
              className="thumbnail m-auto"
              src={element.thumbnail}
              alt={element.title}
            />
            <div className="card-body">
              <h5 className="card-title fs-4">{element.title}</h5>
              <p className="card-text fw-bold fs-4">${element.price}</p>
              <button
                className="btn btn-success me-2"
                onClick={() => {
                  setModal(true);
                  setSelectedProduct(element);
                }}
              >
                Actualizar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onHandleDeleteProduct(element.id);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
