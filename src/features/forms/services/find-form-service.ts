import { api } from "../../../config/api";
import { FormType } from "../types/form-type";

async function findFormService(formId?: string): Promise<FormType> {
  try {
    const response = await api.get<FormType>(`/questionarios/${formId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default findFormService;
