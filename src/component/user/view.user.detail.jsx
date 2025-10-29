import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUploadFile,
  updateUseAvatarAPI,
} from "../../services/api.service";

const ViewUserDetail = (props) => {
  const {
    isDetailUserOpen,
    setIsDetailUserOpen,
    dataDetail,
    setDataDetail,
    loadUser,
  } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPreview(null);
      setSelectedFile(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple

    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  // console.log("check", preview);
  // console.log("show props", isDetailUserOpen, setIsDetailUserOpen);
  const handleUpdateUserAvatar = async () => {
    // steep 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      // success
      const newAvatar = resUpload.data.fileUploaded;
      // steep 2: update user
      const resUpdateAvatar = await updateUseAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone
      );
      if (resUpdateAvatar.data) {
        setIsDetailUserOpen(false);
        setPreview(null);
        setSelectedFile(null);
        await loadUser();
        notification.success({
          message: "Update avatar user",
          description: "Cập nhật avatar thành công",
        });
      } else {
        notification.error({
          message: "Error update avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
      console.log("check>>>>", newAvatar);
    } else {
      // failed
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
    console.log("resUpload".resUpload);
  };
  return (
    <>
      <Drawer
        width={"25vw"}
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => {
          setDataDetail({});
          setIsDetailUserOpen(false);
        }}
        open={isDetailUserOpen}
      >
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: 30 }}>Id:</h4>
          <p>{dataDetail._id}</p>
        </div>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: 30 }}>Name:</h4>
          <p>{dataDetail.fullName}</p>
        </div>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: 30 }}>email:</h4>
          <p>{dataDetail.email}</p>
        </div>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: 30 }}>Phone:</h4>
          <p>{dataDetail.phone}</p>
        </div>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: 30 }}>Avatar:</h4>
          <img
            style={{ width: 200, height: 200 }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              dataDetail.avatar
            }`}
            alt=""
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <label
            htmlFor="btnUpload"
            style={{
              padding: 10,
              background: "green",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Upload Avatar
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            onChange={(event) => {
              handleOnChangeFile(event);
            }}
          />
        </div>
        {preview && (
          <>
            <div style={{ marginTop: 20, border: "none" }}>
              <img style={{ width: 200, height: 200 }} src={preview} alt="" />
            </div>
            <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
              Save
            </Button>
          </>
        )}
      </Drawer>
    </>
  );
};
export default ViewUserDetail;
