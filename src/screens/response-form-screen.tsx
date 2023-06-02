import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Column from "../features/core/components/column";
import PrivateLayout from "../features/core/components/private-layout";
import SkeletonPlaceholder from "../features/core/components/skeleton-placeholder";
import QuestionsResponseForm from "../features/forms/components/questions-response-form";

export default function ResponseFormScreen() {
  const { formId } = useParams();

  if (!formId)
    return (
      <div className="flex flex-1 items-center">
        <SkeletonPlaceholder height={600} width={700} />
      </div>
    );

  return (
    <PrivateLayout>
      <Container>
        <Column className="py-8 space-y-4">
          <Typography className="underline underline-offset-8 decoration-2 decoration-blue-600 self-center">
            Responder questionário
          </Typography>
          <QuestionsResponseForm formId={formId} />
        </Column>
      </Container>
    </PrivateLayout>
  );
}
