import axios from 'axios';

// const instance = axios.create({
//   baseURL: `http://localhost:4000/`,
// });

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:4000/";

const instance = axios.create({ baseURL: API_ROOT });

export default instance;

// instance.get('/hi').then((data) => console.log(data));
// yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-arrow-functions dotenv-defaults mongoose