import {
  Input,
  Button,
  Form,
  notification,
  message,
  Row,
  Col,
  Divider,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState, useContext } from "react";
import { AuthContext } from "../component/context/auth.context";
const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    // console.log("check value", values);
    // call api values
    const res = await loginAPI(values.email, values.password);
    if (res.data) {
      message.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error Login ",
        description: JSON.stringify(message.error),
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Row justify={"center"} style={{ marginTop: 20 }}>
        <Col xs={24} md={16} lg={8}>
          {" "}
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <legend>Đăng nhập</legend>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Định dạng email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                onKeyDown={(e) => {
                  if (e.key === "Enter") form.submit();
                }}
              />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={loading}
              >
                Login
              </Button>
              <Link to={"/"}>Go to homepage</Link>
            </div>
          </Form>
          <Divider></Divider>
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản ? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
