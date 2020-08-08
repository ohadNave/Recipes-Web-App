<template>
  <div class="container">
    <div v-if="recipe">
    <h1>Make recipe on your own</h1>
    <br>
      <div><h2>{{ recipe.title }}</h2></div>
      <div>
        <img :src="recipe.image" class="image" />
        <label id="lab">
          <h4>Ingredients:</h4>
          <ol v-for="(ing,index) in recipe.extendedIngredients" :key="index" >{{ ing.amount * numOfServ }} {{ ing.unit }} {{ ing.name }}</ol>
        </label>
      </div>
        <div> 
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        <h4>Choose amount of servings:
        <img style="width: 5%; height: 5%; margin-right:10px" src="../assets/Meal.png" />
        <button style="border-color: black; margin-right:10px; font-weight: bold;" class="btn btn-light" v-on:click.prevent="decrement">-</button>
        <label style="margin-right:10px">{{recipe.servings * numOfServ}}</label>
        <button style="border-color: black; margin-right:10px; font-weight: bold;" class="btn btn-light" v-on:click.prevent="increment">+</button>
        </h4> 
        </div>
      <br>
    <div style="float:Left"><ChackList :instructions="analyzedInstruction" :chackListData="chackListData" /></div>
    </div>
  </div>
</template>

<script>
import ChackList from "../components/ChackList";
export default {
  name: "MakePage",
  components: {
    ChackList,
  },
  data() {
    return {
      recipe: null,
      analyzedInstruction: [],
      numOfServ:1,
      chackListData: null
    };
  },
  async created() {
    const type = this.$route.params.type;
    const id = this.$route.params.recipe_Id;
    let recipeRes;
    let analyzedRes;
    try {
      if (type === "1") {
        let path="";
        if(this.$root.store.username){
          path="user";
        }else{
          path="recipes";
        }
        recipeRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/${path}/specific/recipe_id/${id}`
        );
        analyzedRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/recipes/API_analyzed_instructions/recipe_id/${id}`
        );
      } else if (type === "2") {
        recipeRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/myspecificrecipe/recipe_name/${id}`
        );
        analyzedRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/private_analyzed_instructions/recipe_name/${id}`
        );
      }
      else if (type === "3") {
        recipeRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/specificfamilyrecipes/recipename/${id}`
        );
        analyzedRes = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/family_analyzed_instructions/recipe_name/${id}`
        );
      }
      console.log(recipeRes);
      console.log(analyzedRes);
      this.recipe = recipeRes.data;
      this.analyzedInstruction = analyzedRes.data;
      if(this.$root.store.username){
        let path=this.$route.path;
        if(this.$root.store.MakeHistory.has(path)){
          this.chackListData=this.$root.store.MakeHistory.get(path);
        }else{
        this.chackListData=new Array(this.analyzedInstruction.length).fill(false);
        this.$root.store.MakeHistory.set(path.replace(" ","%20"),this.chackListData);
      }
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods:{
    decrement(){
      if(this.numOfServ>1){
        this.numOfServ--;
      }
    },
    increment(){
        this.numOfServ++
    }
  }
};
</script>

<style>
#lab {
  position: relative;
  top: 70px;
  left: 10px;
}


.image {
  position: relative;
  border-style: double;
  border-color: #F08080;
  border-radius: 80px;
    width: 400px;
    float: left;
    top:60px;
}
</style>

