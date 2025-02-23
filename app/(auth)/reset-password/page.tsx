"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/components/custom/logins";
import { PasswordInput } from "@/components/custom/logins";
import { z } from "zod";
import { validateResetToken, resetPassword, TokenStatus } from "@/api/auth";
import { toast } from "react-toastify";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = searchParams.get("token") || "";

  const {
    data: tokenValidationResult,
    isLoading: isValidating,
    refetch,
  } = useQuery({
    queryKey: ["validateToken", token],
    queryFn: () => validateResetToken(token),
    retry: false,
    enabled: !!token,
  });

  const handleSubmit = async (data: { password: string }) => {
    setIsSubmitting(true);
    setIsSubmitting(true);
    await resetPassword(token, data.password)
      .then((val) => {
        if (val.error || !val.result) {
          setIsSubmitted(false);
          toast.error(val.error || "Unknown error");
        } else {
          setIsSubmitted(true);
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md bg-background shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Invalid reset link</p>
          <Link
            href="/forgot-password"
            className="text-primary hover:underline mt-4 block"
          >
            Request new reset link
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (isValidating || !tokenValidationResult) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  if (tokenValidationResult.error || !tokenValidationResult.result) {
    return (
      <Card className="w-full max-w-md bg-background shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">
            {tokenValidationResult.error || "Something went wrong"}
          </p>
          <p
            className="text-primary hover:underline mt-4 block cursor-pointer"
            onClick={() => refetch()}
          >
            Try again
          </p>
        </CardContent>
      </Card>
    );
  }

  const tokenStatus = tokenValidationResult.result.status;

  if (tokenStatus === TokenStatus.Expired) {
    return (
      <Card className="w-full max-w-md bg-background shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Reset link has expired</p>
          <Link
            href="/forgot-password"
            className="text-primary hover:underline mt-4 block"
          >
            Get new reset link
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (tokenStatus === TokenStatus.Invalid) {
    return (
      <Card className="w-full max-w-md bg-background shadow-lg hover:shadow-xl transition-all">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Invalid reset token</p>
          <Link
            href="/forgot-password"
            className="text-primary hover:underline mt-4 block"
          >
            Request new reset link
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-background shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-foreground">
          Reset Your Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isSubmitted ? (
          <Form schema={resetSchema} onSubmit={handleSubmit}>
            {({ register, errors }) => (
              <div className="space-y-4">
                <PasswordInput
                  register={register}
                  error={errors.password}
                  name="password"
                  label="New Password"
                />

                <PasswordInput
                  register={register}
                  error={errors.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            )}
          </Form>
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
