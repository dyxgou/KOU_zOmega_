import axios from "axios"


const instance = axios.create({
  baseURL : `http://[::1]:3000`
})


export default instance