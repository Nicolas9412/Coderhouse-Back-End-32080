import React, { useState } from "react";
import styles from "./Register.module.css";
import Layout from "../../layouts/Layout";
import Image from "next/Image";
import { useRouter } from "next/router";
import { BootToast } from "../../components";

const index = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [content, setContent] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullname,
        phoneNumber,
        password,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data.error) {
          console.log(result.data.error);
          setContent(
            <BootToast title={result.status} message={result.data.error} />
          );
        } else {
          setContent(
            <BootToast title={result.data.status} message={"User created !"} />
          );
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      });
  };

  return (
    <>
      <Layout>
        {content}
        <form
          className={`${styles.formSize} shadow-lg p-5 mb-5 bg-body rounded`}
          onSubmit={submit}
        >
          <div className="d-flex justify-content-center mb-3">
            <Image src={"/form.png"} width={64} height={64} alt="register" />
          </div>
          <h2 className="text-center fs-1 fw-bold mb-4 text-dark">Register</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="fullname"
              value={fullname}
              className="form-control"
              placeholder="Enter your fullname"
              onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="floatingInput">Fullname</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              className="form-control"
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label htmlFor="floatingInput">Phone number</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50 fs-5 ">
              Register
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default index;
