import { Container } from "@mui/material";
import PrivateLayout from "../features/core/components/private-layout";
import FormsTable from "../features/forms/components/forms-table";

export default function FormsScreen() {
  return (
    <PrivateLayout>
      <Container>
        <FormsTable />
      </Container>
    </PrivateLayout>
  );
}
