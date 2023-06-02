import { api } from "../../../config/api";
import { FormType } from "../types/form-type";
import { QuestionType } from "../types/question-type";

type CreateFormParams = {
  usuario: string;
  nome: string;
  descricao: string;
  perguntas: Omit<QuestionType, "cod_questionario" | "cod" | "data">;
};

async function createFormService(form: CreateFormParams): Promise<FormType> {
  try {
    const response = await api.post<FormType>(`/questionarios/`, form);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default createFormService;
