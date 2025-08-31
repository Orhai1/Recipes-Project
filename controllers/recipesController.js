import { getRecipes, getOneRecipe, createNewRecipe, updateExistingRecipe, deleteExistingRecipe, getRecipesStatistics} from '../models/recipesModel.js';

export async function getAllRecipes(req, res) {
  try {
    const recipes = await getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getSingleRecipe(req, res) {
  const { id } = req.params;
  try {
    const recipe = await getOneRecipe(id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function createRecipe(req, res) {
  const newRecipe = req.body;
  try {
    const create_new_recipe = await createNewRecipe(newRecipe);
    res.status(201).json({ success: true, data: create_new_recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function updateRecipe(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedRecipe = await updateExistingRecipe(id, updatedData);
    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, data: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteRecipe(req, res) {
  const { id } = req.params;

  try {
    const deletedRecipe = await deleteExistingRecipe(id);
    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(204).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getStats(req, res) {
  try {
    const stats = await getRecipesStatistics();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
