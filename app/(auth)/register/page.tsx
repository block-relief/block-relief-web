"use client";
import { Form, EmailInput, PasswordInput } from "@/components/custom/logins";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const roleSchemas = {
  individual: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  ngo: z.object({
    orgName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    website: z.string().url().optional(),
  }),
  superadmin: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    adminCode: z.string().length(6),
  }),
};

type IndividualData = {
  username: string;
  email: string;
  password: string;
};

type AdminData = {
  email: string;
  password: string;
  adminCode: string;
};

type OrgData = {
  email: string;
  password: string;
  orgName: string;
  website?: string | undefined;
};

export default function RegisterPage() {
  const handleSubmit = (data: IndividualData | AdminData | OrgData) => {
    console.log("Registration data:", data);
  };

  return (
    <Card className="w-full max-w-md bg-background shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-foreground">
          Create Account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="individual">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="ngo">NGO</TabsTrigger>
            <TabsTrigger value="superadmin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Form schema={roleSchemas.individual} onSubmit={handleSubmit}>
              {({ register, errors }) => (
                <div className="space-y-4">
                  <div>
                    <Label>Username</Label>
                    <Input {...register("username")} />
                    {errors.username && (
                      <p className="text-sm text-destructive">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <EmailInput
                    register={register}
                    error={errors.email}
                    name="email"
                    label="Email"
                  />
                  <PasswordInput
                    register={register}
                    error={errors.password}
                    name="password"
                    label="Password"
                  />
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              )}
            </Form>
          </TabsContent>

          <TabsContent value="ngo">
            <Form schema={roleSchemas.ngo} onSubmit={handleSubmit}>
              {({ register, errors }) => (
                <div className="space-y-4">
                  <div>
                    <Label>Organization Name</Label>
                    <Input {...register("orgName")} />
                    {errors.orgName && (
                      <p className="text-sm text-destructive">
                        {errors.orgName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input {...register("website")} />
                    {errors.website && (
                      <p className="text-sm text-destructive">
                        {errors.website.message}
                      </p>
                    )}
                  </div>
                  <EmailInput
                    register={register}
                    error={errors.email}
                    name="email"
                    label="Email"
                  />
                  <PasswordInput
                    register={register}
                    error={errors.password}
                    name="password"
                    label="Password"
                  />
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              )}
            </Form>
          </TabsContent>

          <TabsContent value="superadmin">
            <Form schema={roleSchemas.superadmin} onSubmit={handleSubmit}>
              {({ register, errors }) => (
                <div className="space-y-4">
                  <EmailInput
                    register={register}
                    error={errors.email}
                    name="email"
                    label="Email"
                  />
                  <PasswordInput
                    register={register}
                    error={errors.password}
                    name="password"
                    label="Password"
                  />
                  <div>
                    <Label>Admin Code</Label>
                    <Input {...register("adminCode")} />
                    {errors.adminCode && (
                      <p className="text-sm text-destructive">
                        {errors.adminCode.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              )}
            </Form>
          </TabsContent>
        </Tabs>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
