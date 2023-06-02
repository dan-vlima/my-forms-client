import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Input, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Column from "../../core/components/column";
import Row from "../../core/components/row";
import createFormService from "../services/create-form-service";
import editFormService from "../services/edit-form-service";
import { QuestionType } from "../types/question-type";

export default function QuestionsForm({
  initialValues,
  isEditing = false,
}: {
  initialValues?: any;
  isEditing?: boolean;
}) {
  const { formId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "perguntas",
  });

  useEffect(() => {
    if (initialValues) {
      const perguntas = initialValues.perguntas || [];
      if (perguntas.length > 0) {
        setValue("perguntas", perguntas);
      }

      delete initialValues.perguntas;
      reset(initialValues);
    }
  }, [initialValues, setValue, reset]);

  const onSubmit = async (data: any) => {
    const questionario = {
      usuario: "5d0b4214-6e89-4a31-be5b-0948f9b5c829", // MOCKED USER ID
      nome: data.nome,
      descricao: data.descricao,
      perguntas: data.perguntas.map(
        (pergunta: QuestionType, index: number) => ({
          descricao: pergunta.descricao,
          indexNoQuestionario: index,
        })
      ),
    };

    try {
      if (isEditing && formId) {
        await editFormService(formId, questionario);
        toast.success("Questionário editado com sucesso!");
        navigate("/questionarios");
      } else {
        await createFormService(questionario);
        toast.success("Questionário criado com sucesso!");
        navigate("/questionarios");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Column className="space-y-4 border rounded-lg p-8 min-h-[600px] min-w-[800px] shadow hover:border-blue-100 transition-all">
        <Input
          style={{ textAlignLast: "center" }}
          placeholder="Título do questionário"
          {...register("nome", { required: true })}
        />
        {errors.nome && (
          <Typography className="self-center" color="error">
            Campo obrigatório
          </Typography>
        )}
        <Input
          style={{ textAlignLast: "center" }}
          placeholder="Descrição do questionário"
          {...register("descricao", { required: true })}
        />
        {errors.descricao && (
          <Typography className="self-center" color="error">
            Campo obrigatório
          </Typography>
        )}
        <Column className="flex-1 space-y-8 py-4">
          {fields.length === 0 ? (
            <Row className="justify-center items-center flex-1">
              <Typography fontSize={20} className="text-gray-400/60">
                Clique no botão esquerdo para adicionar perguntas
              </Typography>
            </Row>
          ) : (
            fields.map((item: any, index) => (
              <Row className="space-x-4 items-center" key={item.id}>
                <label>
                  <div className="w-28">
                    <Typography>Pergunta #{index + 1}</Typography>
                  </div>
                </label>
                <textarea
                  style={{
                    textAlign: "justify",
                    whiteSpace: "normal",
                    alignItems: "center",
                  }}
                  placeholder="Digite sua pergunta aqui"
                  className="bg-gray-200/70 flex-1 rounded-lg p-2"
                  {...register(`perguntas.${index}.descricao`, {
                    required: true,
                  })}
                  defaultValue={item.descricao}
                />
                {/* @ts-ignore */}
                {errors.perguntas && errors.perguntas[index] && (
                  <Typography color="error">
                    {/* @ts-ignore */}
                    {errors.perguntas[index].message}
                  </Typography>
                )}
                <Row>
                  <button
                    type="button"
                    className="transition-all"
                    onClick={() => remove(index)}
                  >
                    <XCircleIcon className="text-red-300 hover:text-red-600 rounded-full hover:bg-red-100 h-12 w-12" />
                  </button>
                </Row>
              </Row>
            ))
          )}
        </Column>
        <Row className="justify-between items-center text-center py-4 ">
          <Row className="px-2 items-center justify-center">
            <IconButton
              className="transition-all"
              onClick={() =>
                append({
                  cod: "",
                  descricao: "",
                  data: "",
                  usuario: "",
                  questionario: "",
                })
              }
            >
              <PlusCircleIcon className="h-12 w-12 text-blue-600" />
            </IconButton>
          </Row>
          <Button
            variant="outlined"
            type="submit"
            className="w-28 bg-red-200"
            value="Enviar"
          >
            <Typography>Enviar</Typography>
          </Button>
        </Row>
      </Column>
    </form>
  );
}
