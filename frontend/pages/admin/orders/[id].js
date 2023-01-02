import styles from "./AdminIdOrder.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../../src/features/auth/authSlice";
import Layout from "../../../layouts/Layout";
import { ItemDetailOrder } from "../../../components";

const order = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    dispatch(autentication());
    if (!auth.user.isAdmin) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/ordenes/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          setOrder(result.data);
          if (result.data?.error) router.push("/login");
        })
        .catch(() => router.reload());
    }
  }, [id]);

  const onHandleDelete = () => {
    return null;
  };
  return (
    <>
      {auth.user.isAdmin && (
        <Layout auth={auth}>
          <div className={`${styles.orderLayout} container`}>
            <h1 className="fw-bold">Order</h1>
            <div className={styles.orderContainer}>
              {order?.products.length > 0 &&
                order?.products.map((item) => (
                  <ItemDetailOrder key={item._id} product={item} />
                ))}
              {order?.products.length > 0 && (
                <div className="w-50 d-flex justify-content-between align-items-center shadow-lg p-3 mb-4 bg-body-tertiary rounded">
                  <div>
                    <p className="d-inline-block fs-5 fw-semibold mx-3">
                      Actions
                    </p>
                    <button className="btn btn-danger">Remover</button>
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => null}
                    >
                      Finalizar
                    </button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center me-5 ">
                    <p className="fs-3 fw-bolder">
                      Total{" $"}
                      {order?.products
                        .map((item) => item.price * item.quantity)
                        .reduce((acc, current) => acc + current, 0)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default order;
