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
      <div>
        <h1>Autogestion de productos</h1>
        <button onClick={() => setModal(true)}>Añadir producto</button>
      </div>
      {modal && (
        <Modal
          setModal={setModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          getProducts={getProducts}
        />
      )}
      {products.map((element) => (
        <div key={element.id}>
          <p>{element.title}</p>
          <p>{element.price}</p>
          <img src={element.thumbnail} alt={element.title} />
          <button
            onClick={() => {
              onHandleDeleteProduct(element.id);
            }}
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              setModal(true);
              setSelectedProduct(element);
            }}
          >
            Actualizar
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
