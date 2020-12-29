import User from "../components/user";
import RecipeList from "../components/recipes/recipesList/recipesList";
import RecipeDetail from "../components/recipes/recipeDetail/recipeDetail";

import RecipeView from "../components/recipes/recipeView/recipeView";
import FavouriteRecipe from "../components/recipes/favourites/favourites";

const routes = [
  { path: "/", exact: true },
  {
    exact: true,
    Component: User,
    path: "/profile",
  },
  {
    exact: true,
    Component: RecipeList,
    path: "/recipes",
  },
  {
    exact: true,
    Component: RecipeDetail,
    path: "/recipes/add",
  },
  {
    exact: true,
    Component: RecipeDetail,
    path: "/recipes/:recipe_id",
  },
  {
    exact: true,
    Component: RecipeView,
    path: "/recipes/view/:recipe_id",
  },

  {
    exact: true,
    Component: FavouriteRecipe,
    path: "/recipes/favourites",
  },
];

export default routes;
