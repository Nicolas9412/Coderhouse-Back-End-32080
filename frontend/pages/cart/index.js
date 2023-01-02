import styles from "./Cart.module.css";
import Layout from "../../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../src/features/auth/authSlice";
import { getCart, removeProduct } from "../../src/features/cart/cartSlice";
import { useEffect } from "react";
import { ItemCart } from "../../components";
import { useRouter } from "next/router";

const index = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(autentication());
    if (!auth.auth) {
      router.push("/login");
    }
  }, []);

  const onHandleDelete = (idProduct, email) => {
    dispatch(removeProduct({ idProduct, email }));
    dispatch(getCart({ email }));
  };

  const onHandleGenerateOrder = async () => {
    await fetch("http://localhost:8080/ordenes/generar", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cart.email,
      }),
    });
    router.reload();
  };

  let content = null;
  if (auth.auth) {
    if (!cart.email) {
      dispatch(getCart({ email: auth.user.email }));
    }
    content = (
      <Layout auth={auth}>
        <div className={styles.cartContainer}>
          {cart.products.length > 0 &&
            cart.products.map((item) => (
              <ItemCart
                key={item._id}
                product={item}
                cart={cart}
                onHandleDelete={onHandleDelete}
              />
            ))}
          {cart.products.length > 0 && (
            <div className="w-50 d-flex justify-content-between align-items-center shadow-lg p-3 mb-4 bg-body-tertiary rounded">
              <div>
                <p className="d-inline-block fs-5 fw-semibold mx-3">Actions</p>
                <button className="btn btn-danger">Vaciar carrito</button>
                <button
                  className="btn btn-success ms-3"
                  onClick={onHandleGenerateOrder}
                >
                  Generar orden
                </button>
              </div>
              <div className="d-flex justify-content-center align-items-center me-5 ">
                <p className="fs-3 fw-bolder">
                  Total{" $"}
                  {cart.products
                    .map((item) => item.price * item.quantity)
                    .reduce((acc, current) => acc + current, 0)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
  return <>{content && content}</>;
};

export default index;
