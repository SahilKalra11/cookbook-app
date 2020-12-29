import React, { Component } from "react";
import {
  fetchAllRecipes,
  MakeFavourite,
  RemoveFavourite,
} from "../../../redux/reducers/recipesReducer";
import { IsLoggedIn } from "../../../utility/generalMethods";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { getSingleRecipe } from "../../../redux/reducers/recipesReducer";

class RecipesList extends Component {
  history = this.props.history;
  dispatch = this.props.dispatch;

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      filteredRecipes: [],
    };
  }

  onSearch = (e) => {
    this.setState({
      searchText: e.target.value,
    });

    let updatedRecipes = this.state.recipes;

    updatedRecipes = updatedRecipes.filter((item) => {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ filteredRecipes: updatedRecipes });
  };

  toggleFavourite = (id) => {
    const recipes = this.state.filteredRecipes;

    //FIRST METHOD TO FIND FAVOURITES
    if (recipes && recipes.length) {
      let Index = recipes.findIndex((val) => val.id == id);

      if (recipes[Index]) {
        const { isFavourite } = recipes[Index];

        if (isFavourite) {
          this.props.RemoveFavourite(recipes[Index], id);
        } else {
          this.props.MakeFavourite(recipes[Index], id);
        }

        recipes[Index] = { ...recipes[Index], isFavourite: !isFavourite };

        this.setState({
          filteredRecipes: [...recipes],
        });
      }
    }
  };

  componentDidMount() {
    if (!IsLoggedIn()) {
      this.history.push("/auth/login");
    }

    this.loadRecipes();
  }

  loadRecipes = async () => {
    await this.props.fetchingAllRecipes();

    if (this.props.recipes && this.props.recipes.length) {
      this.setState({
        filteredRecipes: [...this.props.recipes],
        recipes: [...this.props.recipes],
      });
    }
  };

  handleRedirection = (id) => {
    this.history.push(`/recipes/view/${id}`);
  };

  render() {
    // console.log("recipes are ", this.props.recipes);

    const { recipes, Api } = this.props;

    let { searchText, filteredRecipes } = this.state;

    return (
      <div className="root">
        <header className="row search-bar">
          <div className="form-group">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={this.onSearch}
              value={searchText}
            />
          </div>
        </header>
        <div className="Recipes main">
          <div className="heading">
            <span className="float-left">
              <h3>Recipes</h3>
            </span>
            <div className="float-right">
              <span className="add-recipe-button">
                <button onClick={(e) => this.history.push("/recipes/add")}>
                  <img src={`${process.env.PUBLIC_URL}/images/plus.png`} />
                </button>
              </span>
            </div>
          </div>
          <ul>
            {Api.isLoading ? <p>Loading...</p> : null}
            {filteredRecipes.length == 0 && !Api.isLoading ? (
              <p>No Records Found</p>
            ) : (
              filteredRecipes.map((recipe, idx) => {
                return (
                  <SingleRecipe
                    {...recipe}
                    toggleFavourite={this.toggleFavourite}
                    key={idx}
                    onClick={this.handleRedirection}
                  />
                );
              })
            )}

            {/* <li className="item">
              <div className="imagewrapper">
                <img src="images/recipe-1.jpg" />
                <span className="favourite-icon">
                  <a href="#">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div className="item-content">
                <h3>Italian Pizza</h3>
                <p>World Food</p>
                <div class="stars-icon">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="imagewrapper">
                <img src="images/recipe-2.jpg" />
                <span className="favourite-icon">
                  <a href="#">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div className="item-content">
                <h3>Italian Pizza</h3>
                <p>World Food</p>
                <div className="stars-icon">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="imagewrapper">
                <img src="images/recipe-2.jpg" />
                <span className="favourite-icon">
                  <a href="#">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div className="item-content">
                <h3>Italian Pizza</h3>
                <p>World Food</p>
                <div class="stars-icon">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="imagewrapper">
                <img src="images/recipe-2.jpg" />
                <span className="favourite-icon">
                  <a href="#">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div className="item-content">
                <h3>Italian Pizza</h3>
                <p>World Food</p>
                <div className="stars-icon">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="item">
              <div className="imagewrapper">
                <img src="images/recipe-2.jpg" />
                <span className="favourite-icon">
                  <a href="#">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </span>
              </div>
              <div className="item-content">
                <h3>Italian Pizza</h3>
                <p>World Food</p>
                <div class="stars-icon">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
    hasRecipes: state.recipes.hasRecipes,
    Api: state.Api,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchingAllRecipes: () => dispatch(fetchAllRecipes()),
  MakeFavourite: (recipe, id) => {
    return dispatch(MakeFavourite(recipe, id));
  },
  RemoveFavourite: (recipe, id) => dispatch(RemoveFavourite(recipe, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecipesList));
