import axios from "axios"


const axiosConnection = axios.create({
  baseURL : `http://[::1]:3000`
})


export default axiosConnection