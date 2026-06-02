import { api } from "./api";

export async function searchStudents(
  filters: Record<string, string>
) {
  console.log(filters);

  const response = await api.post(
    "/students/search",
    filters
  );

  return response.data;
}