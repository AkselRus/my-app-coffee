import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";
const userId = localStorageService.getUserId();

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + userId);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    addCart: async (payload) => {
        console.log(payload);
        const { data } = await httpService.put(
            userEndpoint + userId + "/purchases/" + payload.prodId,
            payload
        );
        return data;
    },
    getCart: async () => {
        const { data } = await httpService.get(
            userEndpoint + userId + "/purchases"
        );
        return data;
    },
    deleteItemPurchases: async (payload) => {
        const { data } = await httpService.delete(
            userEndpoint + userId + "/purchases/" + payload
        );
        return data;
    },
    deleteAllPurchases: async () => {
        const { data } = await httpService.delete(
            userEndpoint + userId + "/purchases"
        );
        return data;
    }
};
export default userService;
