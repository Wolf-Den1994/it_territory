import { IDataApi } from '../utils/types';

const BASE_URL = 'https://agile-atoll-71070.herokuapp.com/api';

export const getAllApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (response.ok === true) {
      const todos = await response.json();
      return todos;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postApi = async (valueInput: string) => {
  try {
    const response = await fetch(`${BASE_URL}/list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo: valueInput }),
    });

    if (response.ok === true) {
      const todo = await response.json();
      return todo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const putApi = async (
  id: number,
  isComplite: boolean,
  valueInput: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/list`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, isComplite, todo: valueInput }),
    });

    if (response.ok === true) {
      const todo = await response.json();
      return todo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const delApi = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/list/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    if (response.ok === true) {
      const todo = await response.json();
      return todo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postAllApi = async (todos: IDataApi[]) => {
  try {
    const response = await fetch(`${BASE_URL}/alllist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo: todos }),
    });

    if (response.ok === true) {
      const todo = await response.json();
      return todo;
    }
  } catch (error) {
    console.error(error);
  }
};
