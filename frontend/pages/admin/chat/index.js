import styles from "./AdminChatList.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autentication } from "../../../src/features/auth/authSlice";
import Layout from "../../../layouts/Layout";
import { faker } from "@faker-js/faker";
import { getLastMessages } from "../../../src/features/chat/chatSlice";
import { formatDate } from "../../../src/utils/formatDate";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const lastMessages = useSelector((state) => state.chat.lastMessages);
  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(autentication());
    dispatch(getLastMessages());

    /*if (!auth.user.isAdmin) {
      router.push("/login");
    }*/
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/users", { credentials: "include" })
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.error) router.push("/login");
        setUsers(result.data);
      });
  }, []);
  return (
    <>
      {auth.user.isAdmin && (
        <Layout auth={auth}>
          <div className={`${styles.chatLayout} container`}>
            <h1>Chat Admin</h1>
            {users.map((item) => (
              <div
                className="w-50 d-flex border border-primary p-3 position-relative"
                key={item._id}
                onClick={() => router.push(`/admin/chat/${item._id}`)}
              >
                <img
                  src={faker.internet.avatar()}
                  className={`${styles.imgChat}`}
                />
                <div className="d-flex flex-column justify-content-center ms-3">
                  <span className="text-primary fw-bold mb-1">
                    {item.fullname}
                  </span>
                  <span className="text-muted ms-2">
                    {lastMessages.find((msg) => msg.email == item.email)
                      ?.type == "sistema" ? (
                      lastMessages.find((msg) => msg.email == item.email)
                        ?.read ? (
                        <i class="bi bi-check2-all me-1"></i>
                      ) : (
                        <i class="bi bi-check2 me-1"></i>
                      )
                    ) : null}
                    {lastMessages.find((msg) => msg.email == item.email)?.body}
                  </span>
                </div>
                <span className={`${styles.datetime} text-muted ms-2`}>
                  {lastMessages.find((msg) => msg.email == item.email)
                    ?.datetime &&
                    formatDate(
                      new Date(
                        lastMessages.find(
                          (msg) => msg.email == item.email
                        )?.datetime
                      )
                    )}
                </span>
              </div>
            ))}
          </div>
        </Layout>
      )}
    </>
  );
};

export default index;
