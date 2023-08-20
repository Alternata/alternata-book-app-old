import axios from "axios";
import { useAuth0 } from "react-native-auth0";

export default function useAxios() {
  const { authorize, getCredentials } = useAuth0();

  const baseUrl = "https://alternata-book.vercel.app/api";

  async function getAuthorizedToken() {
    const tokenExpired =
      (await getCredentials()).expiresAt - Date.now() / 1000 <= 0;
    if (tokenExpired) await authorize();
    return (await getCredentials()).idToken;
  }

  async function get(url: string) {
    const token = await getAuthorizedToken();
    return axios.get(baseUrl + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  async function post(url: string, data: any | undefined) {
    const token = await getAuthorizedToken();
    return axios.post(baseUrl + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  async function patch(url: string, data: any | undefined) {
    const token = await getAuthorizedToken();
    return axios.patch(baseUrl + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  return { get, post, patch, getAuthorizedToken };
}
