import { Menu, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserAddOutlined,
  BookOutlined,
  LoginOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ["users", "books"];
      const currentRoute = allRoutes.find(
        (item) => `/${item}` === location.pathname
      );
      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  const { user, setUser } = useContext(AuthContext);
  // console.log("checkkkkk", user);
  //  const data = useContext(AuthContext);
  // console.log("checkkkkk", data);

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      // clear data
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      console.log(user);
      message.success("Logout thành công!");
      //redirect to home
      navigate("/");
    }
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UserAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <BookOutlined />,
    },
    {
      label: <Link to={"/todoapp"}>Todo App</Link>,
      key: "todoapp",
      icon: <BookOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined></AliwangwangOutlined>,
            children: [
              {
                label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                key: "layout",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
