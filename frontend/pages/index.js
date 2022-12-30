import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/user", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(`Hi ${data.fullname}`);
        setAuth(true);
        if (data.data?.error) {
          setMessage(`You are not logged in`);
          setAuth(false);
        }
      });
  }, []);

  return <Layout auth={auth}>{message}</Layout>;
}
