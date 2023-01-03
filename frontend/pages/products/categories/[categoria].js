import { useRouter } from "next/router";
import { BootCard } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { autentication } from "../../../src/features/auth/authSlice";
import Layout from "../../../layouts/Layout";
import styles from "./Categoria.module.css";

const index = () => {
  const router = useRouter();
  const { categoria } = router.query;
  const [products, setProducts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autentication());
  }, [dispatch]);

  if (auth.error) {
    router.push("/login");
  }

  useEffect(() => {
    if (categoria) {
      fetch(`http://localhost:8080/productos/categoria/${categoria}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data?.error) return router.push("/login");
          setProducts(result.data);
        })
        .catch(() => router.reload());
    }
  }, [categoria]);

  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className={styles.listContainer}>
            <h1 className={`${styles.title} mb-4 pb-3`}>List's {categoria}</h1>
            <div className="d-flex gap-5 px-5">
              {products.map((item) => (
                <BootCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
