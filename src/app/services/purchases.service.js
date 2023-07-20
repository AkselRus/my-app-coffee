import httpService from "./http.service";

const userPurchases = "purchases/";

const purchasesService = {
    create: async (payload) => {
        const { data } = await httpService.put(
            "user/" + payload.id + userPurchases + payload.id,
            payload
        );
        return data;
    }
    // update: async (payload) => {
    //     console.log("userService", payload);
    //     const { data } = await httpService.patch(
    //         "user/" + payload._id,
    //         payload
    //     );
    //     console.log("update data", data);
    //     return data;
    // }
};
export default purchasesService;
