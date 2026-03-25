import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => axios.get(`${BASE_URL}/all`).then((res) => res.data);

const getByName = (name) =>
  axios.get(`${BASE_URL}/name/${name}`).then((res) => res.data);

export default { getAll, getByName };
