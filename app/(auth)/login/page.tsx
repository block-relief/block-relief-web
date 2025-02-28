"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, EyeClosed, Eye, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getReturnTo } from "@/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    await signIn(email, password)
      .then((response) => {
        setSigningIn(false);
        if (response.error || response.result === null) {
          const errorMsg = response.error?.message || "Unknown error";
          toast.error(errorMsg);
        } else {
          toast.success("Signed in successfully");
          const returnTo = getReturnTo() || "/";
          router.push(returnTo);
        }
      })
      .catch(() => setSigningIn(false));
  };

  return (
    <Card className="w-full max-w-md bg-background shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-foreground">
          Welcome Back
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                ref={emailRef}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary"
                ref={passwordRef}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeClosed className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-primary rounded border-muted-foreground"
              />
              <Label htmlFor="remember" className="text-muted-foreground">
                Remember me
              </Label>
            </div>
            <Link
              href="./forgot-password"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
            disabled={signingIn}
            onClick={handleLogin}
          >
            {signingIn ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {`Don't have an account? `}
            <Link
              href="./register"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
