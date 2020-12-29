import React, { Component } from "react";
import "./App.css";
import Login from "../auth/Login/login";
import Layout from "../General/Layout/layout";
import { fetchAllRecipes } from "../../redux/reducers/recipesReducer";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  hasRecipes = this.props.hasRecipes;
  Api = this.props.Api;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    this.props.fetchingAllRecipes();
  };

  render() {
    return (
      <Router>
        {this.Api.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Switch>
            <Route
              exact
              path="/auth/login"
              render={(props) => <Login {...props} />}
            />
            <Route path="/" render={(props) => <Layout {...props} />} />
          </Switch>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hasRecipes: state.recipes.hasRecipes,
    recipes: state.recipes.recipes,
    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchingAllRecipes: () => dispatch(fetchAllRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
