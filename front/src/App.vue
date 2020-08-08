<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Cute Font' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Cormorant Infant' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Acme' rel='stylesheet'>

    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'main' }">
          <img src="./assets/home.png" style="  margin-right:10px; width: 25px; position:relative; bottom: 6px" />Home
        </b-nav-item>
         <b-nav-item :to="{ name: 'search' }">
          <img src="./assets/search.png" style= "margin-right:10px; width: 25px; position:relative; bottom: 6px"  />Search
        </b-nav-item>
         <b-nav-item :to="{ name: 'about' }">
          <img src="./assets/info.png"  style= "margin-right:10px; width: 25px; position:relative; bottom: 6px" />About
        </b-nav-item>     
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
          <span v-if="!$root.store.username">
            <a id="guest">
              Hello Guest
        </a>  
          <router-link tag="button" class="btn btn-outline-light" to="/register" style="margin-right:10px" >Register</router-link>
          <router-link tag="button" class="btn btn-outline-light" to="/login" style="margin-right:10px" >Login</router-link>
        </span>
        <span v-else style="margin-right:10px" >
          <span class="myinfo">
              <a href="#/MyMeal" class="notification">
           <span>
            <img src="./assets/tray.png" style="width: 35px; height:35px" />
            <span class="badge">{{cart}}</span>
            </span>
          </a>
        </span>     
        
        <span v-if="$root.store.username">
             <a id="guest">
              Hello {{ $root.store.username }}
        </a> 
          <b-dropdown text="My Area" style="margin-right:10px" split split-variant="outline-light" variant="light">
            <a class="dropdown-item" style="color:#F08080" href="#/favorite">My Favorites</a>
            <a class="dropdown-item" style="color:#F08080" href="#/myrecipes">My Recipes</a>
            <a class="dropdown-item" style="color:#F08080" href="#/familyRecipesPage">Family Recipes</a>
          </b-dropdown>
        </span>
               <a href @click="Logout" tag="button" class="btn btn-outline-light">Logout</a>

        </span>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import { eventBus } from "./main.js";
export default {
  name: "App",
  data() {
    return {
      cart: 0,
      username2:""
    };
  },
  async created() {
    eventBus.$on("fireMethod", () => {
      this.newLoad();
    });
    this.newLoad();
  },
  async mounted(){
    this.$forceUpdate;
      if(this.$root.store.username){
          this.username2="hello " + this.$root.store.username;
    }
  },
  methods: {
    async Logout() {
      this.$root.store.logout();
      console.log("toast");
      this.$root.toast("Logout", "User logged out successfully", "success");
      await this.axios.post(`https://backend3-2.herokuapp.com/Logout`);
      if (this.$route.name === "main") {
        this.$forceUpdate;
      } else {
        this.$router.push("/");
      }
    },
    async newLoad() {
      if (this.$root.store.username) {
        let response = await this.axios.get(
          `https://backend3-2.herokuapp.com/user/makeRecipeGetAll`
        );
        console.log(response);
        this.cart = response.data.length;
      }
    }
  }
};
</script>

<style lang="scss">


// .a, a:hover, a:focus, a:active , a:visited, a:link{
//       text-decoration: inherit;
//       color: inherit; 
//       all: unset;
//  }

#app {
      font-family: 'Acme';font-size: 22px;

  // font-family: 'Cormorant Infant';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #504f2c;
  min-height: 100vh;
    background:url("./assets/bg3.png")no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#nav {
      font-family: 'Acme';font-size: 22px;
	padding: 10px 10px;
  color: whitesmoke;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
}

#userName {
  right: 1%;
  color: whitesmoke;
  position: absolute;
  font-size: 200%;
  top: 30%;
  font-family: 'Acme';font-size: 22px;

}


#dd * {
  background-color: black;
}


.notification .badge {
  position: relative;
  left:-3%;
  top: -15%;
  padding: 2px 5px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 13px;
}

#btnDrop {
  border-color: #e7e7e7;
  color: black;
  border-width: medium;
  background-color: none;
}
#btnDrop :hover {
  background: #e7e7e7;
}

.circular--portrait { 
  position: relative; 
  width: 200px; 
  height: 200px; 
  overflow: hidden; 
  border-radius: 50%;} 

   .circular--portrait img { 
     width: 100%;
    height: auto; 
    }

    .profile{
       width: 40px;
    height: 40px; 
    }

 .navbar.navbar-dark.bg-dark{
    background-color: #FA8072 !important;
 }

 #guest{
   font-size: initial;
   position: relative;
   top: 5px;
   margin-right: 5px;
   color: white;
 }

</style>
