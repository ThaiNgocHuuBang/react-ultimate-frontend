import { Table, Popconfirm, message, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserDetail from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";
const UserTable = (props) => {
  const {
    dataUsers,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isDetailUserOpen, setIsDetailUserOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  const confirmDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "Xóa thành công",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Xóa thất bại",
        description: JSON.stringify(res.message),
      });
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    // setCurrent(extra.current);
    // setPageSize(extra.pageSize);
    // Nếu thay đổi trang: current
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
    console.log("checkkkk", pagination, filters, sorter, extra);
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setIsDetailUserOpen(true);
              setDataDetail(record);
            }}
            href="#"
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: 20 }}>
            <EditOutlined
              style={{ cursor: "pointer", color: "orange", fontSize: 20 }}
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
            />

            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                confirmDeleteUser(record._id);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red", fontSize: 20 }}
              />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <ViewUserDetail
        isDetailUserOpen={isDetailUserOpen}
        setIsDetailUserOpen={setIsDetailUserOpen}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};
export default UserTable;
