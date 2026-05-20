import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001', // Using the port we set for the combined service
});

export const predictFraud = (data) => api.post('/api/v1/fraud/predict-fraud', data);
export const predictRisk = (data) => api.post('/api/v1/fraud/predict-risk', data);
export const createProduct = (data) => api.post('/api/v1/products/', data);
export const getProductHistory = (id) => api.get(`/api/v1/products/${id}/history`);
