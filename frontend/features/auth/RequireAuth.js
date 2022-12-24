import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const router = useRouter();
  return token ? <Outlet /> : router.asPath("/login");
};

export default RequireAuth;
