import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Tasks from "../components/Tasks";
import Categories from "../components/Categories";
import User from "../components/User";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/categories" exact component={Categories} />
      <Route path="/register" exact component={User} />
    </Switch>
  </Router>
);