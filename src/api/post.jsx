import api from "./api";

export const getPost = async () => {
    const response = await api.get(`/api/v1/Post/GetAllPost`); //get all posts
    return response.data;
};
export const banPost = async (id) => {
    const response = await api.delete(`/api/v1/Post/BanPost/${id}`); //ban posst
    return response.data;
  };
  export const unbanPost = async (id) => {
    const response = await api.patch(`/api/v1/Post/UnbanPost/${id}`); //unban posst
    return response.data;
  };

export const getPostNewsFeed = async ({ pageNumber, pageSize }) => {
    const response = await api.get(`/api/v1/posts/news-feed?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    return response.data;
};

export const getCurrentAccountPost = async () => {
    const response = await api.get(`/api/v1/currentAccounts/posts`);
    return response.data;
};

export const createPost = async data => {
    const response = await api.post(`/api/v1/posts`, data
        , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    return response.data;
};

export const getPostDetail = async id => {
    const response = await api.get(`/api/v1/posts/${id}`);
    return response.data;
};


export const LikePost = async id => {
    const response = await api.post(`/api/v1/posts/${id}/likes`);
    return response.data;
};

export const UnlikePost = async id => {
    const response = await api.delete(`/api/v1/posts/${id}/likes`);
    return response.data;
};