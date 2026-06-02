

import { api } from "./api";

export async function getReport(
  id: number
) {

  const response = await api.get(
    `/reports/${id}`
  );

  return response.data;
}