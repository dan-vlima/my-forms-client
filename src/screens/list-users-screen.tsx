import useRequest from "../features/core/hooks/use-request";
import listUsersService from "../features/users/services/list-users-service";

export default function ListUsersScreen() {
  const { data, loading } = useRequest({
    requestFn: () => listUsersService(),
    requestKey: ["/usuarios"],
  });
  return (
    <div>
      {data?.map((user) => (
        <div>{user.nome}</div>
      ))}
    </div>
  );
}
