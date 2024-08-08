import api from "./api";

export const getPackages = async () => {
    const response = await api.get(`/api/v1/Subcription/GetAllSubscription`);
    return response.data;
};
export const getAllSubscription = async () => {
    const response = await api.get(`/api/v1/Subcription/GetAllSubscription`);
    return response.data;
};

export const getPackageDetail = async (id) => {
    const response = await api.get(`/api/v1/Subcription/SubscriptionDetail/${id}`);
    return response.data;
};

export const updatePackage = async (data) => {
    const response = await api.patch(`/api/v1/Subcription/UpdateSubscription`, data);
    return response.data;
};

export const createPackage = async (data) => {
    const response = await api.post(`/api/v1/Subcription/CreateSubscription`, data
      );
    return response.data;
};

export const deletePackage = async (id) => {
    const response = await api.delete(`/api/v1/Subcription/DeactiveSubscription/${id}`);
    return response.data;
};

export const buyPackage = async (data) => {
    const response = await api.post(`/api/v1/shops/packages`, data);
    return response.data;
};


export const setStandardPackage = async (susbcriptionId) => {
    const response = await api.patch(`/api/v1/Subcription/UnPrioritySubscription/${susbcriptionId}`);
    return response.data;
};

export const setPriorityPackage = async (susbcriptionId) => {
    const response = await api.patch(`/api/v1/Subcription/PrioritySubscription/${susbcriptionId}`);
    return response.data;
};