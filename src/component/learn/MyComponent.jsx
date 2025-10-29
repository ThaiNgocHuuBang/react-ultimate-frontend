import "./style.css";
const MyComponent = () => {
  //   const myText = "Hello Bruyden";

  //   const myText = 1;
  //   const myText = Boolean;
  //   const myText = undefined;
  //   const myText = null;
  const myText = [1, 2, 3];
  return (
    <>
      <div style={{ color: "green" }}>MyComponent</div>
      <div className="bruyden">{myText}</div>
      <div>{JSON.stringify(myText)}</div>
      <div>{console.log("hello")}</div>
    </>
  );
};

export default MyComponent;
