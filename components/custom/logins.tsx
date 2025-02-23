"use client";
import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeClosed, Eye } from "lucide-react";

type FormProps<T extends FieldValues> = {
  schema?: ZodType<T>;
  onSubmit: SubmitHandler<T>;
  children: (props: {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
  }) => React.ReactNode;
};

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  children,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ register, errors })}
    </form>
  );
}

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  label: string;
  name: Path<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function EmailInput<T extends FieldValues>({
  register,
  error,
  label,
  name,
  ...props
}: InputProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)} className="block text-sm font-medium">
        {label}
      </Label>
      <Input
        id={String(name)}
        type="email"
        autoComplete="email"
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-destructive" : "border-input"
        } focus:ring-2 focus:ring-primary`}
        {...register(name)}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error.message?.toString()}</p>
      )}
    </div>
  );
}

type PasswordInputProps<T extends FieldValues> = InputProps<T> & {
  showStrength?: boolean;
};

export function PasswordInput<T extends FieldValues>({
  register,
  error,
  label,
  name,
  showStrength = true,
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)} className="block text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={String(name)}
          type={showPassword ? "text" : "password"}
          className={`w-full px-3 py-2 border rounded-md pr-10 ${
            error ? "border-destructive" : "border-input"
          } focus:ring-2 focus:ring-primary`}
          {...register(name, {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value),
          })}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
        >
          {showPassword ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeClosed className="w-4 h-4" />
          )}
        </button>
      </div>

      {showStrength && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${
                i < getStrength(password) ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error.message?.toString()}</p>
      )}
    </div>
  );
}
