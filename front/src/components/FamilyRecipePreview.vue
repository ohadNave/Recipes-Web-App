<template>
<div >
  <div class="card" style="width: 15.1rem">
  <router-link :to="{ name: 'familyView', params: {recipe_title: recipe.title} }">
    <img class="recipe-image" :src="recipe.image" :title="recipe.title">
    </router-link>
    <h5 style="padding: 5px;">{{recipe.title}}</h5>
       <p class="card-text" style="font-size:17px">
            <span style="margin-right:1em; padding: 5px;">  <img id="symbol" src="../assets/chef.png" /> {{ recipe.rec_source }} </span>
            <span> <img id="symbol" src="../assets/calendar.png" />  {{ recipe.holiday }} </span>
          </p> 
  </div>
  <br>
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
  }
};
</script>

<style>

.recipe-image:hover {
  opacity: 0.3;
  cursor: pointer;
}

.recipe-image{
   height: auto;
   width: 15rem;
   height: 13rem;
}

#symbol {
  width: 25px;
  height: 25px;
}

</style>
