export type QueryParams = Record<string, string | number>;

export const getQueryParams = (queryParams: QueryParams) => {
  return Object.entries(queryParams)
    .map((item) => item.join('='))
    .join('&');
};

export const handleErrors = (res: Response): Response => {
  if (!res.ok) {
    throw new Error(`Loading error occured (code: ${res.status})`);
  }
  if (!res.headers.get('Content-Type')?.includes('application/json')) {
    throw new Error('Invalid content-type in response');
  }
  return res;
};

export const fetchData = async (
  baseUrl: string,
  queryParams: QueryParams,
  requestInit?: RequestInit
) => {
  try {
    const res = handleErrors(await fetch(`${baseUrl}?${getQueryParams(queryParams)}`, requestInit));
    return await res.json();
  } catch (error) {
    throw error;
  }
};
