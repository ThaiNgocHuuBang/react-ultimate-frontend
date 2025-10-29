import { useState, useEffect } from "react";
import BookTable from "../component/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
  const [dataBook, setDataBook] = useState();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);

  const loadBook = async () => {
    setLoadingTable(true);
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
    setLoadingTable(false);
  };

  useEffect(() => {
    loadBook();
    // console.log("useEffect");
  }, [current, pageSize]);
  // console.log("render");
  return (
    <BookTable
      dataBook={dataBook}
      setDataBook={setDataBook}
      current={current}
      pageSize={pageSize}
      total={total}
      setCurrent={setCurrent}
      setPageSize={setPageSize}
      loadBook={loadBook}
      loadingTable={loadingTable}
      setLoadingTable={setLoadingTable}
    ></BookTable>
  );
};
export default BookPage;
