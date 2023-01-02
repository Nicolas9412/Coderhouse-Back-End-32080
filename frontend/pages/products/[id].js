import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { ProductDetail } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../src/features/auth/authSlice";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autentication());
    if (!auth.auth) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/productos/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          setProduct(result.data);
          if (result.data?.error) router.push("/login");
        })
        .catch(() => router.reload());
    }
  }, [id]);

  return (
    <>
      {auth.auth && (
        <Layout auth={auth}>
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            {product && <ProductDetail product={product} />}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Products;
