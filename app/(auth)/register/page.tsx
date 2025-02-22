import { Form, EmailInput, PasswordInput } from "@/components/custom/logins";
import { useState } from "react";
import { z } from "zod";

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

export default function RegisterPage() {
  const [role, setRole] = useState<"individual" | "ngo" | "superadmin">("individual");

  const handleSubmit = (data: any) => {
    console.log("Registration data:", data);
    // Handle submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <div className="flex gap-4 mb-6">
          {["individual", "ngo", "superadmin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r as any)}
              className={`flex-1 py-2 rounded-md ${
                role === r ? "bg-primary text-white" : "bg-gray-100"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <Form schema={roleSchemas[role]} onSubmit={handleSubmit}>
          {({ register, errors }) => (
            <div className="space-y-4">
              {role === "individual" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message?.toString()}
                    </p>
                  )}
                </div>
              )}

              {role === "ngo" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organization Name
                    </label>
                    <input
                      {...register("orgName")}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                    />
                    {errors.orgName && (
                      <p className="text-sm text-red-500">
                        {errors.orgName.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website (optional)
                    </label>
                    <input
                      {...register("website")}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                    />
                    {errors.website && (
                      <p className="text-sm text-red-500">
                        {errors.website.message?.toString()}
                      </p>
                    )}
                  </div>
                </>
              )}

              <EmailInput
                register={register}
                error={errors.email}
                label="Email"
                name="email"
              />

              <PasswordInput
                register={register}
                error={errors.password}
                label="Password"
                name="password"
              />

              {role === "superadmin" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Admin Code
                  </label>
                  <input
                    {...register("adminCode")}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                  {errors.adminCode && (
                    <p className="text-sm text-red-500">
                      {errors.adminCode.message?.toString()}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}