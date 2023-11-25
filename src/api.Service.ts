import axios from 'axios';

const API_BASE_URL = "https://v6.exchangerate-api.com/v6/";
const ACCESS_KEY = "c1759b98ad0793b9b0ad3d33";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

export const getLatestRates = async (base: string, target: string, amount: number) => {
  try {
    // Construct the URL as per the API format
    const response = await apiClient.get(`${ACCESS_KEY}/pair/${base}/${target}/${amount}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw error;
  }
};
