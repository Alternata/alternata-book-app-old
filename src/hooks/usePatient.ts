import useSWR from "swr";
import useAxios from "./useAxios";

export default function usePatient() {
  const { get } = useAxios();

  const swr = useSWR("/patient/profile", async function (url) {
    const { patient } = (await get(url)).data;
    return patient;
  });

  const patient: Patient = swr.data;

  return { patient, ...swr };
}
