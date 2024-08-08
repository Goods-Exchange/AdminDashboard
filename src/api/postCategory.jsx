import api from "./api";

export const getPostCategory = async () => {
    const response = await api.get(`/api/v1/Category/GetAllCategory`);
    return response.data;
};
export const getPostCategoryDetail = async () => {
    const response = await api.get(`/api/v1/Order/GetOrderDetail/${id}`);
    return response.data;
};

export const deletePostCategory = async (id) => {
    const response = await api.delete(`/api/v1/Category/DeleteCategory/${id}`);
    return response.data;
};

export const createPostCategory = async (data) => {
    const response = await api.post(`/api/v1/Category/CreateCategory`,data);
    return response.data;
};

export const updatePostCategory = async ({ data }) => {
    const response = await api.patch(`/api/v1/Category/UpdateCategory`, data);
    return response.data;
};