"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { DoctorSignup, DoctorSignupSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  DoctorIdentificationTypes,
  DoctorDegreeTypes,
  DoctorGegreesNames,
} from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icons } from "../ui/icons";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { authThunks } from "@/lib/features/auth/authThunks";
import { Stepper } from "react-form-stepper";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {}

const DoctorSignUpForm = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<DoctorSignup>({
    resolver: zodResolver(DoctorSignupSchema),
  });

  function onSubmit(values: DoctorSignup) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value as string);
      }
    });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    dispatch(authThunks.doctorSignup({ values: formData }, router));
  }

  const handleNextStep = async () => {
    let keysToCheck: (keyof DoctorSignup)[] = [];

    if (activeStep === 0) {
      keysToCheck = [
        "name",
        "email",
        "phone",
        "birthDate",
        "speciality",
        "gender",
        "address",
      ] as const;
    } else if (activeStep === 1) {
      keysToCheck = [
        "degreeName",
        "degreeType",
        "degreeInstitution",
        "degreeYear",
        "degreeCity",
        "degreeCountry",
        "degreeVerificationType",
        "attachments",
      ] as const;
    } else if (activeStep === 2) {
      keysToCheck = [
        "appearanceConsent",
        "disclosureConsent",
        "privacyConsent",
        "password",
        "confirmPassword",
      ] as const;
    }

    const res = await form.trigger(keysToCheck);
    if (res) setActiveStep(activeStep + 1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full min-h-screen h-full flex items-center justify-center max-w-6xl mx-auto "
      >
        <Card className="w-full">
          <CardHeader>
            <div className="space-y-4">
              <CardTitle className="text-3xl">Welcome 👋</CardTitle>

              <p className="text-gray-500">Let us know more about yourself.</p>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <Stepper
              steps={[
                { label: "Personal Information" },
                { label: "Degree and Verfication" },
                { label: "Consent and Privacy" },
              ]}
              activeStep={activeStep}
            />

            {/* Personal Information */}
            {activeStep === 0 && (
              <>
                <CardTitle>
                  <h1 className="text-xl">Personal Information</h1>
                </CardTitle>

                {/* NAME */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="ex: Aasil Ghoury"
                />

                <div className="flex flex-col justify-center md:flex-row md:items-start gap-3 md:justify-between w-full">
                  {/* EMAIL */}
                  <CustomFormField
                    fieldType={FormFieldType.EMAIL}
                    control={form.control}
                    name="email"
                    label="Email Address"
                    placeholder="ex: abc@example.com"
                  />

                  {/* PHONE */}
                  <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="+00 0342 0453 34"
                  />
                </div>

                <div className="flex flex-col justify-center md:flex-row md:items-start gap-3 md:justify-between w-full">
                  {/* BirthDate */}
                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="birthDate"
                    label="Date of birth"
                  />

                  {/* Speciality */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="speciality"
                    label="Speciality"
                    placeholder="ex: Gynecologist"
                  />

                  {/* Gender */}
                  <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="gender"
                    label="Gender"
                    renderSkeleton={(field) => (
                      <FormControl>
                        <RadioGroup
                          className="flex h-11 gap-2 xl:justify-between"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {["Male", "Female", "Other"].map((option, i) => (
                            <div
                              key={option + i}
                              className="flex items-center space-x-2 px-5 rounded-md border-dashed border-2"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <Label
                                htmlFor={option}
                                className="cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </div>

                {/* Address  */}
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="ex: 14 street, New York, NY - 5101"
                />
              </>
            )}

            {/* Degree and Verfication */}
            {activeStep === 1 && (
              <>
                <CardTitle className="text-xl">
                  Degree and Verfication
                </CardTitle>

                {/* degreeName */}
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="degreeName"
                  label="Name of the Degree"
                  placeholder="Select a degree name "
                >
                  {DoctorGegreesNames.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </CustomFormField>

                {/* degreeType */}
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="degreeType"
                  label="Degree Type"
                  placeholder="Select a degree type"
                >
                  {DoctorDegreeTypes.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </CustomFormField>

                {/* degreeInstitution */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="degreeInstitution"
                  label="Institute Name (from where you got the degree)"
                  placeholder="ex: ABC University"
                />

                <div className="flex flex-col justify-center sm:flex-row gap-3 sm:items-start">
                  {/* degreeYear */}
                  <CustomFormField
                    fieldType={FormFieldType.NUMBER}
                    control={form.control}
                    name="degreeYear"
                    label="Passing Year"
                    placeholder="ex: 2016"
                  />

                  {/* degreeCity */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="degreeCity"
                    label="City"
                    placeholder="ex: Karachi"
                  />

                  {/* degreeState (optional) */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="degreeState"
                    label="State (optional)"
                    placeholder="ex: Sindh"
                  />

                  {/* degreeCountry */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="degreeCountry"
                    label="Country"
                    placeholder="ex: Pakistan"
                  />
                </div>

                {/* degreeDescription (optional) */}
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="degreeDescription"
                  label="Degree Description (optional)"
                  placeholder="ex: I have obtained my M.D. degree from Medical College of Sindh in 2016. I have completed my internship in Karachi and later moved to Islamabad for further studies."
                />

                {/* degreeVerificationType */}
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="degreeVerificationType"
                  label="Identification type"
                  placeholder="Select identification type from the list"
                >
                  {DoctorIdentificationTypes.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </CustomFormField>

                {/* attachments */}
                <CustomFormField
                  fieldType={FormFieldType.UPLOADER}
                  control={form.control}
                  name="attachments"
                  label="Scanned Copy of Certificate Document"
                />
              </>
            )}

            {/* CONSENT & PRIVACY */}
            {activeStep === 2 && (
              <>
                <CardTitle className="text-xl">Consent and Privacy</CardTitle>

                {/* Password & Confirm Password */}
                <div className="flex flex-col justify-center md:flex-row md:items-start gap-3 md:justify-between w-full">
                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="password"
                    label="Password"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                  />
                </div>

                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form.control}
                  name="appearanceConsent"
                  label="I consent to appear on the doctor's schedule."
                />

                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form.control}
                  name="disclosureConsent"
                  label="I consent to the use and disclosure of my certificates for verification purposes."
                />

                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form.control}
                  name="privacyConsent"
                  label="I acknowledge that I have reviewed and agree to the privacy policy"
                />
              </>
            )}

            <Separator className="my-4" />
          </CardContent>

          <CardFooter className="flex items-center justify-center flex-col gap-5 sm:flex-row sm:justify-between">
            <div className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="font-semibold text-primary"
                href={"/auth/sign-in"}
              >
                Sign in
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                size={"lg"}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>

              {activeStep !== 2 && (
                <Button
                  type={"button"}
                  disabled={loading}
                  size={"lg"}
                  onClick={handleNextStep}
                >
                  {loading && (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {loading ? "Loading..." : "Next"}
                </Button>
              )}

              {activeStep === 2 && (
                <Button disabled={loading} size={"lg"}>
                  {loading && (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default DoctorSignUpForm;
