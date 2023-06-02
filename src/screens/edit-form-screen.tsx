import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Column from "../features/core/components/column";
import PrivateLayout from "../features/core/components/private-layout";
import useRequest from "../features/core/hooks/use-request";
import QuestionsForm from "../features/forms/components/questions-form";
import findFormService from "../features/forms/services/find-form-service";

export default function EditFormScreen() {
  const { formId } = useParams();

  const { data } = useRequest({
    requestFn: () => findFormService(formId ?? ""),
    requestKey: ["/questionarios", formId],
  });

  return (
    <PrivateLayout>
      <Container>
        <Column className="justify-center items-center py-8 space-y-4">
          <Typography className="underline underline-offset-8 decoration-2 decoration-blue-600">
            Editar questionário
          </Typography>
          <QuestionsForm isEditing={true} initialValues={data} />
        </Column>
      </Container>
    </PrivateLayout>
  );
}
