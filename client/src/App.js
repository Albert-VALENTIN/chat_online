import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { Chat } from './chat/Chat';

function App() {
  return (
        <Router>
          <Route path="/chat"><Chat /></Route>
          <Container
              className="d-flex align-items-center justify-content-center"
              style={{minHeight: "100vh"}}
          >
          <Switch>
            <div className={'w-100'} style={{ maxWidth: "400px" }}>
                <Redirect from="/" to="/login" />
              <Route path="/register" exact render={(props) => <Registration />} />
              <Route path="/login" exact render={(props) => <Login />} />
            </div>
          </Switch>
          </Container>
        </Router>
  );
}

export default App;
