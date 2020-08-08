<template>
<div class="container">
    <h1 class="title">Serach</h1>
     <b-form @submit.prevent="onSearch"  @reset.prevent="onReset">
      <b-form-group id="input-group-query" label-cols-sm="3" label="Query:" label-for="query">
        <b-form-input id="query" type="text" v-model="form.query"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-resultnum" label-cols-sm="3" label="Num of results:" label-for="resultnum">
        <b-form-select id="resultnum" v-model="form.number" :options="resultNum"></b-form-select>
      </b-form-group>
         <b-form-group id="input-group-cuisine" label-cols-sm="3" label="Cuisine:" label-for="cuisine">
        <b-form-select id="cuisine" v-model="form.cuisine" :options="cuisines"></b-form-select>
      </b-form-group>
         <b-form-group id="input-group-diet" label-cols-sm="3" label="Diet:" label-for="diet">
        <b-form-select id="diet" v-model="form.diet" :options="diets"></b-form-select>
      </b-form-group>
        <b-form-group id="input-group-intolarence" label-cols-sm="3" label="Intolarence:" label-for="intolarence">
        <b-form-select id="intolarence" v-model="form.intolarence" :options="intolarences"></b-form-select>
      </b-form-group>
      <b-button type="reset" variant="dark">Reset</b-button>
       <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75 Sbtn">Search</b-button>
    </b-form>
    <br>
     <b-container v-if="results">
    <h3>
      Search Results:
    </h3>
    <b-form-group id="input-group-sort" label-cols-sm="8" label-for="sort">
        <span>Sort By:</span>
        <span><b-form-select id="sort" v-model="sort" :options="sortOption" @change="sortResults()"></b-form-select></span>
      </b-form-group>
      <RecipesList recipe_type="recipe" :recipes="recipes"/>
  </b-container>
  <b-container v-else>
    <h3>No Search Results</h3>
  </b-container>
</div>
</template>

<script>
import cuisines from "../assets/cuisine";
import diets from "../assets/diet";
import intolarences from "../assets/intolerances";
import RecipesList from "../components/RecipesList";
import cuisine from '../assets/cuisine';

export default {
  name: "Search",
  data() {
    return {
      form: {
        query: "",
        number: 5,
        cuisine: null,
        diet: null,
        intolarence: null,
      },
      cuisines: [{ value: null, text: "", disabled: false }],
      diets: [{ value: null, text: "", disabled: false }],
      intolarences: [{ value: null, text: "", disabled: false }],
      resultNum: [5,10,15],
      recipes: [],
      results: true,
      sort: "Sort by",
      sortOption: ["likes","time"],
    };
  },
  components:{
    RecipesList,
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolarences.push(...intolarences);
    if(this.$root.store.username){
      let history=localStorage.getItem(this.$root.store.username);
      if(history){
      const recipes = JSON.parse(localStorage.getItem(this.$root.store.username));
        this.recipes = [];
        this.recipes.push(...recipes);
      }
    }
  },
  methods: {
    sortResults(){
      if(this.sort === "likes"){
        this.recipes.sort((a,b) => (a.aggregateLikes < b.aggregateLikes) ? 1 : -1)
      }
      if(this.sort === "time"){
        this.recipes.sort((a,b) => (a.readyInMinutes > b.readyInMinutes) ? 1 : -1)
      }
      console.log(this.recipes);
    },
    async onSearch() {
      this.sort="";
      let response;
      try {
        let searchParmas={};
        if(this.form.cuisine !== null){
          searchParmas["cuisine"]=this.form.cuisine;
        }
        if(this.form.diet !== null){
          searchParmas["diet"]=this.form.diet;
        }
        if(this.form.intolarence !== null){
          searchParmas["intolerances"]=this.form.intolarence;
        }
        console.log(searchParmas);
        if(this.$root.store.username){
        response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/search/query/${this.form.query}/amount/${this.form.number}`,{params: searchParmas});
          localStorage.setItem(this.$root.store.username, JSON.stringify(response.data));
        }else{
          response = await this.axios.get(
          `https://backend3-2.herokuapp.com/recipes/search/query/${this.form.query}/amount/${this.form.number}`,{params: searchParmas});
        }
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        if(recipes.length == 0){
          this.results= false
        }else{
          this.results= true
        }
        this.$forceUpdate;
         console.log( response);
         

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
        return;
      }
    },
    onReset() {
      this.form = {
         query: "",
        number: 5,
        cuisine: null,
        diet: null,
        intolarence: null,
      };
       this.sort="";
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}

#lab{
  position:absolute;
  right:31%;
}

.recipePrv{
  height: 60%;
  width: min-content;
}

.Sbtn{
   background-color: #F08080; border-color: white
}

</style>