const express = require("express");
const router = express.Router();
const recipeUtil = require("./utils/recipeUtil");
const userUtils = require("./utils/userUtils");


router.get('/search/query/:searchQuery/amount/:num', async (req, res) => {
  try{
    let preRecipeData = await recipeUtil.search(req.query,req.params);
     res.send(preRecipeData);
  }
    catch(error) {
      console.log(error);
      if(error.status){
        res.status(error.status).send(error.message);
      }else{
        res.status(500).send(error)
      }
    }
  });


router.get('/specific/recipe_id/:id', async (req,res) => {
  try{
  const { id } = req.params;
  let recipe_id = [] ;
  if(id<=0){
    throw { status: 400, message: "invalid input" };
  }
  recipe_id.push(id);
  let recipeInfo = await recipeUtil.getRecipesInformation(recipe_id);
  let preData = await recipeUtil.extractFullData(recipeInfo);
  var myJSON = JSON.stringify(preData);
  myJSON = JSON.parse(myJSON);
  myJSON[0].extendedIngredients = recipeUtil.cleanExtendedIngridients(myJSON[0].extendedIngredients);
  res.send(myJSON[0]);
}catch(err){
  if(err.status){
    res.status(err.status).send(err.message);
    }else{
      res.status(500).send(err);
    }
}
})

router.get('/random', async(req, res) => {
  let random_recipes = await recipeUtil.getRandomRecipes();
  let random_recipes_data= await recipeUtil.randomRecipesData(random_recipes.data.recipes);
  if(req.session && req.session.user_id){
    await userUtils.checkWatched_Fav(random_recipes_data,req.session.user_id);
  }
  res.send(random_recipes_data);
  });

      router.get('/API_analyzed_instructions/recipe_id/:id', async (req,res) => {
        try{
        const { id } = req.params;
        let info = await recipeUtil.getAnalyzedInstructions(id);
        info = recipeUtil.getImage(info);
        res.send(info);
        }
        catch(err){
          if(err.status){
            res.status(err.status).send(err.message);
            }else{
              res.status(500).send(err);
            }
        }
      } 
      )

module.exports = router;
