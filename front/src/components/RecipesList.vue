<template>
<div class="container">
  <b-container>
    <h3>
      {{ title }}
    </h3>
      <b-row v-for="r in recipes" :key="r.id">
        <div>
          <RecipePreview  :title="recipe_type"  :recipe="r" class="recipePrv"/>
        </div>
        <br>
      </b-row>
  </b-container>
</div>
</template>

<script>
import RecipePreview from "./RecipePreview";
export default {
  name: "RecipesList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    recipes:{
      type:Array,
      required: true
    },
    recipe_type:{
      type:String,
      required:true,
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height:350px;
}

.recipePrv{
  height: 60%;
  width: min-content;
}


</style>
