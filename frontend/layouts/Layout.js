import React from "react";
import Link from "next/link";
import styles from "./Layout.module.css";
import Image from "next/Image";
import { useRouter } from "next/router";
import { BootToast } from "../components";

const Layout = ({ children, auth }) => {
  const router = useRouter();

  const logout = async () => {
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    await router.push("/login");
  };

  let menu = null;

  if (!auth) {
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
      <li className="nav-item">
        <a className="nav-link" onClick={logout}>
          Logout
        </a>
      </li>
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
