import Repository from "../Repository";
const resource = "/wallets";

export default {
    getWallet(data) {
        return Repository.post(`${resource}/find`, data);
    },
    purchase(data) {
        return Repository.post(`${resource}/purchase`, data);
    },
    purchaseVerified(data) {
        return Repository.post(`${resource}/purchase/verified`, data);
    },
    updateWallet(data) {
        return Repository.put(`${resource}/update`, data);
    }
};
