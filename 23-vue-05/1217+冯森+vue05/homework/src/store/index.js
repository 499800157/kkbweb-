import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:100
    },
    mutations:{
        increment(state,payload){
            console.log(payload)
            // state.count = payload + 1
            state.count++
        },
        decrement(state){
            state.count--
        }
    }

})


export default store