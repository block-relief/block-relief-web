"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, EyeClosed, Eye, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "@/api/dummy";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getReturnTo } from "@/api";
import { emailSchema } from "@/lib/schemas/inputs";

const validateInputs = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors: Record<string, string> = {};

  const emailResult = emailSchema.safeParse({ email });
  if (!emailResult.success) {
    errors.email = emailResult.error.message;
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const logins = { email, password };
    const errors = validateInputs(logins);

    if (errors) {
      return setFormErrors(errors);
    } else {
      setFormErrors({});
    }

    setSigningIn(true);
    const response = await login(logins);
    if (response.error || !response.result) {
      toast.error(response.error?.message || "Login failed");
    } else {
      toast.success("Signed in successfully");
      router.push(getReturnTo() || "/");
    }
    setSigningIn(false);
  };

  return (
    <Card className="w-full bg-[rgba(15,15,15,0.1)] rounded-[32px] text-primary border-muted-foreground/30">
      <CardHeader className="space-y-1">
        <CardTitle className="font-alata text-left text-5xl">Log In</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email & Password Inputs */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                  ref={emailRef}
                  aria-invalid={!!formErrors.email}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {formErrors.email && (
                  <span className="text-xs text-red-500">
                    {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                  ref={passwordRef}
                  minLength={8}
                  aria-invalid={!!formErrors.password}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                {formErrors.password && (
                  <span className="text-xs text-red-500">
                    {formErrors.password}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-primary rounded border-muted-foreground"
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            disabled={signingIn}
          >
            {signingIn ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            {signingIn ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
