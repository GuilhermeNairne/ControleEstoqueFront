import api from "../api";
import { LoggedUser } from "../context/contestTypes";

export function useUsuario() {
  async function updateUsuario(_id: string, body: Partial<LoggedUser>) {
    const { data } = await api.patch(`users/${_id}`, body);

    return data;
  }

  return { updateUsuario };
}
