import {
  MagnifyingGlassCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateLayout from "../features/core/components/private-layout";
import useRequest from "../features/core/hooks/use-request";
import listFormsService from "../features/forms/services/list-forms-service";

export default function FormsScreen() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useRequest({
    requestFn: () => listFormsService({ page, limit }),
    requestKey: ["/questionarios"],
  });

  const navigate = useNavigate();

  function formatDate(stringData: string) {
    const hourDate = new Date(stringData);

    const formattedDate = hourDate
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");

    return formattedDate;
  }

  return (
    <PrivateLayout>
      <Container>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="my-8 border-2 border-blue-200 rounded-lg">
              <table className="table-auto shadow">
                <thead className=" bg-blue-50">
                  <tr className="rounded-lg">
                    <th className="px-16 py-2">Nome</th>
                    <th className="px-16 py-2">Descrição</th>
                    <th className="px-16 py-2">Data de criação</th>
                    <th className="px-8 py-2"></th>
                    <th className="px-8 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data?.map((form, index) => (
                      <tr key={form.cod} className="bg-blue-100  ">
                        <td className="border-2 border-r-blue-200 border-y-blue-200 px-16 py-2">
                          {form.nome}
                        </td>
                        <td className="border-2 border-r-blue-200 border-y-blue-200 px-16 py-2">
                          {form.descricao}
                        </td>
                        <td className="border-2 border-r-blue-200 border-y-blue-200 px-16 py-2 ">
                          {formatDate(form.data)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/questionarios/editar/${form.cod}`)
                          }
                          className="border-2 border-r-blue-200 border-y-blue-200 px-8 py-2 hover:cursor-pointer hover:bg-blue-200"
                        >
                          <PencilIcon
                            width={20}
                            height={20}
                            className="text-blue-500"
                          />
                        </td>
                        <td
                          onClick={() =>
                            navigate(`/questionarios/responder/${form.cod}`)
                          }
                          className="border-2 border-l-blue-200 border-y-blue-200 px-8 py-2 hover:cursor-pointer hover:bg-blue-200"
                        >
                          <MagnifyingGlassCircleIcon
                            width={20}
                            height={20}
                            className="text-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </PrivateLayout>
  );
}
