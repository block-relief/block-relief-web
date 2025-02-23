"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/components/custom/logins";
import { EmailInput } from "@/components/custom/logins";
import { z } from "zod";
import { forgotPassword } from "@/api/auth";
import { toast } from "react-toastify";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const [isSubmmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    forgotPassword(data.email)
      .then((res) => {
        if (res.error || !res.result) {
          setIsSubmitted(false);
          toast.error(res.error || "Unknown error");
        } else {
          setIsSubmitted(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card className="w-full max-w-md bg-background shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-foreground">
          Password Recovery
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isSubmmitted ? (
          <Form schema={forgotSchema} onSubmit={handleSubmit}>
            {({ register, errors }) => (
              <div className="space-y-4">
                <EmailInput
                  register={register}
                  error={errors.email}
                  name="email"
                  label="Email"
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Send Reset Instructions"
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
              We've sent password reset instructions to your email.
            </p>
            <Link
              href="/login"
              className="text-primary hover:underline text-sm"
            >
              Return to Login
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
