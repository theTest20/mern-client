import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userProfile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userProfile')).token
    }`;
  }

  return req;
});
export const logIn = (formData) => API.post('users/login', formData);
export const singUp = (formData) => API.post('users/signup', formData);
export const updateUserData = (userData) => API.patch('users/updateMe', userData);
export const updatePassword = (newPassword) => API.patch('users/updateMyPassword/', newPassword);
export const deleteMyProfile = () => { API.delete(`users/deleteMe`);};
export const eforgotPassword = (email) =>
  API.post('users/forgotPassword', email);
export const resetPassword = (newPassword, token) =>
  API.patch(`users/resetPassword/${token}`, newPassword);

export const createPost = (postData) => API.post('/posts', postData, {
  headers: {
  'Content-Type': 'multipart/form-data'
   }
   });
export const getAllPosts = (searchW,page) => API.get(`/posts?search=${searchW}&page=${page}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const getUserPosts = (userId) => API.get(`/posts/userPosts/${userId}`);
export const updatePost = (id, updateDatas) =>
  API.patch(`/posts/${id}`, updateDatas, {
    headers: {
    'Content-Type': 'multipart/form-data'
     }
     });
export const deletePost = (id) => API.delete(`/posts/${id}`);
