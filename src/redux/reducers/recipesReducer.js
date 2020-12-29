import * as recipeAction from "../actions/recipesAction";
import * as apiActions from "../actions/apiAction";
import {
  DeleteData,
  GetAllData,
  GetSingleData,
  PostData,
  PutData,
} from "../../utility/apiService";
import { Recipes } from "../../utility/Endpoints";

const initialState = {
  recipes: [],
  favourites: [],
  hasRecipes: false,
  currentRecipe: {
    id: 0,
    isFavourite: false,
    name: "",
    votes: 0,
    imageUrl: "",
    serving: 0,
    ingredients: [],
    steps: [],
    cookTime: 0,
    description: "",
  },
};

const recipesReducer = (state = initialState, action) => {
  let { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case recipeAction.LOAD_RECIPE: {
      newState = {
        ...newState,
        hasRecipes: true,
        recipes: [...payload],
      };
      return newState;
    }
    case recipeAction.LOAD_CURRENT_RECIPE: {
      newState = {
        ...newState,
        currentRecipe: { ...payload },
      };
      return newState;
    }
    case recipeAction.ADD_RECIPE: {
      payload = { ...payload, isFavourite: false };
      newState = {
        ...newState,
        recipes: [...newState.recipes, payload],
      };
      return newState;
    }
    case recipeAction.UPDATE_RECIPE: {
      let elemIndex = newState.recipes.findIndex((val) => val.id == action.id);
      if (elemIndex) {
        let temp = [...newState.recipes];
        temp[elemIndex] = { ...payload };

        newState = {
          ...newState,
          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }
    case recipeAction.DELETE_RECIPE: {
      newState = {
        ...newState,
        recipes: [...newState.recipes.filter((val) => val.id != payload.id)],
      };

      return newState;
    }
    case recipeAction.MAKE_FAVOURITE: {
      const id = payload.id;
      let elemIndex = newState.recipes.findIndex((val) => val.id == id);
      if (elemIndex) {
        let temp = [...newState.recipes];

        temp[elemIndex] = { ...temp[elemIndex], isFavourite: true };

        newState = {
          ...newState,
          favourites: newState.favourites.concat(id),
          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }
    case recipeAction.REMOVE_FAVOURITE: {
      const id = payload.id;
      let elemIndex = newState.recipes.findIndex((val) => val.id == id);
      if (elemIndex) {
        let temp = [...newState.recipes];

        temp[elemIndex] = { ...temp[elemIndex], isFavourite: false };

        newState = {
          ...newState,
          favourites: newState.favourites.filter((fav) => fav != id),
          recipes: [...temp],
        };

        return newState;
      } else {
        return newState;
      }
    }

    default:
      return newState;
  }
};
/*
export const getSingleRecipe = (id) => {
  return async (dispatch, getState) => {
    try {
      // let { recipes } = getState();
      // recipes = recipes.recipes;
      // // console.log("state at ", getState());

      // if (!recipes || recipes.length < 1) {
      //   // throw new Error("recipes are empty");
      //   console.log("Recipes are empty");
      // }

      // const recipe = recipes.find((val) => val.id == id);

      // if (!recipe) {
      //   // throw new Error("Recipe Not Found");
      //   console.log("Recipe not Found");
      // }



      dispatch(recipeAction.loadCurrentRecipe(recipe));
    } catch (err) {
      console.log(err);
    }
  };
};
*/

export const fetchAllRecipes = () => {
  return async (dispatch) => {
    try {
      await dispatch(apiActions.fetchRequest());

      const result = await GetAllData(Recipes);
      console.log(result);
      const { data } = result;

      console.log("recipes are ", data);

      dispatch(apiActions.fetchSuccess(data));
      dispatch(recipeAction.loadRecipe(data));
    } catch (error) {
      dispatch(apiActions.fetchError(error.message));
    }
  };
};

export const fetchSingleRecipe = (id) => {
  return async (dispatch) => {
    try {
      dispatch(apiActions.fetchRequest());

      const result = await GetSingleData(Recipes, id);
      console.log("recipe is ", result.data);

      const { data } = result;

      dispatch(apiActions.fetchSuccess(data));
      dispatch(recipeAction.loadCurrentRecipe(data));
      return data;
    } catch (error) {
      dispatch(apiActions.fetchError(error.message));
    }
  };
};

export const addRecipe = (recipe) => async (dispatch) => {
  try {
    if (!recipe) {
      throw new Error("Invalid Recipe Entered");
    }

    dispatch(apiActions.fetchRequest());

    const result = await PostData(Recipes, recipe);
    console.log("recipe is ", result.data);

    const { data } = result;

    dispatch(apiActions.fetchSuccess(data));

    dispatch(recipeAction.addRecipe(recipe));
    return recipe;
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const updateRecipe = (recipe) => async (dispatch) => {
  try {
    if (!recipe) {
      throw new Error("Invalid Recipe Received");
    }
    if (!recipe.id) {
      throw new Error("Invalid id provided");
    }

    const { id } = recipe;

    dispatch(apiActions.fetchRequest());

    const result = await PutData(Recipes, id, recipe);
    console.log("recipe is ", result.data);

    const { data } = result;

    dispatch(apiActions.fetchSuccess(data));

    dispatch(recipeAction.updateRecipe(recipe));
    return recipe;
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error("id not found");
    }

    dispatch(apiActions.fetchRequest());

    const result = await DeleteData(Recipes, id);
    console.log("recipe is ", result.data);

    const { data } = result;

    dispatch(apiActions.fetchSuccess(data));

    dispatch(recipeAction.deleteRecipe(id));
  } catch (error) {
    dispatch(apiActions.fetchError(error.message));
  }
};

export const MakeFavourite = (recipe, id) => async (dispatch, getState) => {
  try {
    if (recipe) {
      recipe = {
        ...recipe,
        isFavourite: true,
      };

      await dispatch(updateRecipe(recipe));

      dispatch(recipeAction.makeFavourite(id));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const RemoveFavourite = (recipe, id) => async (dispatch, getState) => {
  try {
    if (recipe) {
      recipe = {
        ...recipe,
        isFavourite: false,
      };

      await dispatch(updateRecipe(recipe));

      dispatch(recipeAction.removeFavourite(id));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default recipesReducer;
