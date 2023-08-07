import httpService from "./http.service";
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
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload.id,
            payload
        );
        return data;
    },
    deleteProd: async (payload) => {
        console.log(payload);
        const { data } = await httpService.delete(productEndpoint + payload);
        return data;
    }
};
export default productService;
