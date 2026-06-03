import { api } from "./api";
import type{ FilterValue } from "../types/report";

export async function searchStudents(
  filters: Record<string, FilterValue>
) {
  console.log(filters);

  const response = await api.post(
    "/students/search",
    filters
  );

  return response.data;
}