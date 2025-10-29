import { useContext } from "react";
import { AuthContext } from "../component/context/auth.context";
import { Navigate, Link } from "react-router-dom";
import { Button, Result } from "antd";
const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    return <> {props.children}</>;
  }
  return (
    <Result
      status="403"
      title="Unauthorize"
      subTitle={"Bạn cần đăng nhập để truy cập tài nguyên"}
      extra={
        <Button type="primary">
          {" "}
          <Link to="/">go to home page</Link>
        </Button>
      }
    />
  );
  //   return <Navigate to="/login"></Navigate>;
};
export default PrivateRoute;
