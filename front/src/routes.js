import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/register",
    name: "register",
    component: ()=> import("./pages/RegisterPage")
  },
  {
    path: "/recipe/:recipe_Id",
    name: "recipe",
    component: ()=> import("./pages/RecipeViewPage"),
    props: true 
  },
  {
    path: "/search/",
    name: "search",
    component: ()=> import("./pages/SearchPage")
  },
  {
    path: "/favorite/",
    name: "favorite",
    component: ()=> import("./pages/FavoritePage")
  },
  {
    path: "/familyView/",
    name: "familyView",
    component: ()=> import("./pages/FamilyViewPage")
  },
  {
    path: "/familyRecipesPage/",
    name: "familyRecipesPage",
    component: ()=> import("./pages/FamilyRecipesPage")
  },
  {
    path: "/myrecipes/",
    name: "myrecipes",
    component: ()=> import("./pages/MyRecipesPage")
  },
  {
    path: "/about/",
    name: "about",
    component: ()=> import("./pages/AboutPage")
  },
  {
    path: "/MakePage/:recipe_Id/:type", //1.recipe 2.private 3.family
    name: "MakePage",
    component: ()=> import("./pages/MakeRecipePage"),
    props: true
  },
  {
    path: "/MyMeal",
    name: "MyMeal",
    component: ()=> import("./pages/MyMealPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
