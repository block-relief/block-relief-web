"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeClosed, Eye, Loader2, Info } from "lucide-react";
import Link from "next/link";
import { signup } from "@/api/dummy";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getReturnTo } from "@/api";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { emailSchema, passwordSchema, nameSchema } from "@/lib/schemas/inputs";

const Roles = [
  { title: "Donor",
    value: "donor",
    info: "I want to donate to a cause" },
  {
    title: "NGO/Relief Provider",
    value: "ngo",
    info: "I want to provide relief to people in need",
  },
  { title: "Victim",
    value: "victim",
    info: "I need help" },
  { title: "Auditor", value: "admin", info: "I want to audit the use of funds" },
];

const validateInputs = ({
  email,
  password,
  firstname,
  lastname,
  role,
}: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string | null;
}) => {
  const errors: Record<string, string> = {};

  const emailResult = emailSchema.safeParse({ email });
  if (!emailResult.success) {
    errors.email = emailResult.error.errors[0].message;
  }

  const passwordResult = passwordSchema.safeParse({ password });
  if (!passwordResult.success) {
    errors.password = passwordResult.error.errors[0].message;
  }

  const firstnameResult = nameSchema.safeParse({ name: firstname });
  if (!firstnameResult.success) {
    errors.firstname = firstnameResult.error.errors[0].message;
  }

  const lastnameResult = nameSchema.safeParse({ name: lastname });
  if (!lastnameResult.success) {
    errors.lastname = lastnameResult.error.errors[0].message;
  }

  if (!role) {
    errors.role = "Please select a role";
  } else if (!Roles.some((r) => r.value === role)) {
    errors.role = "Invalid role selected";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [selectedRoleIdx, setSelectedRoleIdx] = useState<number | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      firstname: firstnameRef.current?.value || "",
      lastname: lastnameRef.current?.value || "",
      role: selectedRoleIdx !== null ? Roles[selectedRoleIdx].value : "",
    };

    const errors = validateInputs(newUser);

    if (errors) {
      return setFormErrors(errors);
    } else {
      setFormErrors({});
    }

    setSigningUp(true);

    const response = await signup(newUser);
    if (response.error || !response.success) {
      toast.error(response.error || "Login failed");
    } else {
      toast.success(response.success);
      router.push(getReturnTo() || "/");
    }
    setSigningUp(false);
  };

  return (
    <Card className="w-full bg-[rgba(15,15,15,0.1)] rounded-[32px] text-primary border-muted-foreground/30">
      <CardHeader className="space-y-1">
        <CardTitle className="font-alata text-left text-5xl">Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Inputs */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="eg. Jonathan"
                className="bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                ref={firstnameRef}
              />
              {formErrors.firstname && (
                <span className="text-xs text-red-500">
                  {formErrors.firstname}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="eg. Hamza"
                className="bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                ref={lastnameRef}
              />
              {formErrors.lastname && (
                <span className="text-xs text-red-500">
                  {formErrors.lastname}
                </span>
              )}
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                className="bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                ref={emailRef}
              />
              {formErrors.email && (
                <span className="text-xs text-red-500">{formErrors.email}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                  ref={passwordRef}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeClosed className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <span className="text-xs text-red-500">
                  {formErrors.password}
                </span>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-primary"
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link
              href="./forgot-password"
              className="hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label>
              Select your role
              {formErrors.role && (
                <span className="text-red-500 text-sm ml-2">
                  ({formErrors.role})
                </span>
              )}
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Roles.map((role, idx) => (
                <Card
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRoleIdx(idx)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelectedRoleIdx(idx)
                  }
                  className={`p-2 flex items-center justify-between border cursor-pointer transition-colors ${
                    selectedRoleIdx === idx
                      ? "border-primary bg-[rgba(0,0,0,0.5)]"
                      : "border-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <span className="font-plusJakartaSans text-sm">
                    {role.title}
                  </span>
                  <HoverCard>
                    <HoverCardTrigger>
                      <Info className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="top"
                      className="p-3 bg-background border rounded-lg shadow-lg"
                    >
                      <p className="font-semibold">{role.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {role.info}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </Card>
              ))}
            </div>
          </div>

          {/* Submit & Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Button
              type="submit"
              disabled={signingUp}
              className="w-full lg:w-auto bg-primary hover:bg-primary/90"
            >
              {signingUp ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {signingUp ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="flex items-center gap-2 lg:justify-end">
              <input
                type="checkbox"
                id="agree"
                required
                className="w-4 h-4 accent-primary"
              />
              <Label htmlFor="agree" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  terms and services
                </Link>
              </Label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
