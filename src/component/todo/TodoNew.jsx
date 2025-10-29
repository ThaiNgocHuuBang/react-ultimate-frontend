import { useState } from "react";

const TodoNew = (prpos) => {
  // console.log(prpos);
  const { addNewTodo } = prpos;

  // addNewTodo(`bang`);

  // useState hook(getter/setter)
  // const valueInput ="name"
  const [valueInput, setValueInput] = useState("Todo");
  const handleClick = () => {
    // alert("check valueInput", valueInput);
    // console.log("check valueInput", valueInput);
    addNewTodo(valueInput);
    setValueInput("");
  };
  // const handleChange = (event) => {
  //   console.log("onchange", event.target.value);
  // };
  const handleChange = (name) => {
    setValueInput(name);
  };
  return (
    <div className="todo-new">
      <input
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        placeholder="Enter your task"
        type="text"
        value={valueInput}
      />
      <button onClick={handleClick}>ADD</button>
      {/* <div>My name is:{valueInput}</div> */}
    </div>
  );
};
export default TodoNew;
