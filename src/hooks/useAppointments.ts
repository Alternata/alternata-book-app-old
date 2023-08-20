import useSWR from "swr";
import useAxios from "./useAxios";

export default function useAppointments() {
  const { get } = useAxios();

  const swr = useSWR("/patient/appointments", async function (url: string) {
    const { appointments } = (await get(url)).data;
    return appointments;
  });

  const appointments: IAppointment[] = swr.data;

  return { appointments, ...swr };
}
