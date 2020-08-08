<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1 class="center">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="image" />
      </div>
        <span class="cardSymbols">
              <span style="margin-right: 25px;"><img id="symbol" src="../assets/chef.png" /> Made By: {{ recipe.rec_source }}</span>
              <span style="margin-right: 25px;"><img id="symbol" src="../assets/calendar.png" /> Cooking On: {{ recipe.holiday }}</span>
          </span>
    <br>
        <br>
      <div>
        <div class="wrapper">
          <div class="wrapped">
            <div class="wrapped"> 
            <strong>Instructions:</strong><br> <span v-for="(ins,index) in recipe.instructions" :key="index"> {{ins}}.<br>
            </span>
            </div>
          </div>
          <div class="wrapped">
             <strong>Ingredients:</strong>
            <ul>
              <li
                v-for="(r,index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
               {{ r.amount }}   {{ r.unit }}  {{ r.name }}
              </li>
            </ul>
              <p>
        <b-button class="btn" @click="makeRecipes()">Go to recipe instructions </b-button>
      </p>
      <p>
        <b-button class="btn" v-if="$root.store.username" @click="addToMeal()">Add to my meal</b-button>
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
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        const title=this.$route.params.recipe_title;
         response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/specificfamilyrecipes/recipename/${this.$route.params.recipe_title}`);
         console.log( response);


        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log( error);
        this.$router.replace("/NotFound");
        return;
      }

      let {
       title,
        rec_source,
        holiday,
        instructions,
        image,
        extendedIngredients
      } = response.data;

      let _recipe = {
          title,
        rec_source,
        holiday,
        instructions: instructions.split("."),
        image,
        extendedIngredients
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
    async makeRecipes(){
          this.addToMeal();
        this.$router.push(`/MakePage/${this.recipe.title}/3`);
    },
    async addToMeal(){
        const response = await this.axios.post(
          `https://backend3-2.herokuapp.com/user/makeRecipeAdd/recipe_id/${this.recipe.title}/type/3`,
           {
            title: this.recipe.title,
            image: this.recipe.image,
          }
        );
        eventBus.$emit('fireMethod');
  }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#symbol{
    width: 3%;
  height: 3%;
}

.image {
  border-style: double;
  border-color: #92C67D;
  border-radius: 50px;
  width: 400px;
  height:300px;
}

.center {
  width: 70%;
}

.cardSymbols {
  position: relative;
}

.btn{
  display:block; background-color: #92C67D; border-color: white
}
</style>
