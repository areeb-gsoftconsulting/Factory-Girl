import ApiConfig from "../config/apiConfig";
import api from "./client";

export const chatApi = (param: any) => {
  return api(ApiConfig.CHAT, param, "POST");
};
