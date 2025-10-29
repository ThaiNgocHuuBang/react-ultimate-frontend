import "./todo.css";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import todoLogo from "../../assets/react.svg";
import { useState } from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Watching TV" },
    // { id: 2, name: "Play game" },
  ]);

  const name = "Bang";
  const age = 20;
  const data = {
    address: "BinhDinh",
    country: " Vietnam",
  };

  const addNewTodo = (name) => {
    // alert(`name: ${name}`);
    const newTodo = {
      id: randomIntFromInterval(1, 10000000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const deleteData = (id) => {
    console.log("check id delete", id);
    const newTodo = todoList.filter((item) => item.id !== id);
    setTodoList(newTodo);
  };
  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew addNewTodo={addNewTodo} />

      {todoList.length > 0 ? (
        <TodoData
          name={name}
          age={age}
          data={data}
          todoList={todoList}
          deleteData={deleteData}
        />
      ) : (
        <div className="todo-img">
          <img src={todoLogo} alt="" />
        </div>
      )}
    </div>
  );
};
export default TodoApp;
