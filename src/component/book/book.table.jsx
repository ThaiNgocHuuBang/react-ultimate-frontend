import { Button, Table, Popconfirm, message, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";
import { useState } from "react";
import BookForm from "./create.book.control";
import BookFormUnControl from "./create.book.uncontrol";
import UpdateBook from "./update.book";
import { deleteBookAPI } from "../../services/api.service";
const BookTable = (props) => {
  const {
    dataBook,
    setDataBook,
    current,
    pageSize,
    setCurrent,
    setPageSize,
    total,
    loadBook,
    loadingTable,
  } = props;
  const [isOpenDetailBook, setIsOpenDetailBook] = useState(false);
  const [isOpenUpdateBook, setIsOpenUpdateBook] = useState(false);
  const [dataUpdateBook, setDataUpdateBook] = useState({});
  const [isOpenDetailBookUnControl, setIsModalFormCreateOpenUnControl] =
    useState(false);
  const [dataDetailBook, setDataDetailBook] = useState({});
  const [isModalFormCreateOpen, setIsModalFormCreateOpen] = useState(false);
  //   console.log(current, pageSize, setCurrent, setPageSize, total);
  // console.log(dataBook);
  //loading table

  // delete book
  const confirmDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "Xóa thành công",
      });
      await loadBook();
    } else {
      notification.error({
        message: "Xóa thất bại",
        description: JSON.stringify(res.message),
      });
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const onChange = (pagination) => {
    // console.log("check", pagination);
    // setCurrent(pagination.current);
    // setPageSize(pagination.pageSize);
    if (pagination && pagination.current) {
      if (pagination.current !== current) {
        setCurrent(+pagination.current); //"5" => 5
      }
    }
    // Nếu thay đổi pageSize
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== pageSize) {
        setPageSize(+pagination.pageSize); //"5" => 5
      }
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <a
          onClick={() => {
            setIsOpenDetailBook(true);
            setDataDetailBook(record);
          }}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 20 }}>
          <EditOutlined
            onClick={() => {
              setIsOpenUpdateBook(true), setDataUpdateBook(record);
            }}
            style={{ cursor: "pointer", color: "orange", fontSize: 20 }}
          ></EditOutlined>

          <Popconfirm
            title="Delete the book"
            description="Are you sure to delete this task?"
            onConfirm={() => confirmDeleteBook(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red", fontSize: 20 }}
            ></DeleteOutlined>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalFormCreateOpen(true)}
        style={{ marginRight: 20, marginTop: 20 }}
      >
        Create Book Control
      </Button>
      <Button
        type="primary"
        onClick={() => setIsModalFormCreateOpenUnControl(true)}
      >
        Create Book UnControl
      </Button>
      <BookForm
        isModalFormCreateOpen={isModalFormCreateOpen}
        setIsModalFormCreateOpen={setIsModalFormCreateOpen}
        loadBook={loadBook}
      ></BookForm>
      <BookFormUnControl
        isOpenDetailBookUnControl={isOpenDetailBookUnControl}
        setIsModalFormCreateOpenUnControl={setIsModalFormCreateOpenUnControl}
        loadBook={loadBook}
      ></BookFormUnControl>
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={dataBook}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          loading: { loadingTable },
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <ViewBookDetail
        isOpenDetailBook={isOpenDetailBook}
        setIsOpenDetailBook={setIsOpenDetailBook}
        dataDetailBook={dataDetailBook}
        setDataDetailBook={setIsOpenDetailBook}
      ></ViewBookDetail>
      <UpdateBook
        isOpenUpdateBook={isOpenUpdateBook}
        setIsOpenUpdateBook={setIsOpenUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setDataUpdateBook={setDataUpdateBook}
        loadBook={loadBook}
      ></UpdateBook>
    </>
  );
};
export default BookTable;
