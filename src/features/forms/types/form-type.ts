import { QuestionType } from "./question-type";

export type FormType = {
  cod: string;
  usuario: string;
  nome: string;
  descricao: string;
  data: string;
  perguntas: QuestionType[];
};
