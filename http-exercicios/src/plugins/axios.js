//AXIOS DE FORMA GLOBAL
import Vue from 'vue'
import axios from 'axios'

/*url base para acessar o backend | Forma global
axios.defaults.baseURL = 'https://curso-vue-fed9f-default-rtdb.firebaseio.com/'*/Vue

Vue.use({
    install(Vue){
        /*$http poderá ser usado nos componentes | forma global
        Vue.prototype.$http = axios*/
        
        Vue.prototype.$http = axios.create({
            //URL BASE
            baseURL:'https://curso-vue-fed9f-default-rtdb.firebaseio.com/',
            headers:{
                //requisição apenas do tipo get
                get:{
                    "Authirization":"adc123"
                }
            }
        })
    }
})