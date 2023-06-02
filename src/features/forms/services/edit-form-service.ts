import { api } from "../../../config/api";
import { FormType } from "../types/form-type";
import { QuestionType } from "../types/question-type";

type EditFormParams = {
  usuario: string;
  nome: string;
  descricao: string;
  perguntas: Omit<QuestionType, "cod_questionario" | "cod" | "data">;
};

async function editFormService(
  formId: string,
  form: EditFormParams
): Promise<FormType> {
  try {
    const response = await api.patch<FormType>(
      `/questionarios/${formId}`,
      form
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default editFormService;
