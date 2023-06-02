import { Typography } from "@mui/material";
import Column from "./column";

export default function Footer() {
  return (
    <Column className="flex h-20 items-center border-t border-gray-300 bg-gray-100 justify-center w-full z-50 md:shrink-0 min-w-[800px]">
      <Column className="items-center text-gray-500">
        <Typography>My Forms</Typography>
        <Typography>App pessoal criado por Dan Lima</Typography>
      </Column>
    </Column>
  );
}
