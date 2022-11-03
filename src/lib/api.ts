import { IRentData, IRentDataWithoutId } from "../types/rent";

// api wrapper functions for API using fetch and add basic CRUD operations

const apiUrl = process.env.REACT_APP_API_URL as string;

export const getRentData = async (): Promise<IRentData[]> => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const createRentData = async (
  data: IRentDataWithoutId,
): Promise<IRentData> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateRentData = async (data: IRentData): Promise<IRentData> => {
  const response = await fetch(`${apiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const deleteRentData = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
