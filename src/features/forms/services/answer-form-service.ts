import { api } from "../../../config/api";
import { FormType } from "../types/form-type";

export type AnswerFormParams = {
  pergunta?: string;
  usuario?: string;
  descricao?: string;
};

async function answerFormService(
  formId: string,
  answer?: AnswerFormParams
): Promise<FormType> {
  try {
    const response = await api.post<FormType>(
      `/questionarios/${formId}/respostas`,
      answer
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default answerFormService;
