const express = require("express");
const router = express.Router();
const userUtil = require("./utils/userUtils")
const recipeUtil = require("./utils/recipeUtil");
const DButils = require("./DButils");

router.use( async (req,res,next) => {
  if(req.session && req.session.user_id){
    const id = req.session.user_id;
    const user_data = await DButils.execQuery(`SELECT * FROM dbo.users WHERE user_id = ('${id}')`);
  if(user_data[0]){
      req.user_id = id;
      next();
    }
} else{
  res.sendStatus(401);
}
})


router.get('/specific/recipe_id/:id', async (req,res) => {
  try{
  const { id } = req.params;
  let user_id = req.user_id;
  let recipe_id = [] ;
  recipe_id.push(id);
  let recipeInfo = await recipeUtil.getRecipesInformation(recipe_id);
  let preData = await userUtil.extractFullData(recipeInfo);
  preData[0].watched=await userUtil.checkDB_userWatched(user_id,recipe_id);
  preData[0].favorited=await userUtil.checkDB_userFav(user_id,recipe_id);
  var myJSON = JSON.stringify(preData);
  myJSON = JSON.parse(myJSON);
  myJSON[0].extendedIngredients = await recipeUtil.cleanExtendedIngridients(myJSON[0].extendedIngredients);
  await userUtil.watchedBefore(user_id, recipe_id);
  await userUtil.insertWatchedRecipe(user_id,recipe_id);
  res.send(myJSON[0]);
  }catch(err){
    if(err.status){
      res.status(err.status).send(err.message);
      }else{
        res.status(500).send(err);
      }
  }
})

router.get('/addtofavorites/recipe_id/:id', async (req,res) => {
  try{
  const { id } = req.params;
  let user_id = req.user_id;
  let recipe_id = [];
  recipe_id.push(id);
  recipeUtil.insertFavoriteRecipe(user_id,recipe_id);
  res.send("Recipe added To Favorites");
  }catch(err){
    if(err.status){
      res.status(err.status).send(err.message);
      }else{
        if(err.status){
          res.status(err.status).send(err.message);
          }else{
            res.status(500).send(err);
          }      }
  }
})

  router.get("/LastThreeRecipes", async (req, res) => {
    try {
      let recipesData=await userUtil.getLastThreeRecipesIds(req.user_id);
      recipesData= await userUtil.checkWatched_Fav(recipesData,req.user_id);
      res.send(recipesData);
    } catch (error) {
      console.log(error);
      if(error.status){
        res.status(error.status).send(error.message);
        }else{
          res.status(500).send(error);
        }
    }
  });

  
