import Repository from "../Repository";
const resource = "/auth";

export default {
  auth(data) {
    return Repository.post(`${resource}/login`, data);
  },
  register(data) {
    return Repository.post(`${resource}/signup`, data);
  }
};
