"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface RoleSelectionDialogProps {
  children: React.ReactNode;
}

type SignInData = {
  role: string;
  email: string;
  password: string;
};

type SignUpData = {
  role: string;
  name: string;
  email: string;
  password: string;
};

type FormState = {
  company: {
    signIn: { email: string; password: string };
    signUp: { name: string; email: string; password: string };
  };
  student: {
    signIn: { email: string; password: string };
    signUp: { name: string; email: string; password: string };
  };
  university: {
    signIn: { email: string; password: string };
    signUp: { name: string; email: string; password: string };
  };
};

export function RoleSelectionDialog({ children }: RoleSelectionDialogProps) {
  const router = useRouter();
  
  const [formState, setFormState] = useState<FormState>({
    company: {
      signIn: { email: "", password: "" },
      signUp: { name: "", email: "", password: "" },
    },
    student: {
      signIn: { email: "", password: "" },
      signUp: { name: "", email: "", password: "" },
    },
    university: {
      signIn: { email: "", password: "" },
      signUp: { name: "", email: "", password: "" },
    },
  });

  const updateFormField = (
    role: keyof FormState,
    type: "signIn" | "signUp",
    field: string,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [type]: {
          ...prev[role][type],
          [field]: value,
        },
      },
    }));
  };

  const resetForm = (role: keyof FormState, type: "signIn" | "signUp") => {
    setFormState((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [type]:
          type === "signIn"
            ? { email: "", password: "" }
            : { name: "", email: "", password: "" },
      },
    }));
  };

  const handleSignIn = async (data: SignInData) => {
    try {
      const payload = { ...data };

      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Sign In failed");
      } else {
        toast.success(result.message || "Sign In successful");
        const login = useAuthStore.getState().login;
        login({
          user: result.data,
          token: result.data.token,
          expiresAt: result.data.expiresAt,
        });

        router.push("/dashboard");
        resetForm(data.role as keyof FormState, "signIn");
      }
    } catch (error) {
      console.error("Client SignIn Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      const payload = { ...data };

      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Sign Up failed");
      } else {
        toast.success("Sign Up successful");
        resetForm(data.role as keyof FormState, "signUp");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose your role</DialogTitle>
          <DialogDescription>
            Select the role that best describes you to continue.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="cursor-pointer" value="company">
              Company
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="student">
              Student
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="university">
              University
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Tabs defaultValue="signin" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="cursor-pointer" value="signin">
                  Sign In
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="signup">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn({
                        role: "company",
                        email: formState.company.signIn.email,
                        password: formState.company.signIn.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="company@example.com"
                      value={formState.company.signIn.email}
                      onChange={(e) =>
                        updateFormField("company", "signIn", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-password">Password</Label>
                    <Input
                      id="company-password"
                      type="password"
                      value={formState.company.signIn.password}
                      onChange={(e) =>
                        updateFormField("company", "signIn", "password", e.target.value)
                      }
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({
                        role: "company",
                        email: formState.company.signIn.email,
                        password: formState.company.signIn.password,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp({
                        role: "company",
                        name: formState.company.signUp.name,
                        email: formState.company.signUp.email,
                        password: formState.company.signUp.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Acme Inc."
                      value={formState.company.signUp.name}
                      onChange={(e) =>
                        updateFormField("company", "signUp", "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-email">Email</Label>
                    <Input
                      id="company-signup-email"
                      type="email"
                      placeholder="company@example.com"
                      value={formState.company.signUp.email}
                      onChange={(e) =>
                        updateFormField("company", "signUp", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-password">Password</Label>
                    <Input
                      id="company-signup-password"
                      type="password"
                      value={formState.company.signUp.password}
                      onChange={(e) =>
                        updateFormField("company", "signUp", "password", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp({
                        role: "company",
                        name: formState.company.signUp.name,
                        email: formState.company.signUp.email,
                        password: formState.company.signUp.password,
                      })
                    }
                  >
                    Sign Up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="student">
            <Tabs defaultValue="signin" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn({
                        role: "student",
                        email: formState.student.signIn.email,
                        password: formState.student.signIn.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@example.com"
                      value={formState.student.signIn.email}
                      onChange={(e) =>
                        updateFormField("student", "signIn", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={formState.student.signIn.password}
                      onChange={(e) =>
                        updateFormField("student", "signIn", "password", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({
                        role: "student",
                        email: formState.student.signIn.email,
                        password: formState.student.signIn.password,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp({
                        role: "student",
                        name: formState.student.signUp.name,
                        email: formState.student.signUp.email,
                        password: formState.student.signUp.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      placeholder="John Doe"
                      value={formState.student.signUp.name}
                      onChange={(e) =>
                        updateFormField("student", "signUp", "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-signup-email">Email</Label>
                    <Input
                      id="student-signup-email"
                      type="email"
                      placeholder="student@example.com"
                      value={formState.student.signUp.email}
                      onChange={(e) =>
                        updateFormField("student", "signUp", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-signup-password">Password</Label>
                    <Input
                      id="student-signup-password"
                      type="password"
                      value={formState.student.signUp.password}
                      onChange={(e) =>
                        updateFormField("student", "signUp", "password", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp({
                        role: "student",
                        name: formState.student.signUp.name,
                        email: formState.student.signUp.email,
                        password: formState.student.signUp.password,
                      })
                    }
                  >
                    Sign Up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="university">
            <Tabs defaultValue="signin" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignIn({
                        role: "university",
                        email: formState.university.signIn.email,
                        password: formState.university.signIn.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="university-email">Email</Label>
                    <Input
                      id="university-email"
                      type="email"
                      placeholder="university@example.com"
                      value={formState.university.signIn.email}
                      onChange={(e) =>
                        updateFormField("university", "signIn", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-password">Password</Label>
                    <Input
                      id="university-password"
                      type="password"
                      value={formState.university.signIn.password}
                      onChange={(e) =>
                        updateFormField("university", "signIn", "password", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({
                        role: "university",
                        email: formState.university.signIn.email,
                        password: formState.university.signIn.password,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div
                  className="grid gap-4 py-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp({
                        role: "university",
                        name: formState.university.signUp.name,
                        email: formState.university.signUp.email,
                        password: formState.university.signUp.password,
                      });
                    }
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="university-name">University Name</Label>
                    <Input
                      id="university-name"
                      placeholder="State University"
                      value={formState.university.signUp.name}
                      onChange={(e) =>
                        updateFormField("university", "signUp", "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-signup-email">Email</Label>
                    <Input
                      id="university-signup-email"
                      type="email"
                      placeholder="university@example.com"
                      value={formState.university.signUp.email}
                      onChange={(e) =>
                        updateFormField("university", "signUp", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-signup-password">Password</Label>
                    <Input
                      id="university-signup-password"
                      type="password"
                      value={formState.university.signUp.password}
                      onChange={(e) =>
                        updateFormField("university", "signUp", "password", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp({
                        role: "university",
                        name: formState.university.signUp.name,
                        email: formState.university.signUp.email,
                        password: formState.university.signUp.password,
                      })
                    }
                  >
                    Sign Up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}