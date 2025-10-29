import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "../src/component/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading === true ? (
        <Spin></Spin>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
