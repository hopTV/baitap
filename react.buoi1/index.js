const root = document.getElementById("root");
const SORT = {
  NO: 0,
  UP: 1,
  DOWN: 2,
};
const Member = (props) => {
  const { name, age, handleTranfer, renderExtend, handleEdit, handleDelete } =
    props;
  return (
    <div>
      <span>name: {name}</span> -<span>age: {age}</span>
      <button onClick={() => handleTranfer()}>tranfer</button>
      <button onClick={() => handleEdit()}>edit</button>
      <button onClick={() => handleDelete()}>delete</button>
      {renderExtend && renderExtend()}
    </div>
  );
};
const INIT_DATA = {
  name: "",
  age: "",
  classType: "react",
};

const CountContext = React.createContext();

const App = () => {
  const { count, increaseCount } = useCount();
  return (
    <CountContext.Provider
      value={{
        count,
        increaseCount,
      }}
    >
      <TranferMember></TranferMember>
    </CountContext.Provider>
  );
};
const TranferMember = () => {
  const [reactMembers, setReactMember] = React.useState(() => {
    const members = JSON.parse(localStorage.getItem("members"));
    console.log(members);
    if (!members || !members.reactMembers) {
      return [];
    }
    return members.reactMembers;
  });
  const context = React.useContext(CountContext);
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
    if (formData.isEdit) {
      const { orginClassType, index } = formData;
      if (orginClassType !== formData.classType) {
        if (formData.classType === "react") {
          javaMembers.splice(index, 1);
          setJavaMember([...javaMembers]);
          reactMembers.push(formData);
          setReactMember([...reactMembers]);
        } else {
          reactMembers.splice(index, 1);
          setReactMember([...reactMembers]);
          javaMembers.push(formData);
          setJavaMember([...javaMembers]);
        }
      } else {
        if (formData.classType === "react") {
          reactMembers[index] = formData;
          setReactMember([...reactMembers]);
        } else {
          javaMembers[index] = formData;
          setJavaMember([...javaMembers]);
        }
      }
    } else {
      if (formData.classType === "react") {
        reactMembers.push(formData);
        setReactMember([...reactMembers]);
      } else {
        javaMembers.push(formData);
        setJavaMember([...javaMembers]);
      }
    }
    setFormData(INIT_DATA);
  };
  const [searchName, setSearchName] = React.useState("");
  const [sortAge, setSortAge] = React.useState(SORT.NO);

  const getUsers = (list) => {
    console.log("getting users from: ", list);
    let res = [...list];
    if (searchName) {
      res = res.filter((el) => el.name.includes(searchName));
    }
    if (sortAge !== SORT.NO) {
      res.sort((a, b) => {
        if (sortAge === SORT.UP) {
          return parseInt(a.age) - parseInt(b.age);
        }
        if (sortAge === SORT.DOWN) {
          return parseInt(b.age) - parseInt(a.age);
        }
      });
    }
    return res;
  };
  const reactMemberToRender = React.useMemo(
    () => getUsers(reactMembers),
    [reactMembers, sortAge]
  );
  const javaMemberToRender = React.useMemo(
    () => getUsers(javaMembers),
    [javaMembers, sortAge]
  );

  const getSortText = () => {
    if (sortAge === SORT.NO) {
      return "no";
    }
    if (sortAge === SORT.UP) {
      return "up";
    }
    return "down";
  };

  const getSortTextCallback = React.useCallback(() => getSortText(), [sortAge]);

  const handleSort = () => {
    if (sortAge === SORT.DOWN) {
      setSortAge(SORT.NO);
    } else if (sortAge === SORT.NO) {
      setSortAge(SORT.UP);
    } else {
      setSortAge(SORT.DOWN);
    }
  };
  const onEditReactMember = (index) => {
    setFormData({
      ...reactMembers[index],
      isEdit: true,
      index: index,
      orginClassType: reactMembers[index].classType,
    });
    inputNameRef.current.focus();
  };
  const onEditJavaMember = (index) => {
    setFormData({
      ...javaMembers[index],
      isEdit: true,
      index: index,
      orginClassType: javaMembers[index].classType,
    });
    inputNameRef.current.focus();

    context.increaseCount();
  };

  let inputNameRef = React.useRef();
  let testRef = React.useRef();
  const SortTitle = (props) => {
    React.useEffect(() => {
      console.log("fire by getSorttext");
    }, [props.getSortText]);
    return <React.Fragment>sort: {props.getSortText()}</React.Fragment>;
  };

  const members = JSON.parse(localStorage.getItem("members"));
  console.log("check", members);

  const handleDeleteMember = (name) => {
    let newData = JSON.parse(localStorage.getItem("members"));

    newData = localStorage.removeItem("members" === name);
  };

  return (
    <div>
      <h1>list member of React class</h1>
      search name:{" "}
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      ></input>
      <br />
      <button onClick={() => handleSort()}>
        <SortTitle getSortText={getSortTextCallback} />
      </button>
      {reactMembers.length > 0
        ? reactMemberToRender.map((user, index) => {
            return (
              <Member
                name={user.name}
                age={user.age}
                key={index}
                handleTranfer={() => tranferReactToJavaMember(index)}
                handleEdit={() => onEditReactMember(index)}
                handleDelete={() => handleDeleteMember(user.name)}
                //   renderExtend={() => <span>hello by react</span>
              />
            );
          })
        : "empty class"}
      <h1>list member of Java class</h1>
      {javaMembers.length > 0
        ? javaMemberToRender.map((user, index) => {
            return (
              <Member
                name={user.name}
                age={user.age}
                key={index}
                handleTranfer={() => tranferJavaToReactMember(index)}
                handleEdit={() => onEditJavaMember(index)}
                handleDelete={() => handleDeleteMember(user.name)}

                //   renderExtend={() => <span>hello by java</span>}/>
              />
            );
          })
        : "empty class"}
      <h1>{formData.isEdit ? "edit" : "add"} member</h1>
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
          ref={inputNameRef}
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
        <button type="button" onClick={() => setFormData(INIT_DATA)}>
          cancel
        </button>
      </form>
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
