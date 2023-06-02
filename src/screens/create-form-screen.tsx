import { Container } from "@mui/material";
import Column from "../features/core/components/column";
import PrivateLayout from "../features/core/components/private-layout";
import QuestionsForm from "../features/forms/components/questions-form";

export default function CreateFormScreen() {
  return (
    <PrivateLayout>
      <Container>
        <Column className="justify-center items-center py-8">
          <QuestionsForm />
        </Column>
      </Container>
    </PrivateLayout>
  );
}
