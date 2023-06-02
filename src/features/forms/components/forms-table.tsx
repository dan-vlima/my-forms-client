import {
  MagnifyingGlassCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import listFormsService from "../services/list-forms-service";
import { FormType } from "../types/form-type";

export default function FormsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<FormType[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setLoading(true);
    try {
      const forms = await listFormsService({ page: newPage, limit });
      setData(forms);
      setPage(newPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const forms = await listFormsService({ page, limit });
        setData(forms);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forms:", error);
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center w-full">Carregando...</div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="my-8 border-2 border-blue-200 rounded-lg">
            <div className="h-[550px] overflow-y-auto">
              <table className="table-auto w-full shadow">
                <thead className="bg-blue-50">
                  <tr className="rounded-lg">
                    <th className="w-60 h-12">Nome</th>
                    <th className="w-60 h-12">Descrição</th>
                    <th className="w-60 h-12">Data de criação</th>
                    <th className="w-4 h-4"></th>
                    <th className="w-4 h-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(10)
                    .fill(null)
                    .map((_, index) => {
                      const form = data?.[index];
                      return (
                        <tr key={index} className="bg-blue-100">
                          <td className="border-2 border-r-blue-200 border-y-blue-200 w-72 h-10 text-center">
                            {form?.nome}
                          </td>
                          <td className="border-2 border-r-blue-200 border-y-blue-200 w-60 h-12 text-center">
                            {form?.descricao}
                          </td>
                          <td className="border-2 border-r-blue-200 border-y-blue-200 w-60 h-12 text-center">
                            {form ? formatDate(form.data) : ""}
                          </td>
                          <td
                            onClick={() =>
                              form &&
                              navigate(`/questionarios/editar/${form.cod}`)
                            }
                            className="border-2 border-r-blue-200 border-y-blue-200 w-24  hover:cursor-pointer hover:bg-blue-200"
                          >
                            {form && (
                              <PencilIcon
                                width={20}
                                height={20}
                                className="text-blue-500 w-full self-center"
                              />
                            )}
                          </td>
                          <td
                            onClick={() =>
                              form &&
                              navigate(`/questionarios/responder/${form.cod}`)
                            }
                            className="border-2 border-l-blue-200 border-y-blue-200 w-24 hover:cursor-pointer hover:bg-blue-200"
                          >
                            {form && (
                              <MagnifyingGlassCircleIcon
                                width={20}
                                height={20}
                                className="text-blue-500 w-full self-center"
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Stack className="items-center py-2" spacing={2}>
              <Pagination
                count={10}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}
