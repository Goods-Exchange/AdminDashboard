import api from "./api";

export const getAllOrders = async () => {
    const response = await api.get(
        `/api/v1/Order/GetAllOrder`
    );
    return response.data;
};

export const getOrdersFromShop = async (id, pageNumber, pageSize) => {
    const response = await api.get(
        `/api/v1/orders?ShopId=${id}&PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
    return response.data;
};

export const getOrderDetail = async (id) => {
    const response = await api.get(`/api/v1/Order/CancleOrder`);
    return response.data;
};

export const cancelOrder = async (id) => {
    const response = await api.put(`/api/v1/Order/CancleOrder/${id}`);
    return response.data;
};
