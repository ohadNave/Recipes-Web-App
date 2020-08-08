<template>
  <div id="container">
    <h1 style="position: relative; right: -400px;">My Meal</h1>
    <div style="position: relative; right: -810px;">
    <b-button  v-if="!sortClicked" @click="sortBtn()">Sort</b-button>
    <b-button   v-if="sortClicked" @click="endsortBtn()">Ok</b-button>
    <b-button class="ml-2 w-2" variant="danger" v-if="!sortClicked" @click="delAllBtn()">Delete All</b-button>
    </div>
    <br>
    <br>
    <ol>
    <b-card-group>
    <div v-for="recipe in this.recipes" :key="recipe.rank">
        <li style="font-size:1.5rem">
          <br>
        <b-card :img-src="recipe.image" img-alt="Card image" img-top>
      <b-card-title>{{recipe.title}}</b-card-title>
      <b-progress v-if="recipe.start && recipe.value>0">
      <b-progress-bar :value="recipe.value" :max="recipe.max" show-progress animated>{{recipe.value}}/{{recipe.max}}</b-progress-bar>
      </b-progress>
      <br v-if="recipe.start && recipe.value>0">
      <div v-if="!sortClicked">
        <router-link :to="{ name: 'MakePage', params: {recipe_Id: recipe.recipe_id, type:recipe.type} }" >
          <b-button variant="success" v-if="recipe.start  && recipe.value>0">Continue</b-button>
          <b-button v-else variant="success">Start Cooking</b-button>
        </router-link>
        <b-button class="ml-2 w-2" variant="danger" @click="deleteRecipe(recipe)">Delete</b-button>
      </div>   
      <div v-else>
        <b-button variant="success" v-if="recipe.rank>=counter"  @click="pickmeBtn(recipe)">Pick me to be {{counter}}</b-button>
        <b-button variant="danger" v-else @click="CancelBtn(recipe)">Cancel</b-button>
      </div>     
      </b-card>
        </li>
        <br>
    </div>
    </b-card-group>
    </ol>
    <br>
  </div>
</template>

<script>
import {eventBus} from "../main.js";
export default {
  name:"MyMeal",
  data() {
    return {
      recipes: [],
      sortClicked:false,
      counter:1
    };
  },
  async mounted() {
    this.getData();
  },
  methods:{
      async getData(){
            let response = await this.axios.get(
      `https://backend3-2.herokuapp.com/user/makeRecipeGetAll`
    );
            console.log(response);
        this.recipes=[];
        this.recipes.push(...response.data);
        this.sortedRecipes();
        this.getInstrcData();

      },
    getInstrcData(){
     for(let i=0;i<this.recipes.length;i++){
        let path="/MakePage/"+this.recipes[i].recipe_id.replace(" ","%20")+"/"+this.recipes[i].type;
         if(this.$root.store.MakeHistory.has(path)){
             let data=this.$root.store.MakeHistory.get(path);
            this.recipes[i].start=true;
             this.recipes[i].max=data.length;
           this.recipes[i].value=this.getValue(data);
         }else{
            this.recipes[i].start=false;
      }
    }
  },
    getValue(arr){
    let count=0;
    for(let i=0;i<arr.length;i++){
      if(arr[i]==true){
        count++;
      }
    }
    return count;
  },
  sortBtn(){
    this.counter=1;
    this.sortedRecipes();
    this.sortClicked=true;
  },
  sortedRecipes(){
    this.recipes.sort((a,b) => (a.rank > b.rank) ? 1 : -1);
  },
  async endsortBtn(){
    await this.axios.post(
      `https://backend3-2.herokuapp.com/user/makeRecipeUpdate`,{
        recipes: this.recipes
      });
        this.sortClicked=false;
  },
  pickmeBtn(recipe){
    let tmprecipe=this.recipes[this.counter-1];
    this.recipes[this.counter-1]=recipe;
    this.recipes[recipe.rank-1]=tmprecipe;
    tmprecipe.rank=recipe.rank;
    recipe.rank=this.counter;
    this.counter++;
    this.sortedRecipes();
  },
  CancelBtn(recipe){
    let i=recipe.rank;
    for(i;i<this.counter-1;i++){
      this.recipes[i].rank--;
    }
    recipe.rank=this.counter-1;
    this.counter--;
    this.sortedRecipes();
  },
  async deleteRecipe(recipe){
    let path="/MakePage/"+recipe.recipe_id.replace(" ","%20")+"/"+recipe.type;
    let newRecipes=[];
    let count=1;
    for(let i=0;i<this.recipes.length;i++){
      if(this.recipes[i]!==recipe){
        newRecipes.push(this.recipes[i]);
        this.recipes[i]=count;
        count++;
      }
    }
    this.recipes=[];
    this.recipes.push(...newRecipes);
    this.$root.store.MakeHistory.delete(path);
    localStorage.myMap = JSON.stringify(Array.from(this.$root.store.MakeHistory.entries()));
    await this.axios.get(
      `https://backend3-2.herokuapp.com/user/makeRecipeDelete/recipe_id/${recipe.recipe_id}`);
    this.sortedRecipes();
    eventBus.$emit('fireMethod');
  },
  async delAllBtn(){
     await this.axios.get(
      `https://backend3-2.herokuapp.com/user/makeRecipeDeleteAll`);
      this.recipes=[];
      this.$root.store.MakeHistory.clear();
      localStorage.myMap = JSON.stringify(Array.from(this.$root.store.MakeHistory.entries()));
       eventBus.$emit('fireMethod');
  }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 50%;
  margin: 50px;
}

.recipe-image {
  width: 400px;
  height: 350px;
  float:Left;
}

.card-img-top {
  width: 60vw;
  height: 15vw; 
  object-fit: cover; }

  .MMbtn{
  position: relative;
   right: 400px;
    
  }

  

</style>