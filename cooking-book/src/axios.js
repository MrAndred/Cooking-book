import axios from "axios";
import { BACKEND_URI } from "./config";

export const instance = axios.create({
  baseURL: BACKEND_URI,
  timeout: 1000,
});