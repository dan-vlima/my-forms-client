import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";

type ErrorType<T = unknown> = {
  code: string;
  message: string;
  payload: T;
};

type UseRequestType<Key, RequestFn> = {
  requestKey?: Key;
  requestFn: RequestFn;
  // @ts-ignore
  onSuccess?: (data: Awaited<ReturnType<RequestFn>>) => void;
  onError?: <T>(error: ErrorType<T>) => void;
} & (Key extends QueryKey
  ? Omit<
      UseQueryOptions<RequestFn, unknown, string>,
      "queryFn" | "queryKey" | "onSuccess" | "onError"
    >
  : Omit<
      UseMutationOptions<RequestFn>,
      "mutationFn" | "mutationKey" | "onSuccess" | "onError"
    >);

type UseRequestReturnType<RequestFn, Key> = {
  // @ts-ignore
  data?: Awaited<ReturnType<RequestFn>>;
  loading: boolean;
  error?: ErrorType;
} & (Key extends QueryKey ? { refetch: RequestFn } : { fetch: RequestFn });

export const useRequest = <Key = unknown, RequestFn = unknown>({
  requestFn,
  requestKey,
  ...params
}: UseRequestType<Key, RequestFn>) => {
  let data: any;
  if (requestKey) {
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    data = useQuery(requestKey, requestFn, params);
  } else {
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    data = useMutation(requestFn, params);
    data = { ...data, fetch: data.mutate };
  }

  return { ...data, loading: data.isLoading } as UseRequestReturnType<
    RequestFn,
    Key
  >;
};

export default useRequest;
