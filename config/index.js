import { config } from "dotenv";

config();

export const API_KEY = process.env.API_KEY;
export const BASE_URL = process.env.BASE_URL;
export const PORT = process.env.PORT || 3000;
export const CORE_OPTIONS = {
  origin: process.env.ORIGIN,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
};
