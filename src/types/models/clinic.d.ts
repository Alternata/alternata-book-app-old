type Clinic = {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  members: ClinicMember[];
  timestamps: {
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
  };
};

type ClinicMember = {
  doctor: string;
  role: "admin" | "affiliate";
};
