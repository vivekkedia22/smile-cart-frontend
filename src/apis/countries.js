import axios from "axios";

const fetch = () => axios.get("/countries");

export const countriesApi = { fetch };
