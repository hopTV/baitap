const root = document.getElementById("root");
const Member = (props) => {
  const { name, age, handleTranfer, renderExtend } = props;
  return (
    <div>
      <span>name: {name}</span> -<span>age: {age}</span>
      <button onClick={() => handleTranfer()}>tranfer</button>
      {renderExtend && renderExtend()}
    </div>
  );
};
const INIT_DATA = {
  name: "",
  age: "",
  classType: "react",
};
// window.localStorage.clear();
const TranferMember = () => {
  const [input, setInput] = React.useState("");
  const [reactMembers, setReactMember] = React.useState(() => {
    const members = JSON.parse(localStorage.getItem("members"));
    // members = localStorage.removeItem(javaMembers);

    if (!members || !members.reactMembers) {
      return [];
    }
    return members.reactMembers;
  });
  // useState có thể nhận vào 1 function, giá trị mà function này return về sẽ dùng để khởi tạo state

  const [javaMembers, setJavaMember] = React.useState(() => {
    const members = JSON.parse(localStorage.getItem("members"));
    if (!members || !members.javaMembers) {
      return [];
    }
    return members.javaMembers;
  });

  const saveData = () => {
    localStorage.setItem(
      "members",
      JSON.stringify({
        javaMembers,
        reactMembers,
      })
    );
  };
  React.useEffect(() => {
    if (javaMembers.length === 0) {
      alert("WARNING: java class is empty now");
    } else if (reactMembers.length === 0) {
      alert("WARNING: react class is empty now");
    }
    saveData();
  }, [reactMembers.length, javaMembers.length]);
  // React.useEffect(() => {
  //     return () => {
  //         console.log("destroy")
  //         localStorage.setItem("members", JSON.stringify({
  //             javaMembers,
  //             reactMembers,
  //         }))
  //     }
  // }, [])

  const tranferReactToJavaMember = (index) => {
    const el = reactMembers[index];
    reactMembers.splice(index, 1);
    javaMembers.push(el);
    setReactMember([...reactMembers]);
    setJavaMember([...javaMembers]);
  };
  const tranferJavaToReactMember = (index) => {
    const el = javaMembers[index];
    javaMembers.splice(index, 1);
    reactMembers.push(el);
    setReactMember([...reactMembers]);
    setJavaMember([...javaMembers]);
  };
  const [formData, setFormData] = React.useState(INIT_DATA);
  const handleInput = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleSubmit = () => {
    if (formData.classType === "react") {
      reactMembers.push(formData);
      setReactMember([...reactMembers]);
    } else {
      javaMembers.push(formData);
      setJavaMember([...javaMembers]);
    }
    setFormData(INIT_DATA);
  };
  const getMember = JSON.parse(localStorage.getItem("members"));
  console.log(">>>check member: ", getMember);

  let joinMember = [...javaMembers, ...reactMembers];
  // console.log(">>> chek new name:", getName);

  const handeOnChangInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if (input.length > 0) {
    joinMember = joinMember.filter((i) => {
      return i.name.match(input);
    });
  }

  // const handleSearch = (i) => {
  //   // joinMember = joinMember.filter((i) => {
  //   //   return i.name.match(input);
  //   // });
  //   // return joinMember
  // };
  // console.log(">> search:", joinMember);

  const [sortAge, setSortAge] = React.useState(javaMembers);
  const handleSortByAge = () => {
    const sortBy = sortAge.sort((a, b) => {
      return b.age - a.age;
    });
    setSortAge(sortBy);
    console.log(">>> check sort:", sortBy);
  };

  return (
    <div>
      <h1>list member of React class</h1>
      {reactMembers.length > 0 && joinMember && sortAge
        ? reactMembers
            .filter((i) => {
              return i.name.match(input);
            })
            .map((user, index) => {
              return (
                <Member
                  name={user.name}
                  age={user.age}
                  key={index}
                  handleTranfer={() => tranferReactToJavaMember(index)}
                  //   renderExtend={() => <span>hello by react</span>
                />
              );
            })
        : "empty class"}
      <h1>list member of Java class</h1>
      {javaMembers.length > 0 && joinMember && sortAge
        ? javaMembers
            .filter((i) => {
              return i.name.match(input);
            })
            .map((user, index) => {
              return (
                <Member
                  name={user.name}
                  age={user.age}
                  key={index}
                  handleTranfer={() => tranferJavaToReactMember(index)}
                  //   renderExtend={() => <span>hello by java</span>}/>
                />
              );
            })
        : "empty class"}
      <h1>add member</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // e.preventDefault() dùng để bỏ qua sự kiện mặc định của event của 1 thẻ html nào đó như thẻ form, a
          handleSubmit();
        }}
        // action="/api"
        // method="post"
      >
        <label>name</label>
        <input
          name="name"
          value={formData.name}
          onChange={(e) => handleInput(e)}
        ></input>
        {" --- "}
        <label>age</label>
        <input
          value={formData.age}
          name="age"
          onChange={(e) => handleInput(e)}
        ></input>
        <select
          name="classType"
          onChange={(e) => handleInput(e)}
          value={formData.classType}
        >
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        <button>submit</button>
        {/* checkme<input type="checkbox" name="testCheckbox" /> */}
      </form>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          placeholder="search"
          value={input}
          onChange={(e) => handeOnChangInput(e)}
        />
        <button>search</button>
        <button onClick={handleSortByAge}>sort by</button>
      </div>
    </div>
  );
};
const Test = () => {
  const [off, setOff] = React.useState();
  return (
    <div>
      {!off && <TranferMember />}
      <button onClick={() => setOff(!off)}>change</button>
    </div>
  );
};

ReactDOM.render(
  <div>
    <TranferMember />
  </div>,
  root
);
