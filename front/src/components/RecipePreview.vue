<template>
<div>
<div class ="card"  style="width: auto; padding:10px 10px " >
      <router-link :to="{ name: 'recipe', params: { recipe_Id: recipe.id,recipe_title: recipe.title, title: title } }" class="recipe-image">
      <img v-if="recipe.image" class="recipe-image" :src="recipe.image">
      <img v-else class="recipe-image" src="../assets/No_image.png">
        <div>
          <span>
          <img class="ribbon" src="../assets/ribbon.png"/>
          <img id="vvg" v-if="recipe.vegetarian" src="../assets/vegetarian.png"/>
          <img id="vvg" v-if="recipe.vegan" src="../assets/vegan.png"/>
          <img id="vvg" v-if="recipe.glutenFree" src="../assets/glutenFree.png"/>
          </span>
        </div>
      
      </router-link>
      <h5 class="card-title">{{recipe.title}}</h5>
      <span id ="card-body" style="font-size:15px">
          <p class="card-text">
            <span style="margin-right:7em">  <img id="symbol" src="../assets/clock.png" /> {{ recipe.readyInMinutes }} minutes </span>
            <span> <img id="symbol" src="../assets/like.png" />  {{ recipe.aggregateLikes }} </span>
          </p> 
          <div>
            <span v-if="$root.store.username && title=='recipe'">
              <span v-if="recipe.favorited" style="margin-right:7em"><img    id="symbol" src="../assets/fullHeart.png"/>In Favorites</span>
               <span v-else style="margin-right:5.5em"><img  id="symbol" src="../assets/Heart.png" onmouseover="this.src='https://res.cloudinary.com/da1ltmxeu/image/upload/v1592554778/PinClipart_ywtjsi.png'" @click="addToFavorite()" onmouseout="this.src='https://res.cloudinary.com/da1ltmxeu/image/upload/v1592554778/PinClipart.com_clipart-start_2022362_ypzg0o.png'" style="cursor: pointer;"/> Add to favorite</span>
                <span v-if="recipe.watched"><img    id="symbol" src="../assets/eyes.png"/> seen</span>
              <span v-else> <img    id="symbol" src="../assets/closed-eyes.png"/> unseen</span>
          </span>
         
          </div>
           </span>          
  </div>
  <br>

</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created(){
    if(this.recipe.id === undefined){
      this.recipe.id=this.recipe.title;
    }
  },
  methods: {
    async addToFavorite() {
      const response = await this.axios.get(
        `https://backend3-2.herokuapp.com/user/addtofavorites/recipe_id/${this.recipe.id}`
      );
      if (response.status == 200) {
        this.recipe.favorited = true;
        this.$forceUpdate;
      }
      console.log(response);
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
#symbol {
  width: 7%;
  height: 7%;
  position: relative;
  bottom: 8px;
}

#vvg {
  width: 7%;
  height: 7%;
  position: relative;
  top: -212px;
  left: 5px;
  border: black;
  margin-right:5px
}

.recipe-image:hover {
  opacity: 0.3;
  cursor: pointer;
}

.recipe-image{
   height: auto;
   width: 19rem;
   image-resolution:300dpi;
}

.float-right{
  float: right;
}

.ribbon{
  width: 40%;
  height: 15%;
  position: absolute;
  top: 5px;
  left: -10px;
}


</style>