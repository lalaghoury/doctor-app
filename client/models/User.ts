import { z } from "zod";

export const UserSignupSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
            val
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .trim()
      .min(1),
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .refine(
        (phone) => /^\+\d{1}\s*\(\d{3}\)\s*\d{3}-\d{4}$/.test(phone),
        "Invalid phone number"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UserSigninSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
          val
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const DoctorSignupSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
            val
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .trim()
      .min(1),
    phone: z
      .string({
        required_error: "Phone number is required",
      })
      .refine(
        (phone) => /^\+\d{1}\s*\(\d{3}\)\s*\d{3}-\d{4}$/.test(phone),
        "Invalid phone number"
      ),
    birthDate: z.coerce.date({
      required_error: "Date of birth is required",
    }),
    speciality: z
      .string({
        required_error: "Speciality is required",
      })
      .min(2, "Occupation must be at least 2 characters")
      .max(500, "Occupation must be at most 500 characters"),
    gender: z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    address: z
      .string({
        required_error: "Address is required",
      })
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address must be at most 500 characters"),
    degreeName: z
      .string({
        required_error: "Degree name is required",
      })
      .min(5, "Degree name must be at least 5 characters")
      .max(150, "Degree name must be at most 500 characters"),
    degreeType: z.string({
      required_error: "Degree type is required",
    }),
    degreeVerificationType: z.string({
      required_error: "Degree type is required",
    }),
    degreeInstitution: z
      .string({
        required_error: "Degree institution is required",
      })
      .min(10, "Degree institution must be at least 5 characters")
      .max(150, "Degree institution must be at most 500 characters"),
    degreeYear: z.coerce
      .number({
        required_error: "Degree completing year is required",
      })
      .min(1900, "Degree completing year must be at least 1900")
      .max(
        new Date().getFullYear() - 3,
        "Degree completing year must be within the last 3 years"
      ),
    degreeCity: z.string({
      required_error: "Degree city is required",
    }),
    degreeState: z
      .string()
      .min(5, "Degree state must be at least 5 characters")
      .max(50, "Degree state must be at most 50 characters")
      .nullable()
      .optional(),
    degreeCountry: z.string({
      required_error: "Degree country is required",
    }),
    degreeDescription: z
      .string()
      .min(5, "Degree description must be at least 5 characters")
      .max(50, "Degree description must be at most 50 characters")
      .optional(),
    attachments: z
      .array(
        z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
          message: "File size must be less than 5MB",
        })
      )
      .min(1, {
        message: "Minimum 1 attachment is required",
      })
      .max(5, {
        message: "Maximum 5 attachment are allowed",
      }),
    appearanceConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to appearance as a doctor to proceed",
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to disclosure in order to proceed",
      }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "You must consent to privacy in order to proceed",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
  })
  .refine((data) => data.email.includes("@"), {
    message: "Invalid email address",
    path: ["email"],
  });

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
            val
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .trim()
      .min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;
export type DoctorSignup = z.infer<typeof DoctorSignupSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
