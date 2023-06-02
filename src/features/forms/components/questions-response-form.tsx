import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Column from "../../core/components/column";
import Row from "../../core/components/row";
import { useToast } from "../../core/hooks/use-toast";
import answerFormService from "../services/answer-form-service";
import findFormService from "../services/find-form-service";
import { FormType } from "../types/form-type";
import { QuestionType } from "../types/question-type";

type QuestionsResponseFormProps = {
  formId: string;
};

type PerguntaRespostaType = {
  pergunta: string;
  usuario: string;
  descricao: string;
};

export default function QuestionsResponseForm({
  formId,
}: QuestionsResponseFormProps) {
  const { register, handleSubmit } = useForm<Record<string, string>>();
  const [form, setForm] = React.useState<FormType | null>(null);
  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await findFormService(formId);
        setForm(form);
      } catch (error) {
        console.error(error);
      }
    };

    fetchForm();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const respostas: PerguntaRespostaType[] =
        form?.perguntas.map((pergunta: QuestionType) => {
          return {
            pergunta: pergunta.cod,
            usuario: "5d0b4214-6e89-4a31-be5b-0948f9b5c829", // MOCKED USER ID
            descricao: data[`pergunta-${pergunta.cod}`] || "",
          };
        }) || [];

      if (respostas.length > 0 && form) {
        await Promise.all(
          respostas.map((resposta) => answerFormService(form.cod, resposta))
        );
        showSuccess({ message: "Questionário respondido com sucesso!" });
        navigate("/questionarios");
      }
    } catch (error: any) {
      showError({ message: error.message });
      console.error(error);
    }
  };

  return (
    <Column className="items-center">
      {form && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Column className="border space-y-8 rounded-lg p-8 min-h-[600px] min-w-[700px] shadow hover:border-blue-100 transition-all items-center justify-between">
            <Column className="items-center space-y-4">
              <Typography fontWeight={"bold"} variant="h6">
                {form?.nome}
              </Typography>
              <Typography variant="body2">{form?.descricao}</Typography>
            </Column>
            <Column className="space-y-4">
              {form.perguntas.length === 0 ? (
                <Typography className="text-gray-400">
                  Nenhuma pergunta a ser exibida.
                </Typography>
              ) : (
                form?.perguntas.map((pergunta: QuestionType) => (
                  <div key={pergunta.cod}>
                    <Typography>{pergunta.descricao}</Typography>
                    <Row className="w-96">
                      <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...register(`pergunta-${pergunta.cod}`)}
                      />
                    </Row>
                  </div>
                ))
              )}
            </Column>
            <Column className="py-8">
              <Button type="submit" variant="contained" color="primary">
                Enviar Resposta
              </Button>
            </Column>
          </Column>
        </form>
      )}
    </Column>
  );
}
