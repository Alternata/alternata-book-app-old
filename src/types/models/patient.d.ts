type Patient = {
  _id: string;
  auth0_sub: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: "male" | "female" | "prefer_not_say";
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  contact_no: string;
  weight: number;
  height: number;
  occupation: string;
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  allergies: string;
  timestamps: {
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
  };
};
