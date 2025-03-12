"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "@/api/dummy";
import { toast } from "react-toastify";
import { emailSchema } from "@/lib/schemas/inputs";

const validateEmail = (email: string) => {
  const errors: Record<string, string> = {};
  const emailResult = emailSchema.safeParse({ email });
  if (!emailResult.success) {
    errors.email = emailResult.error.errors[0].message;
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const errors = validateEmail(email);

    if (errors) {
      return setFormErrors(errors);
    }
    setFormErrors({});

    setIsLoading(true);
    const response = await forgotPassword(email);
    if (response.error || !response.result) {
      toast.error(response.error?.message || "Password reset failed");
    } else {
      toast.success("Reset instructions sent successfully");
      setIsSubmitted(true);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full bg-[rgba(15,15,15,0.1)] rounded-[32px] text-primary border-muted-foreground/30">
      <CardHeader className="space-y-1">
        <CardTitle className="font-alata text-left text-5xl">
          Password Recovery
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  className="bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                  ref={emailRef}
                  aria-invalid={!!formErrors.email}
                />
                {formErrors.email && (
                  <span className="text-xs text-red-500">
                    {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-primary">
              Password reset instructions have been sent to your email.
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
