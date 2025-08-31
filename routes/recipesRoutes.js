import { Router } from "express";
import { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe, getStats} from '../controllers/recipesController.js';
import { validateCreateRecipe, validateUpdateRecipe } from '../middlewares/validationRecipe.js';

const router = Router();
router.get("/", getAllRecipes);
router.get("/stats", getStats);
router.get("/:id", getSingleRecipe);

//before creating or updating a recipe, check if the request body is valid
router.post("/", validateCreateRecipe, createRecipe);
router.put("/:id", validateUpdateRecipe, updateRecipe);

router.delete("/:id", deleteRecipe);


export default router;
