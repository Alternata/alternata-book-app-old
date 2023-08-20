interface IAppointment
  extends Omit<Appointment, "patient" | "doctor" | "clinic"> {
  patient: Patient;
  doctor: Doctor;
  clinic: Clinic;
}
