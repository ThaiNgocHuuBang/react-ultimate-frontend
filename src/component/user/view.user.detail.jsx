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
        width={"30vw"}
        title={
          <span style={{ fontWeight: "600", fontSize: "18px" }}>
            User Details
          </span>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={() => {
          setDataDetail({});
          setIsDetailUserOpen(false);
        }}
        open={isDetailUserOpen}
        styles={{
          body: { background: "#f9fafc", padding: "20px 30px" },
          header: { borderBottom: "1px solid #eee" },
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>ID:</h4>
          <p style={{ margin: 0, color: "#666", wordBreak: "break-all" }}>
            {dataDetail._id}
          </p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Name:</h4>
          <p style={{ margin: 0, color: "#222", fontWeight: "500" }}>
            {dataDetail.fullName}
          </p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Email:</h4>
          <p style={{ margin: 0, color: "#007bff" }}>{dataDetail.email}</p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Phone:</h4>
          <p style={{ margin: 0, color: "#555" }}>{dataDetail.phone}</p>
        </div>

        <div style={{ marginBottom: 15 }}>
          <h4 style={{ marginBottom: 6, color: "#444" }}>Avatar:</h4>
          <img
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              dataDetail.avatar
            }`}
            alt="avatar"
          />
        </div>

        {/* Upload button */}
        <div style={{ marginTop: 15 }}>
          <label
            htmlFor="btnUpload"
            style={{
              display: "inline-block",
              padding: "10px 18px",
              background: "#f5b301",
              color: "white",
              fontWeight: 600,
              borderRadius: 8,
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e09a00")}
            onMouseOut={(e) => (e.target.style.background = "#f5b301")}
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

        {/* Preview ảnh */}
        {preview && (
          <>
            <div
              style={{
                marginTop: 20,
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <img
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 10,
                  border: "2px dashed #ccc",
                }}
                src={preview}
                alt=""
              />
              <Button
                type="primary"
                onClick={() => handleUpdateUserAvatar()}
                style={{
                  background: "#4a6cf7",
                  borderRadius: 6,
                  border: "none",
                }}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
export default ViewUserDetail;
