export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const DoctorIdentificationTypes = [
  "MD Degree",
  "Medical Residency Certificate",
  "Doctor of Osteopathic Medicine Certificate",
  "Doctor of Chiropractic Degree",
  "Registered Nurse Certificate",
  "Pharmacist License",
  "Physical Therapist Certificate",
  "Medical Assistant Certificate",
  "Dietitian Certificate",
  "Cardiology Certificate",
  "Pediatrics Certificate",
  "Psychiatry Certificate",
  "Nuclear Medicine Certificate",
  "Occupational Therapy Certificate",
  "Speech Therapy Certificate",
  "Physical Therapy Certificate",
  "Dietetics Certificate",
];

export const DoctorDegreeTypes = ["MD", "DDS", "DVM", "PhD"];

export const DoctorGegreesNames = [
  "Doctor of Medicine",
  "Doctor of Dental Surgery",
  "Doctor of Osteopathic Medicine",
  "Doctor of Chiropractic",
  "Registered Nurse",
  "Pharmacist",
  "Physical Therapist",
  "Medical Assistant",
  "Dietitian",
  "Cardiology",
  "Pediatrics",
  "Psychiatry",
  "Nuclear Medicine",
  "Occupational Therapy",
  "Speech Therapy",
  "Physical Therapy",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
  cómpleted: "/assets/icons/arrow.svg",
};
