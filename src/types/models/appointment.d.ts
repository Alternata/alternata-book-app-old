type Appointment = {
  _id: string;
  patient: string;
  doctor: string;
  clinic: string;
  appointment_at: Date;
  status: "pending" | "confirmed" | "rejected" | "canceled" | "completed";
  purpose: string;
  remarks: string;
  timestamps: {
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
  };
};
