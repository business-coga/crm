import axios from 'axios';




axios.defaults.baseURL = 'http://quachthuyspa.lehoang.net:8033/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';


axios.init = function (){

}


export default axios
