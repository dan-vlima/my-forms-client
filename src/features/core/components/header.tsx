import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Row from "./row";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <Row className="flex h-20 border-b border-gray-300 bg-gray-100 px-8 items-center sticky top-0 z-50 shrink-0 min-w-[800px] md-shrink-0">
      <Row className="items-center space-x-2 absolute left-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/169/169126.png"
          className="h-7 w-7"
          alt="My Forms Logo"
        />
        <Typography variant="subtitle1">My Forms</Typography>
      </Row>
      <Row className="space-x-8 mx-auto">
        <Row
          className={`${
            (pathname === "/questionarios" || pathname === "/") &&
            "underline underline-offset-8 decoration decoration-2 decoration-blue-600"
          }`}
        >
          <Link to={"/questionarios"}>
            <Typography>Todos os questionários</Typography>
          </Link>
        </Row>

        <Row
          className={`border-l border-gray-300 px-8 ${
            pathname === "/questionarios/criar" &&
            "underline underline-offset-8 decoration decoration-2 decoration-blue-600"
          }`}
        >
          <Link to={"/questionarios/criar"}>
            <Typography>Criar questionário</Typography>
          </Link>
        </Row>
      </Row>
      <Row className="items-center rounded-full bg-blue-100 border border-blue-500 h-12 w-12 absolute right-8 justify-center">
        <Typography className="text-blue-500">D</Typography>
      </Row>
    </Row>
  );
}
