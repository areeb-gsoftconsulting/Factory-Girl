import ApiConfig from "../config/apiConfig";

export default async function api(path: string, body: any, method: string) {
  let urlPath = ApiConfig.BASE_URL + path;

  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && {
      body: JSON.stringify(body),
    }),
  };
  console.log({ urlPath });
  return fetch(urlPath, { ...options })
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((error) => {
      return error;
    });
}
