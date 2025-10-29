import UserTable from "../component/user/user.table";
import UserForm from "../component/user/user.form";
import { fetchALLUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    const res = await fetchALLUserAPI(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  // console.log("check =>>> ", pageSize);
  return (
    <div>
      <UserForm loadUser={loadUser} />
      <UserTable
        dataUsers={dataUsers}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};
export default UsersPage;
