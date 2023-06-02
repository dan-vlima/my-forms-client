import { api } from "../../../config/api";
import { UserType } from "../types/user-type";

async function listUsersService(): Promise<UserType[]> {
  try {
    const response = await api.get<UserType[]>(`/usuarios`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default listUsersService;
