import Link from "next/link";
import styles from "./Layout.module.css";
import Image from "next/Image";
import { useRouter } from "next/router";
import { CartBadge } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/features/auth/authSlice";
import { getCart } from "../src/features/cart/cartSlice";
import { useEffect } from "react";

const Layout = ({ children, auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);
  useEffect(() => {
    dispatch(getCart({ email: auth?.user?.email }));
  }, [cart]);

  const onHandleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      router.push("/login");
    }, 250);
  };

  let menu = null;

  if (!auth?.auth) {
    menu = (
      <>
        <li className="nav-item">
          <Link className="nav-link" href={"/login"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/register"}>
            Register
          </Link>
        </li>
      </>
    );
  } else {
    menu = (
      <>
        <li className="nav-item">
          <a className="nav-link" onClick={onHandleLogout}>
            Logout
          </a>
        </li>
        {cart.length > 0 && (
          <li className="nav-item">
            <Link className="nav-link" href={"/cart"}>
              <CartBadge cart={cart} />
            </Link>
          </li>
        )}
      </>
    );
  }

  if (auth?.user.isAdmin) {
    menu = (
      <>
        <li className="nav-item">
          <a className="nav-link" onClick={onHandleLogout}>
            Logout
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/admin/products"}>
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/admin/orders"}>
            Orders
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Image
            className="me-2"
            src={"/shopping-bag.png"}
            width={32}
            height={32}
            alt="shopping-bag"
          />
          <Link className="navbar-brand" href="/">
            Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              {menu}
            </ul>
          </div>
        </div>
      </nav>
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;
