/* eslint-disable no-unused-vars */
import Image from "next/image";
import { Control } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { FileIcon } from "@radix-ui/react-icons";

const dropzone = {
  accept: {
    "image/*": [".jpg", ".jpeg", ".png"],
    "application/pdf": [".pdf"],
  },
  multiple: true,
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024,
} satisfies DropzoneOptions;

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  EMAIL = "email",
  PASSWORD = "password",
  UPLOADER = "uploader",
  MULTI_SELECT = "multiSelect",
  NUMBER = "number",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.EMAIL:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} type="email" />
        </FormControl>
      );

    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <Input type={"password"} placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className="sm:text-sm md:text-base lg:text-lg"
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
            rows={4}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <Input type={"tel"} placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={props.name}
              className="text-sm text-muted-foreground"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.UPLOADER:
      const files = field.value;
      return (
        <FormControl>
          <FileUploader
            value={field.value}
            onValueChange={field.onChange}
            dropzoneOptions={dropzone}
            className="relative bg-background rounded-lg p-2"
          >
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
              <FileInput className="outline-dashed outline-1 outline-gray-50 p-10">
                <div className="h-28 flex flex-col justify-center gap-4 items-center">
                  <Image
                    src="/assets/icons/upload.svg"
                    width={40}
                    height={40}
                    alt="upload"
                  />
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <p className="text-sm">
                      <span className="text-primary">Click to upload </span>
                      or drag and drop
                    </p>
                    <p className="text-sm">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                </div>
              </FileInput>
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file: File, i: number) => (
                    <FileUploaderItem key={i} index={i}>
                      <FileIcon className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </div>
          </FileUploader>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Select your birth date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} type="number" {...field} />
        </FormControl>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 w-full">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
