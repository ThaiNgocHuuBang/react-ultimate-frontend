import { Input, Modal, InputNumber, Select, notification, Form } from "antd";
import { useState, useEffect } from "react";
import { updateBookAPI, handleUploadFile } from "../../services/api.service";
const UpdateBook = (props) => {
  const {
    isOpenUpdateBook,
    setIsOpenUpdateBook,
    dataUpdateBook,
    setDataUpdateBook,
    loadBook,
  } = props;
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdateBook && dataUpdateBook._id) {
      form.setFieldsValue({
        mainText: dataUpdateBook.mainText,
        author: dataUpdateBook.author,
        price: dataUpdateBook.price,
        quantity: dataUpdateBook.quantity,
        category: dataUpdateBook.category,
      });
      //   console.log(typeof (dataUpdateBook.price, dataUpdateBook.quantity));
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdateBook.thumbnail
        }`
      );
    }
  }, [dataUpdateBook]);

  const onFinish = (values) => {
    handleBtnSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const resetAndCloseModal = () => {
    setIsOpenUpdateBook(false);
    // form.resetFields();
    // setSelectedFile(null);
    // setPreview(null);
  };
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
  const handleBtnSubmit = async (values) => {
    //không có ảnh preview + không có file => return
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh",
      });
      return;
    }
    //có ảnh preview và không có file => không upload file
    if (preview && !selectedFile) {
      const { mainText, author, price, quantity, category } = values;
      const newThumBnail = preview;
      const res = await updateBookAPI(
        dataUpdateBook._id,
        newThumBnail,
        mainText,
        author,
        price,
        quantity,
        category
      );
      console.log("check", res);
      if (res.data) {
        resetAndCloseModal();
        await loadBook();
        notification.success({
          message: "Update book successfully",
          description: "Cập nhật sách thành công",
        });
      } else {
        console.log("lỗi");
        notification.error({
          message: "Update book failed",
          description: JSON.stringify(res.message),
        });
      }
    } else {
      // step 1 : upload ảnh
      const resUploadImg = await handleUploadFile(selectedFile, "book");
      if (resUploadImg.data) {
        //success
        const newThumBnail = resUploadImg.data.fileUploaded;
        const { mainText, author, price, quantity, category } = values;
        //   create book
        const res = await updateBookAPI(
          dataUpdateBook._id,
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
            message: "Update book successfully",
            description: "Cập nhật sách thành công",
          });
        } else {
          notification.error({
            message: "Update book failed",
            description: JSON.stringify(res.message),
          });
        }
      } else {
        notification.error({
          message: "Update book failed",
          description: JSON.stringify(resUploadImg.message),
        });
      }
    }
  };
  return (
    <>
      <Modal
        title="Create Book Control"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpenUpdateBook}
        onOk={() => form.submit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[{ required: true, message: "Please input your mainText!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Please input your author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <InputNumber
              min={1}
              max={100000}
              style={{ width: "100%" }}
              addonAfter="đ"
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <InputNumber min={1} max={1000} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            name="category"
            rules={[{ required: true, message: "Please input your author!" }]}
          >
            <Select
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
          </Form.Item>
          <Form.Item>
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
                style={{ display: "none" }}
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
                  <img
                    style={{ width: 200, height: 200 }}
                    src={preview}
                    alt=""
                  />
                </div>
              </>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateBook;
