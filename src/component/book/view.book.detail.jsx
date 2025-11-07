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
        width={"30vw"}
        title={
          <span style={{ fontWeight: "600", fontSize: "18px" }}>
            Book Details
          </span>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setIsOpenDetailBook(false)}
        open={isOpenDetailBook}
        styles={{
          body: { background: "#f9fafc", padding: "20px 30px" },
          header: { borderBottom: "1px solid #eee" },
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>ID:</h4>
          <p style={{ margin: 0, color: "#666", wordBreak: "break-all" }}>
            {dataDetailBook._id}
          </p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Tiêu đề:</h4>
          <p style={{ margin: 0, color: "#222", fontWeight: "500" }}>
            {dataDetailBook.mainText}
          </p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Tác giả:</h4>
          <p style={{ margin: 0, color: "#333" }}>{dataDetailBook.author}</p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Thể loại:</h4>
          <p style={{ margin: 0, color: "#555" }}>{dataDetailBook.category}</p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Giá tiền:</h4>
          <p style={{ margin: 0, color: "#007bff", fontWeight: 500 }}>
            {dataDetailBook.price &&
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataDetailBook.price)}
          </p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Số lượng:</h4>
          <p style={{ margin: 0, color: "#555" }}>{dataDetailBook.quantity}</p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ marginBottom: 4, color: "#444" }}>Đã bán:</h4>
          <p style={{ margin: 0, color: "#555" }}>{dataDetailBook.sold}</p>
        </div>

        <div style={{ marginTop: 10 }}>
          <h4 style={{ marginBottom: 6, color: "#444" }}>Ảnh bìa:</h4>
          <img
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
              dataDetailBook.thumbnail
            }`}
            alt="thumbnail"
          />
        </div>
      </Drawer>
    </>
  );
};
export default ViewBookDetail;
