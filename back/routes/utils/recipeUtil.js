const axios = require("axios");
const api_key = process.env.Api_key;
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("../DButils");

function validateQueryParams(query_params,search_params){
    const params_list = ["diet","cuisine","intolerances"];
    params_list.forEach((param) =>{
        if(query_params[param] !== null){
            search_params[param] = query_params[param];
        }
    });
}

async function searchForRecipes(search_params){
        let search_response = await axios.get(
            `${api_domain}/search?apiKey=${api_key}`,
            {
                params: search_params,
            }
        );
        const recipes_id_list = await getRecipeIDs(search_response);
        let info_array = await getRecipesInformation(recipes_id_list);
        let relevantRecipeData = await extractPrevData(info_array);
    
    return relevantRecipeData;
}

async function getRecipeIDs(search_response){
    let recipes = search_response.data.results;
    recipes_id_list = [];
    recipes.map((recipe)=>{
        //console.log(recipe.title);
        recipes_id_list.push(recipe.id);
    })
    return recipes_id_list;
}

async function getRecipesInformation(recipes_id_list){
    let promises=[];
    recipes_id_list.map((id) => {
        let url = `${api_domain}/${id}/information?apiKey=${api_key}`;
        promises.push(axios.get(url))
    });
    let info_response1 = await Promise.all(promises)
    return info_response1;
}

async function extractPrevData(recipes_info,fav){
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
        };
    });
}

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
          instructions,
          servings, 
          extendedIngredients, 
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
            instructions: instructions,
            servings: servings,
            extendedIngredients: extendedIngredients,
        };
    });
}

function insertFavoriteRecipe(user_id, recipe_id){
    DButils.execQuery(
      `INSERT INTO dbo.fav_recipes (user_id, recipe_id) VALUES ('${user_id}', '${recipe_id}')`
    );
  }
  
  function cleanExtendedIngridients(recipes_info){
    return recipes_info.map((recipes_info) => {
      const{name} = recipes_info;
      const amount = recipes_info.measures.metric.amount;
      const unit = recipes_info.measures.metric.unitLong;
      return {
          name: name,
          amount: amount,
          unit: unit,
      };
  });
  }
  
async function getRandomRecipes(){
    let promises=[];
   let url = `${api_domain}/random?number=3&apiKey=${api_key}`;
     promises.push(axios.get(url));
    let info_response1 = await Promise.all(promises)
    return info_response1[0];
}

function randomRecipesData(recipes_info){
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
        } = recipes_info;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
        };
    });
}

function prepeareData(recipes_info){
    return recipes_info.map((recipe) => {
        const data = recipe;
        return {
            data: data,
        };
    });
}

async function search(query,params){
    const { searchQuery , num } = params;
    if(num!=5 && num!=10 && num!=15){
        throw { status: 405, message: "invalid input number of recipes to search" };
    }
    search_params = {};
    search_params.query = searchQuery;
    search_params.number = num;
    search_params.instructionRequired = true;
    validateQueryParams(query,search_params);
    const prevRecipeData = await searchForRecipes(search_params);
    return prevRecipeData;
}

function extractAnalyzedInstructions(recipes_Analyzed) {
    return recipes_Analyzed.data[0].steps.map((recipes_Analyzed) => {            
      const {
          equipment,
          ingredients,
          number,
          step
      } = recipes_Analyzed;

      return {
          equipment: equipment,
          ingredients: ingredients,
          number: number,
          step: step
      }    
  }
                                              
  )
}

async function getAnalyzedInstructions(recipe_id){
    let promises=[];
    let extract_info = [];
    let url = `${api_domain}/${recipe_id}/analyzedInstructions?apiKey=${api_key}`;
    promises.push(axios.get(url))
    let info_response = await Promise.all(promises);
    if(info_response[0].data.length != 0){
            extract_info=extractAnalyzedInstructions(info_response[0]);
    }
    return extract_info;
}

function getImage(info){
    for(let i=0; i<info.length;i++){
        for(let j=0;j<info[i].equipment.length;j++){
            let image=info[i].equipment[j].image;
            let url= `https://spoonacular.com/cdn/equipment_100x100/${image}`;
            info[i].equipment[j].image=url;

        }
        for(let j=0;j<info[i].ingredients.length;j++){
            let image=info[i].ingredients[j].image;
            let url= `https://spoonacular.com/cdn/ingredients_100x100/${image}`;
            info[i].ingredients[j].image=url;
        }
    }
    return info;
}

module.exports.validateQueryParams = validateQueryParams;
module.exports.searchForRecipes = searchForRecipes;
module.exports.getRecipesInformation = getRecipesInformation;
module.exports.extractFullData = extractFullData;
module.exports.getRandomRecipes=getRandomRecipes;
module.exports.insertFavoriteRecipe = insertFavoriteRecipe;
module.exports.cleanExtendedIngridients = cleanExtendedIngridients;
module.exports.randomRecipesData = randomRecipesData;
module.exports.extractPrevData = extractPrevData;
module.exports.prepeareData = prepeareData;
module.exports.search= search;
module.exports.getAnalyzedInstructions=getAnalyzedInstructions;
module.exports.getImage=getImage;
