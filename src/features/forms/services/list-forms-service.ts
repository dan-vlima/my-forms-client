import { api } from "../../../config/api";
import { PaginationType } from "../../core/types/pagination-type";
import { FormType } from "../types/form-type";

async function listFormsService(props: PaginationType): Promise<FormType[]> {
  const { page, limit } = props;
  try {
    const response = await api.get<FormType[]>("/questionarios", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default listFormsService;