router.get('/search/query/:searchQuery/amount/:num', async (req, res) => {
  try{
    let preRecipeData = await userUtil.search(req.user_id,req.query,req.params);
    res.send(preRecipeData);
  }
    catch(error) {
      console.log(error);
      if(error.status){
        res.status(error.status).send(error.message);
        }else{
          res.status(500).send(error);
        }
    }
  });

  router.get('/myrecipes', async (req, res) => {
    try{
      let preRecipeData= await DButils.execQuery(`SELECT  [title] ,[readyInMinutes] ,[aggregateLikes] ,[vegetarian] ,[vegan] ,[glutenFree] ,[image] FROM dbo.private_recipes2 WHERE user_id = '${req.user_id}'`);
      res.send(preRecipeData);
    }
      catch(error) {
        console.log(error);
        if(error.status){
          res.status(error.status).send(error.message);
          }else{
            res.status(500).send(error);
          }
      }
    });

    router.get('/familyrecipes', async (req, res) => {
      try{
        const preRecipeData= await DButils.execQuery(`SELECT [title],[image],[rec_source],[holiday] FROM dbo.family_recipes WHERE user_id = '${req.user_id}'`);
        res.send(preRecipeData);
      }
        catch(error) {
          console.log(error);
          res.sendStatus(500);
        }
      });

  router.get('/specificfamilyrecipes/recipename/:name', async (req, res) => {
          try{
          const { name } = req.params;
          const preRecipeData = await DButils.execQuery(`SELECT [title],[rec_source],[holiday],[servings],[instructions],[image] FROM dbo.family_recipes WHERE user_id = '${req.user_id}' AND title='${name}'`);
            const ing = await DButils.execQuery(`SELECT * FROM dbo.ingridients WHERE title = '${name}'`);
          if (preRecipeData[0] != null){
            preRecipeData[0].extendedIngredients= ing;
            res.send(preRecipeData[0]);
          }
          else{
            res.status(400).send("User does not have required recipe");
          }
        }
        catch(error) {
          console.log(error);
          res.sendStatus(500);
        }
        });

      router.get('/favorites', async (req,res) => {
        try {
          let recipesData=await userUtil.getFavoritesRecipesIds(req.user_id);
          res.send(recipesData);
        } catch (error) {
          console.log(error);
          res.sendStatus(500);
        }
      });

      router.get('/myspecificrecipe/recipe_name/:name', async (req,res) => {
        const { name } = req.params;
        let user_id = req.user_id;
        let exist = await userUtil.checkUserHaveRecipe(user_id,name);
        if(exist){
          let data = await userUtil.getSpespecificPrivateRecipes(user_id,name);
          res.send(data[0]);
        }
        else{
          res.status(400).send("User does not have required recipe");
        }
      })

      router.get('/private_analyzed_instructions/recipe_name/:title', async (req,res) => {
        try{
        const { title } = req.params;
        let user_id = req.user_id;
        let preData = await userUtil.getSpespecificPrivateRecipes(user_id,title);
        let data = await userUtil.getAnalyzedInstructions(preData);
        res.send(data);
        }catch(err){
          if(err.status){
            res.status(err.status).send(err.message);
            }else{
              res.status(500).send(err);
            }
        }
      } 
      )

      router.get('/family_analyzed_instructions/recipe_name/:title/', async (req,res) => {
        try{
          const { title } = req.params;
          let user_id = req.user_id;
          let preData = await userUtil.getFamilyAnalyzedByID(user_id,title);
          let data = await userUtil.getAnalyzedInstructions(preData);
        res.send(data);
        }catch(err){
          if(err.status){
            res.status(err.status).send(err.message);
            }else{
              res.status(500).send(err);
            }
        }
      } 
      )

      router.post('/makeRecipeAdd/recipe_id/:recipe_id/type/:type', async (req, res) => {
        const recipe_id = req.params.recipe_id;
        const type = req.params.type;
        let user_id = req.user_id;
        try{
               let data = await DButils.execQuery(`SELECT * FROM dbo.makeTable WHERE user_id = '${user_id}'`);
        let size = data.length + 1;
        await DButils.execQuery(`INSERT INTO dbo.makeTable (user_id, recipe_id,type,rank,title,image) VALUES ('${user_id}', '${recipe_id}', '${type}','${size}','${req.body.title}','${req.body.image}')`); 
                  res.send("add succesfully").status("200");    

        }
        catch(err){
                  res.send("Duplicate key").status("200");    

        }
      });


      router.get('/makeRecipeDelete/recipe_id/:recipe_id', async (req, res) => {
        const recipe_id = req.params.recipe_id;
        let user_id = req.user_id;
          await DButils.execQuery(
            `DELETE from dbo.makeTable WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);  
            res.send("deleted recipe succesfully").status("200");    
      });


      router.get('/makeRecipeDeleteAll', async (req, res) => {
        let user_id = req.user_id;
          await DButils.execQuery(
            `DELETE from dbo.makeTable WHERE user_id = '${user_id}'`);
            res.send("deleted all recipes").status("200");      
      });


      router.get('/makeRecipeGetAll', async (req, res) => {
        let user_id = req.user_id;
          let data = await DButils.execQuery(
            `SELECT [rank],[image],[recipe_id],[type],[title] FROM dbo.makeTable WHERE user_id = '${user_id}'`);
            res.send(data);
      });

          
      router.post('/makeRecipeUpdate', async (req, res) => {
        let user_id = req.user_id;
        let newData = req.body.recipes;
        for( let recipe of newData){
          let recipe_id = recipe.recipe_id;
          let rank = recipe.rank;
          await DButils.execQuery(`UPDATE dbo.makeTable SET rank = '${rank}' WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);          
          }
          res.send("Updated Successfully");
      });


  module.exports = router;
