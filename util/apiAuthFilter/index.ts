import account from "./account";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const apiUrlList: string[] = [...account];

export const isRequireAuth = (fullUrl: string | undefined) => {
  const apiUrl = fullUrl?.replace(BASE_URL, "") || "";
  return !apiUrlList.includes(apiUrl);
};
