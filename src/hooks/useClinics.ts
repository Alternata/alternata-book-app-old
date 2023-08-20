import useSWR from "swr";
import useAxios from "./useAxios";

export default function useClinics() {
  const { get } = useAxios();

  const swr = useSWR("/patient/clinics", async function (url: string) {
    const { clinics } = (await get(url)).data;
    return clinics;
  });

  return swr;
}
