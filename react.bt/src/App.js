// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Member from "./components/Member";
import EditFile from "./components/EditFile";
import List from "./components/List";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Switch>
            <Route path="/member">
              <Member />
            </Route>
            <Route path="/edit">
              <EditFile />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
