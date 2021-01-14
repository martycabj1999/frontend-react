import Repository from "../Repository";
const resource = "/users";

export default {
    getUsers() {
        return Repository.get(`${resource}/admin`);
    }
};
