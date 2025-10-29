import { Input, Button, Form, notification, message, Row, Col } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("check value", values);
    // call api values
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Register success",
        description: " Đăng ký user thành công!",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error register",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        {" "}
        <Col xs={24} md={8}>
          {" "}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        {" "}
        <Col xs={24} md={8}>
          {" "}
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        {" "}
        <Col xs={24} md={8}>
          {" "}
          <Button type="primary" onClick={() => form.submit()}>
            Register
          </Button>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <p>Đã có tài khoản ?</p>
          <Link to={"/login"}>Đăng nhập tại đây</Link>
        </Col>
      </Row>
      {/* <Button
          onClick={() => {
            form.setFieldsValue({
              email: "Test.@gmail.com",
              fullName: "Bruyden",
            });
            console.log("check form");
          }}
        >
          Test{" "}
        </Button> */}
    </Form>
  );
};
export default RegisterPage;
