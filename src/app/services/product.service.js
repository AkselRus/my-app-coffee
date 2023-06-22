import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const productEndpoint = "product/";

const productService = {
    fetchAll: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productEndpoint + payload.id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            productEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};
export default productService;
