import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Account from "../components/Account";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/tasks" exact render={(props)=>(
        <Home {...props} view={'Tasks'}/>
          )}
        />
      <Route path="/categories" exact render={(props)=>(
        <Home {...props} view={'Categories'}/>
          )}
        />
        <Route path="/account" exact render={(props)=>(
        <Home {...props} view={'Account'}/>
          )}
        />
        <Route path="/logout" exact render={(props)=>(
        <Home {...props} logout={true}/>
          )}
        />
      
      
    </Switch>
  </Router>
);