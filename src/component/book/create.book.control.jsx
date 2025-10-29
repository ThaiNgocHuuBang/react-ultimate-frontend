import { Input, Modal, InputNumber, Select, notification } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
const BookForm = (props) => {
  const { isModalFormCreateOpen, setIsModalFormCreateOpen, loadBook } = props;
  //   dữ liệu
  const [mainText, setManText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
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
  const resetAndCloseModal = () => {
    setIsModalFormCreateOpen(false);
    setManText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setPreview(null);
  };
  const handleSubmitBtn = async () => {
    // check ảnh
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh",
      });
      return;
    }
    // step 1 : upload ảnh
    const resUploadImg = await handleUploadFile(selectedFile, "book");
    if (resUploadImg.data) {
      //success
      const newThumBnail = resUploadImg.data.fileUploaded;
      //   create book
      const res = await createBookAPI(
        newThumBnail,
        mainText,
        author,
        price,
        quantity,
        category
      );
      if (res.data) {
        resetAndCloseModal();
        await loadBook();
        notification.success({
          message: "Create book successfully",
          description: "Tạo sách thành công",
        });
        setIsModalFormCreateOpen(false);
      } else {
        notification.error({
          message: "Create book failed",
          description: JSON.stringify(res.message),
        });
      }
    } else {
      notification.error({
        message: "Create book failed",
        description: JSON.stringify(resUploadImg.message),
      });
    }
  };

  return (
    <>
      <Modal
        title="Create Book Control"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalFormCreateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
      >
        <div style={{ marginBottom: 10 }}>
          <p>Tiêu đề</p>
          <Input
            value={mainText}
            onChange={(event) => setManText(event.target.value)}
          ></Input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <p>Tác giả</p>
          <Input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          ></Input>
        </div>
        <div style={{ marginBottom: 10 }}>
          <p>Giá tiền</p>
          <InputNumber
            value={price}
            onChange={(event) => setPrice(event)}
            min={1}
            max={10}
            style={{ width: "100%" }}
            addonAfter="đ"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <p>Số lượng</p>
          <InputNumber
            value={quantity}
            onChange={(event) => setQuantity(event)}
            min={1}
            max={10}
            style={{ width: "100%" }}
          />{" "}
        </div>
        <div style={{ marginBottom: 10 }}>
          <p>Thể loại</p>
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: "100%" }}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
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
            Upload
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            onChange={(event) => {
              handleOnChangeFile(event);
            }}
            onClick={(event) => (event.target.value = null)}
          />
        </div>
        {preview && (
          <>
            <div style={{ marginTop: 20, border: "none" }}>
              <img style={{ width: 200, height: 200 }} src={preview} alt="" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default BookForm;
