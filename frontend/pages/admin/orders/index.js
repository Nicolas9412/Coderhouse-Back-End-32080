import styles from "./AdminOrders.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../src/features/orders/ordersSlice";
import { autentication } from "../../../src/features/auth/authSlice";
import { useRouter } from "next/router";
import Layout from "../../../layouts/Layout";
import { ItemOrder } from "../../../components";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(autentication());
    if (!auth.user.isAdmin) {
      router.push("/login");
    }
    dispatch(getOrders());
  }, []);
  console.log(orders);
  return (
    <>
      {auth.user.isAdmin && (
        <Layout auth={auth}>
          <div className={`${styles.ordersLayout} container`}>
            <h1 className="fw-bold">Orders</h1>
            <div className={styles.ordersContainer}>
              {orders.map((item) => (
                <ItemOrder order={item} />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
