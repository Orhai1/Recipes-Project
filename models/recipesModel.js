import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';

export async function getRecipes() {
    const data = await fs.readFile("data/recipesData.json", "utf-8");
    return JSON.parse(data);
}

export async function getOneRecipe(id) {
    const recipes = await getRecipes();
    return recipes.find((recipe) => recipe.id === id);
}

export async function createNewRecipe(recipe) {
    const recipes = await getRecipes();
    recipe.id = randomUUID();
    recipe.createdAt=new Date().toISOString();
    recipes.push(recipe);
    await fs.writeFile("data/recipesData.json", JSON.stringify(recipes, null, 2));
    return recipe;
}

export async function updateExistingRecipe(id, updatedData) {
    const recipes = await getRecipes();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return null;

    // Update the recipe with the new data
    recipes[index] = { ...recipes[index], ...updatedData };
    await fs.writeFile("data/recipesData.json", JSON.stringify(recipes, null, 2));
    return recipes[index];
}

export async function deleteExistingRecipe(id) {
    const recipes = await getRecipes();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return null;

    const deletedRecipe = recipes[index];
    recipes.splice(index, 1);
    await fs.writeFile("data/recipesData.json", JSON.stringify(recipes, null, 2));
    return deletedRecipe;
}

export async function getRecipesStatistics() {
    const recipes = await getRecipes();
    const stats = {
        totalRecipes: recipes.length,
        averageCookingTime: (recipes.reduce((acc, r) => acc + r.cookingTime, 0) / recipes.length || 0),
        easyRecipes: recipes.filter(r => r.difficulty === 'easy').length,
        mediumRecipes: recipes.filter(r => r.difficulty === 'medium').length,
        hardRecipes: recipes.filter(r => r.difficulty === 'hard').length,
    };
    return stats;
}
