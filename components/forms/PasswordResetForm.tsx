"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { validateResetToken, resetPassword, TokenStatus } from "@/api/auth";
import { toast } from "react-toastify";
import useApiQuery from "@/hooks/useApiQuery";

const validatePasswords = (password: string, confirmPassword: string) => {
  const errors: Record<string, string> = {};

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const token = searchParams.get("token") || "";

  const {
    result: tokenValidationResult,
    isLoading: isValidating,
    error: tokenError,
  } = useApiQuery({
    queryKey: ["validateToken", token],
    queryFn: () => validateResetToken(token),
    retry: false,
    enabled: !!token,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    const errors = validatePasswords(password, confirmPassword);
    if (errors) return setFormErrors(errors);
    setFormErrors({});

    setIsLoading(true);
    try {
      const response = await resetPassword(token, password);
      if (response.error || !response.result) {
        toast.error(response.error?.message || "Password reset failed");
      } else {
        toast.success("Password reset successfully");
        setIsSubmitted(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorState = (
    message: string,
    linkHref: string,
    linkText: string,
  ) => (
    <Card className="w-full bg-[rgba(15,15,15,0.1)] rounded-[32px] text-primary border-muted-foreground/30">
      <CardHeader className="space-y-1">
        <CardTitle className="font-alata text-left text-5xl">
          Password Reset
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center space-y-4">
        <p className="text-destructive">{message}</p>
        <Link
          href={linkHref}
          className="text-primary hover:underline block text-sm"
        >
          {linkText}
        </Link>
      </CardContent>
    </Card>
  );

  if (!token) {
    return renderErrorState(
      "Invalid reset link",
      "/forgot-password",
      "Request new reset link",
    );
  }

  if (isValidating) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (tokenError || !tokenValidationResult) {
    return renderErrorState(
      tokenError?.message || "Failed to validate token",
      "#",
      "Try again",
    );
  }

  if (tokenValidationResult.status === TokenStatus.Expired) {
    return renderErrorState(
      "Reset link has expired",
      "/forgot-password",
      "Get new reset link",
    );
  }

  if (tokenValidationResult.status === TokenStatus.Invalid) {
    return renderErrorState(
      "Invalid reset token",
      "/forgot-password",
      "Request new reset link",
    );
  }

  return (
    <Card className="w-full bg-[rgba(15,15,15,0.1)] rounded-[32px] text-primary border-muted-foreground/30">
      <CardHeader className="space-y-1">
        <CardTitle className="font-alata text-left text-5xl">
          Reset Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                    ref={passwordRef}
                    aria-invalid={!!formErrors.password}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary pr-10"
                    ref={confirmPasswordRef}
                    aria-invalid={!!formErrors.confirmPassword}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeClosed className="w-4 h-4" />
                    )}
                  </button>
                  {formErrors.confirmPassword && (
                    <span className="text-xs text-red-500">
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="hover:text-primary transition-colors"
              >
                Remember your password? Login here
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-foreground">
              Your password has been successfully reset!
            </p>
            <Link
              href="/login"
              className="text-primary hover:underline text-sm"
            >
              Continue to Login
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
