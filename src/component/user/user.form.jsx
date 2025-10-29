import { Input, Button, notification, Modal } from "antd";

import { useState } from "react";
import { createUserAPI } from "../../services/api.service";
const UseForm = (props) => {
  const { loadUser } = props;

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create user successfully",
        description: "Tao user thanh cong",
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Create user failed",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  // Render
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <h3>Table Users</h3>

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create User
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText="CREATE"
      >
        <div style={{ margin: 20 }}>
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Phone number</span>
            <Input
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UseForm;
