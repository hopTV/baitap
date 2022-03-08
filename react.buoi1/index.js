const root = document.getElementById("root");
console.log(">>> check root: ", root);

const Component = () => {
  const [users, setUsers] = React.useState([
    { id: 1, name: "Đinh Tuấn Name", age: "21", type: "react" },
    { id: 2, name: "Ngụy Minh Thắng", age: "20", type: "react" },
    { id: 3, name: "Nguyễn Anh Thư", age: "22", type: "react" },
    { id: 4, name: "Bế Trọng Hiếu", age: "22", type: "java" },
    { id: 5, name: "Ngô Huỳnh Đúc", age: "22", type: "java" },
    { id: 6, name: "Nguyễn Trọng Dũng", age: "22", type: "java" },
  ]);
  console.log(users);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");

  const handleClick = () => {};
  const handleAlert = () => {
    alert("empty");
  };
  const handleAddNew = () => {
    if (!name || !age) {
      alert("empty input !!");
      return;
    }
    let type = document.getElementById("box").value;
    console.log("check >>> type:", type);
    let id = Math.floor(Math.random() * 10);
    let newUser = { id: id, name: name, age: age, type: type };
    setUsers([...users, newUser]);
    setAge("");
    setName("");
  };
  const handleGetType = () => {
    let type = option.selectIndex.text;
    console.log("check type:", type);
  };

  return (
    <div>
      <div className="content">
        <h1>list member of react class </h1>
        {users && users.length > 0 ? (
          users.map((item) => {
            return (
              <div key={item.id}>
                <div style={{ margin: "10px 0px" }}>
                  name: {item.name} - {item.age}
                  <button
                    className="btn-tranfer"
                    style={{ margin: "0px 10px" }}
                    onClick={handleClick}
                  >
                    tranfer
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p onClick={handleAlert}>empty</p>
        )}
      </div>
      <div>
        name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
        Age:
        <input value={age} onChange={(e) => setAge(e.target.value)} />
        <span>
          <select id="box">
            <option value="react">react</option>
            <option value="java">java</option>
          </select>
        </span>
        <div>
          <button onClick={handleAddNew}>add new</button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <div>
    <Component />
  </div>,
  root
);
