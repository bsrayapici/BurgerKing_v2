import axios from 'axios';

// Varsayım: Controller'ınızın base URL'i
const API_URL = 'http://localhost:9001/burgers'; // /workintech kısmını backend yapılandırmanıza göre değiştirin

// CRUD İşlemleri
export const getAllBurgers = async () => {
    return axios.get(API_URL); // GET /burgers
};

export const getBurgerById = async (id) => {
    return axios.get(`${API_URL}/${id}`); // GET /burgers/{id}
};

export const createBurger = async (burgerData) => {
    return axios.post(API_URL, burgerData); // POST /burgers
};

export const updateBurger = async (id, burgerData) => {
    // Controller'da PUT /{id} kullanıldığı için ID'yi path'e ekliyoruz
    return axios.put(`${API_URL}/${id}`, burgerData); // PUT /burgers/{id}
};

export const deleteBurger = async (id) => {
    return axios.delete(`${API_URL}/${id}`); // DELETE /burgers/{id}
};

// Arama ve Filtreleme İşlemleri
export const searchByPrice = async (price) => {
    return axios.get(`${API_URL}/findByPrice`, { params: { price } }); // GET /burgers/findByPrice?price=...
};

export const searchByBreadType = async (breadType) => {
    return axios.get(`${API_URL}/findByBreadType`, { params: { breadType } }); // GET /burgers/findByBreadType?breadType=...
};

export const searchByContent = async (content) => {
    return axios.get(`${API_URL}/findByContent`, { params: { content } }); // GET /burgers/findByContent?content=...
};