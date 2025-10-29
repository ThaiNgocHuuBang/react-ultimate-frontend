import { useState } from "react";
import { Button, Drawer } from "antd";
const ViewBookDetail = (props) => {
  const {
    isOpenDetailBook,
    setIsOpenDetailBook,
    dataDetailBook,
    setDataDetailBook,
  } = props;

  //   console.log(dataDetailBook);
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setIsOpenDetailBook(false)}
        open={isOpenDetailBook}
      >
        <p>Id: {dataDetailBook._id}</p>
        <br />
        <p>Tiêu đề: {dataDetailBook.mainText}</p>
        <br />
        <p>Tác giả: {dataDetailBook.author}</p>
        <br />
        <p>Thể loại: {dataDetailBook.category}</p>
        <br />
        <p>
          Giá tiền:{" "}
          {dataDetailBook.price &&
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dataDetailBook.price)}
        </p>
        <br />
        <p>Số lượng: {dataDetailBook.quantity}</p>
        <br />
        <p>Đã bán: {dataDetailBook.sold}</p>
        <br />
        <img
          style={{ width: 200, height: 200 }}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataDetailBook.thumbnail
          }`}
          alt=""
        />
      </Drawer>
    </>
  );
};
export default ViewBookDetail;
