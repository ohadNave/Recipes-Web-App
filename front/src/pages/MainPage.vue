<template>
  <div>
    <b-container>
      <!-- <img src="../assets/symbols.png" style="width:100px;height:300px; float:right"> -->
      <br />
      <b-row>
        <b-col>
          <RecipesList title="Explore These Recipes:" recipe_type="recipe" :recipes="randomRecipes"/>
          <b-button class="randomBtn" @click="randomUpdate()">Explore more recipes</b-button>
        </b-col>
        <b-col>
          <div class="notConnected" v-if="!$root.store.username">
            <LoginPage />
          </div>
          <RecipesList v-if="$root.store.username" title="Last Watched Recipes:" recipe_type="recipe" :recipes="lastRecipes"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginPage from "./LoginPage";
import RecipesList from "../components/RecipesList";
import { eventBus } from "../main.js";
export default {
  name: "Main",
  components: {
    RecipesList,
    LoginPage
  },
  data() {
    return {
      randomRecipes: [],
      lastRecipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  created() {
    eventBus.$on("fireLastThree", () => {
      this.lastThreeUpdate();
    });
  },
  methods: {
    async updateRecipes() {
      if (this.$root.store.username) {
        this.lastThreeUpdate();
      }
      this.randomUpdate();
    },
    async lastThreeUpdate() {
      let lastRecipesRes = await this.axios.get(
        "https://backend3-2.herokuapp.com/user/LastThreeRecipes"
      );
      let recipesData = lastRecipesRes.data;
      this.lastRecipes = [];
      this.lastRecipes.push(...recipesData);
    },
    async randomUpdate() {
      let randomRecipesRes = await this.axios.get(
        "https://backend3-2.herokuapp.com/recipes/random"
      );
      let recipesRandomData = randomRecipesRes.data;
      this.randomRecipes = [];
      this.randomRecipes.push(...recipesRandomData);
    }
  }
};
</script>

<style lang="scss" scoped>

.randomBtn {
  left: 15%;
  position: relative;
  height: auto;
  width: auto;
  background-size: auto;
  background-color: #F08080;
  border-color: white;
}
</style>
