import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <main className="App">
        <div className="container">
          <Switch>
            <Route path="/signup" exact={true}>
              <SignUp />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/" exact={true}>
              <Home />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
