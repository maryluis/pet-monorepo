import { IUserRegistration } from '@../../types';

const BASE_URL = 'http://localhost:3001';

const URLS = {
  createUser: '/create-user',
};

const createUser = async(userData: IUserRegistration) => {
  const url = `${BASE_URL}${URLS.createUser}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // перетворюємо об'єкт в JSON
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User created successfully:', data);
    } else {
      const errorData = await response.json();
      console.log('Error:', errorData.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
};

export const API = {
  createUser,
};

export default API;
