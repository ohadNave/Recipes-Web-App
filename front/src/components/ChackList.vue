<template>
  <div class="container my-4">
    <hr />
    <p class="font-weight-bold">Analyzed instructions</p>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">Instruction</th>
          <th scope="col">Ingredients</th>
          <th scope="col">equipment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ins in instructions" :key="ins.number">
          <th scope="row">{{ins.number}}</th>
          <td>
            <div v-if="chackListData && chackListData[ins.number-1]" class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :id="ins.number" checked @change="saveState(ins.number)" />
              <label class="custom-control-label" :for="ins.number"></label>
            </div>
            <div v-else class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :id="ins.number" unchecked @change="saveState(ins.number)" />
              <label class="custom-control-label" :for="ins.number"></label>
            </div>
          </td>
          <td>{{ins.step}}</td>
          <td>
            <div v-for="(i,index) in ins.ingredients" :key="index">
            <label class="lab" @click=" isShow=!isShow" >{{i.name}}</label>
               <simple-modal v-model="isShow" title="Modal Header">
              <template slot="body">
                <h2>{{i.name}}</h2>
                <img :src="i.image">
              </template>
              <template slot="footer">
                <button>OK</button>
              </template>
            </simple-modal>
            </div>
          </td>
          <td>
            <label v-for="(i,index) in ins.equipment" :key="index">{{i.name}}</label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SimpleModal from "simple-modal-vue";
export default {
  props: {
    instructions: {
      type: Array,
      required: true
    },
    chackListData: {
      type: Array,
      required: false
    }

  },
  components: {
    SimpleModal
  },
  data() {
    return {
      isShow: false,
    };
  },

  methods:{
    saveState(i){
      if(this.$root.store.username){
       if(this.chackListData!==null){
         this.chackListData[i-1]= !this.chackListData[i-1];
         localStorage.myMap = JSON.stringify(Array.from(this.$root.store.MakeHistory.entries()));
       }
      } 
    }
  }
};
</script>

<style>
 .lab:hover{
 opacity: 0.3;
  cursor: pointer;
   }
</style>