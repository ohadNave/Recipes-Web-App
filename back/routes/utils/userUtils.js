
const DBUtils = require("../DButils");
const recipeUtil = require("./recipeUtil");

    
async function extractFullData(recipes_info){
  return recipes_info.map((recipes_info) => {
      const{
        id,
        title,
        readyInMinutes,
        aggregateLikes,
        vegetarian,
        vegan,
        glutenFree,
        image,
        extendedIngredients, 
        instructions,
        servings,
      } = recipes_info.data;
      return {
          id: id,
          title: title,
          readyInMinutes: readyInMinutes,
          aggregateLikes: aggregateLikes,
          vegetarian: vegetarian,
          vegan: vegan,
          glutenFree: glutenFree,
          image: image,
          extendedIngredients: extendedIngredients,
          instructions: instructions,
          servings: servings,
          watched: false,
          favorited: false,
      };
  });
}

async function checkDB_userWatched(user_id,recipe_id){
const val= await DBUtils.execQuery(`SELECT * FROM dbo.last_watched_recipes WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
if(val[0]){
return true;
} 
return false;
} 

async function checkDB_userFav(user_id,recipe_id){
const val= await DBUtils.execQuery(`SELECT * FROM dbo.fav_recipes WHERE user_id = '${user_id}' AND recipe_id ='${recipe_id}'`)
if(val[0]){
return true;
} 
return false;
}

async function getLastThreeRecipesIds(user_id){
let lastRecipes= await DBUtils.execQuery(`SELECT top 3 recipe_id FROM dbo.last_watched_recipes WHERE user_id = '${user_id}' ORDER BY time DESC`);
let idsArray = await convertToArry(lastRecipes);
let recipesData= await recipeUtil.getRecipesInformation(idsArray);
let relevantRecipeData = await recipeUtil.extractPrevData(recipesData);
return relevantRecipeData;
}

async function convertToArry(lastRecipes){
let arry=[];
if(lastRecipes){
for( let recipe of lastRecipes){
arry.push(recipe.recipe_id);
}
}
return arry;
}


async function checkWatched_Fav(preRecipeData, user_id){
for(let recipe of preRecipeData){
const user_watched = await checkDB_userWatched(user_id, recipe.id);
const user_favorited = await checkDB_userFav(user_id, recipe.id);
recipe.watched =  user_watched;
recipe.favorited =  user_favorited;
}
return preRecipeData;
}

async function search(user_id,query,params){
let preRecipeData = await recipeUtil.search(query,params);
let data = await checkWatched_Fav(preRecipeData,user_id);
return data;
}

function watchedBefore(user_id, recipe_id){
let query =  `DELETE FROM dbo.last_watched_recipes WHERE user_id = ${user_id} AND recipe_id = ${recipe_id}`;
DBUtils.execQuery(query);
}

async function insertWatchedRecipe(user_id, recipe_id){
await DBUtils.execQuery(
`INSERT INTO dbo.last_watched_recipes (user_id, recipe_id) VALUES ('${user_id}', '${recipe_id}')`
);
}

async function getFavoritesRecipesIds(user_id){
  let favRecipes= await DBUtils.execQuery(`SELECT recipe_id FROM dbo.fav_recipes WHERE user_id = '${user_id}'`);
  let idsArray = await convertToArry(favRecipes);
  let recipesData= await recipeUtil.getRecipesInformation(idsArray);
  let relevantRecipeData = await recipeUtil.extractPrevData(recipesData);
  let relevantRecipes = await checkWatched_Fav(relevantRecipeData,user_id);
  return relevantRecipes;
}

async function getSpespecificPrivateRecipes(user_id,title){
    let RecipeData= await DBUtils.execQuery(`SELECT [title] ,[readyInMinutes] ,[aggregateLikes] ,[vegetarian] ,[vegan] ,[glutenFree] ,[image],[instructions],[servings] FROM dbo.private_recipes2 WHERE user_id = '${user_id}' And title='${title}'`);
    let Ingredients= await DBUtils.execQuery(`SELECT [name],[amount],[unit] FROM dbo.ingridients WHERE title = '${title}'`);
    RecipeData[0].extendedIngredients=Ingredients;
    return RecipeData;
    }

async function checkUserHaveRecipe(user_id,title){
      let Data = await DBUtils.execQuery(`SELECT * FROM dbo.private_recipes2 WHERE user_id = '${user_id}' And title='${title}'`);
      if (Data.length == 0){
        return false;
      }
      return true;
      }

// async function getAnalyzedInstructions(extendedData){
//           return extendedData.map((recipes_info) => {
//               const{
//                 instructions,
//                 servings,
//                 extendedIngredients,
//               } = recipes_info;
//               return {
//                 equipment:[],
//                 instructions: instructions,
//                 servings: servings,
//                 ingredients: extendedIngredients,
//               };
//           });
//       }

async function getAnalyzedInstructions(extendedData){
  let steps=extendedData[0].instructions.split("\r\n");
  let data=[];
  let i=1;
  for( i;i<steps.length+1;i++){
    const equipment=[];
    const ingredients=[];
    const number=i;
    const step=steps[i-1];
    data[i-1]={equipment,ingredients,number,step}
  }
  return data;
}

async function getFamilyAnalyzedByID(user_id,title){
        let RecipeData = await DBUtils.execQuery(`SELECT [instructions] ,[servings] FROM dbo.family_recipes WHERE user_id = '${user_id}' AND title='${title}'`);
        let recipeInstructionData= await DBUtils.execQuery(`SELECT [name],[amount],[unit] FROM dbo.ingridients WHERE title = '${title}'`);
        RecipeData[0].extendedIngredients=recipeInstructionData;
        return RecipeData;
    }


module.exports.getLastThreeRecipesIds = getLastThreeRecipesIds;
module.exports.extractFullData = extractFullData;
module.exports.checkDB_userWatched = checkDB_userWatched;
module.exports.checkDB_userFav = checkDB_userFav;
module.exports.checkWatched_Fav = checkWatched_Fav;
module.exports.search = search;
module.exports.watchedBefore = watchedBefore;
module.exports.insertWatchedRecipe = insertWatchedRecipe;
module.exports.getFavoritesRecipesIds=getFavoritesRecipesIds;
module.exports.getSpespecificPrivateRecipes=getSpespecificPrivateRecipes;
module.exports.checkUserHaveRecipe = checkUserHaveRecipe;
module.exports.getAnalyzedInstructions = getAnalyzedInstructions;
module.exports.getFamilyAnalyzedByID=getFamilyAnalyzedByID;

