import axios from 'axios';




axios.defaults.baseURL = 'http://nhahangchum.lehoang.net:8030/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';


axios.init = function (){

}


export default axios
