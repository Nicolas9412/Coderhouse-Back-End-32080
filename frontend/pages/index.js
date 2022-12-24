import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";

export default function Home() {
  return <div>Home</div>;
}
