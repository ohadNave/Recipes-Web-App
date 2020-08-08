<template>
<div class="container">
  <b-container>
    <h3> My Family Recipes:</h3>
    <br>
     <b-row v-for="r in recipes" :key="r.id">
          <FamilyRecipePreview title="recipe" class="recipe-preview" id="RecipePreview" :recipe="r" />
      </b-row>
  </b-container>
</div>
</template>

<script>
import FamilyRecipePreview from "../components/FamilyRecipePreview";
export default {
  name: "familyPage",
  components: {
    FamilyRecipePreview
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "https://backend3-2.herokuapp.com/user/familyrecipes"
        );

         console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
