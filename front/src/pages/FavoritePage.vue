<template>
<div class="container">
  <b-container>
        <RecipesList title="My Favorite Recipes:" recipe_type="recipe" :recipes="recipes" class="RandomRecipes center" />
  </b-container>
</div>
</template>

<script>
import RecipesList from "../components/RecipesList";
export default {
  name: "favoritPage",
  components: {
    RecipesList
  },
   data(){
    return{
      recipes:[],
    }
  },
  created(){
    this.updateRecipes();
  },
  methods:{
  async updateRecipes(){
    let response=await this.axios.get("https://backend3-2.herokuapp.com/user/favorites");
    console.log(response);
    let recipesData = response.data;
    this.recipes = [];
    this.recipes.push(...recipesData);
    }
  }
 
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
