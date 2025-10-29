const TodoData = (prpos) => {
  // const { name, age, data } = prpos;
  const { todoList, deleteData } = prpos;
  console.log("check todolist", todoList);

  const handleClick = (id) => {
    deleteData(id);
  };
  return (
    <div className="todo-data">
      {/* <div>Learning Code</div>
      <div>Learning English 111</div> */}
      {todoList.map((item, index) => {
        console.log("check", item, index);
        return (
          <div className="totoItem" key={item.id}>
            <div>{item.name}</div>
            <button onClick={() => handleClick(item.id)}>Delete</button>
          </div>
        );
      })}
      {/* <div>{JSON.stringify(prpos.todoList)}</div> */}

      {/* <div>{name}</div>
      <div>{age}</div>
      <div>{data.address}</div> */}
    </div>
  );
};
export default TodoData;
