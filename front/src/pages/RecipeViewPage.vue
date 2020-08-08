<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 class="center">{{ recipe.title }}</h1>
         <span v-if="$root.store.username && title=='recipe'" class="userSymbol">
                <div v-if="recipe.watched"><img id="symbol" src="../assets/eyes.png"/> seen</div>
                <div v-else><img id="symbol" src="../assets/closed-eyes.png"/> unseen</div>
                 <div v-if="recipe.favorited"><img id="symbol" src="../assets/fullHeart.png"/> In Favorites</div>
                <div v-else><img id="symbol" src="../assets/Heart.png" onmouseover="this.src='https://res.cloudinary.com/da1ltmxeu/image/upload/v1592554778/PinClipart_ywtjsi.png'"  @click="addToFavorite()" onmouseout="this.src='https://res.cloudinary.com/da1ltmxeu/image/upload/v1592554778/PinClipart.com_clipart-start_2022362_ypzg0o.png'" style="cursor: pointer;"/>Add To Favorites</div>
              </span>
        <img v-if="recipe.image" :src="recipe.image" class="image" />
        <img v-else class="image" src="../assets/No_image.png">
      </div>
          <span class="cardSymbols">
              <span style="margin-right: 25px;"><img id="symbol" src="../assets/clock.png" /> {{ recipe.readyInMinutes }} minutes</span>
              <span style="margin-right: 25px;"><img id="symbol" src="../assets/like.png" /> {{ recipe.aggregateLikes }} likes</span>
              <span style="margin-right: 25px;"><img id="symbol" src="../assets/Meal.png" /> {{recipe.servings}}</span>
              <span style="margin-right: 25px;" v-if="recipe.vegetarian"><img id="symbol" src="../assets/vegetarian.png"/> Vegetarian</span>
              <span style="margin-right: 25px;" v-if="recipe.vegan"><img id="symbol"  src="../assets/vegan.png"/>Vegan</span>
              <span v-if="recipe.glutenFree"><img id="symbol"  src="../assets/glutenFree.png"/>Gluten Free</span>
          </span>
      <div>
        <div class="wrapper">
          <div class="wrapped">
            <strong>Instructions:</strong><br> <span v-for="(ins,index) in recipe.instructions" :key="index"> {{ins}}.<br>
             </span>
          </div>
          <div class="wrapped">
            <br>
            Ingredients Needed:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
              {{ r.amount }}   {{ r.unit }}  {{ r.name }}  
              </li>
            </ul>
                  <p>
        <b-button class="btn" @click="makeRecipes()">Start Cooking</b-button>
      </p>
       <p>
        <b-button class="btn" v-if="$root.store.username" @click="addToMeal()">Add To My Meal</b-button>
      </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "../main.js";
export default {
  data() {
    name:"RecipeView";
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      try {
        const id=this.$route.params.recipe_Id;
        const title=this.$route.params.title;
        if(this.title ==="myrecipes"){
         response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/myspecificrecipe/recipe_name/${this.$route.params.recipe_title}`);
        }else{
        if(this.$root.store.username){
        response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/specific/recipe_id/${this.$route.params.recipe_Id}`);
        }else{
          response = await this.axios.get(
          `https://backend3-2.herokuapp.com/recipes/specific/recipe_id/${this.$route.params.recipe_Id}`);
        }
        }
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        this.$router.replace("/NotFound");
        return;
      }

      let {
       id,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        favorited,
        watched
      } = response.data;

      let _recipe = {
        id,
        instructions: instructions.split("."),
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        favorited,
        watched
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
     async addToFavorite(){
     const response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/addtofavorites/recipe_id/${this.recipe.id}`
        );
        if(response.status==200){
          this.recipe.favorited=true;
          this.$forceUpdate;
        }
        console.log(response);
  },
  async makeRecipes(){
    if(this.$root.store.username){
       this.addToMeal();
    }
    if(this.title=== "myrecipes"){
        this.$router.push(`/MakePage/${this.recipe.title}/2`);
    }else{
      this.$router.push(`/MakePage/${this.recipe.id}/1`);
    }
  },
  async addToMeal(){
    if(this.title=== "myrecipes"){
        const response = await this.axios.post(
          `https://backend3-2.herokuapp.com/user/makeRecipeAdd/recipe_id/${this.recipe.title}/type/2`,
          {
            title: this.recipe.title,
            image: this.recipe.image,
          }
        );
    }else{
       const response = await this.axios.post(
          `https://backend3-2.herokuapp.com/user/makeRecipeAdd/recipe_id/${this.recipe.id}/type/1`,
          {
            title: this.recipe.title,
            image: this.recipe.image,
          }
        );   
      }
     eventBus.$emit('fireMethod');
  }
  },
  props:{
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>

.container{
      font-size: 22px;

}

.wrapper {
  display: flex;
}
.wrapped {
  width: 60%;
  padding: 30px;
}
.center {
  width: 70%;
}

#symbol{
  width: 3%;
  height: 3%;
}

.cardSymbols {
  position: relative;
}

.image {
  border-style: double;
  border-color: #F08080;
  border-radius: 50px;
  width: 400px;
  height:300px;
}

.userSymbol{
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  position: relative;
  left: 350px;
  top:75px;
}

.btn{
  display:block; background-color: #F08080; border-color: white
}


</style>
