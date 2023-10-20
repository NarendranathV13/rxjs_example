import axios from 'axios';
const api = axios.create({
    baseURL: `https://6528e915931d71583df2912d.mockapi.io`,
});
  const GetAxiosData = (apiUrl, params) => {
    return api.get(apiUrl, { params });
  }
const PostAxiosData = (apiUrl, formData) => {
    return api
        .post(apiUrl, formData)
}
const DeleteAxiosData = (apiUrl) => {
    return api
        .delete(apiUrl)
}
const EditAxiosData = (apiUrl, formData) => {
    return api
        .put(apiUrl,formData)
}
export { GetAxiosData, PostAxiosData, DeleteAxiosData, EditAxiosData };