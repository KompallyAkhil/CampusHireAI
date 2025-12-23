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

export function RoleSelectionDialog({ children }: RoleSelectionDialogProps) {
  // State for Company
  const [companySignInEmail, setCompanySignInEmail] = useState("");
  const [companySignInPassword, setCompanySignInPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySignUpEmail, setCompanySignUpEmail] = useState("");
  const [companySignUpPassword, setCompanySignUpPassword] = useState("");

  // State for Student
  const [studentSignInEmail, setStudentSignInEmail] = useState("");
  const [studentSignInPassword, setStudentSignInPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentSignUpEmail, setStudentSignUpEmail] = useState("");
  const [studentSignUpPassword, setStudentSignUpPassword] = useState("");

  // State for University
  const [universitySignInEmail, setUniversitySignInEmail] = useState("");
  const [universitySignInPassword, setUniversitySignInPassword] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [universitySignUpEmail, setUniversitySignUpEmail] = useState("");
  const [universitySignUpPassword, setUniversitySignUpPassword] = useState("");



  const handleSignIn = async (data: SignInData) => {
    try {
      const payload = { ...data };

      const response = await fetch("/api/signin", {
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
        console.log("Client SignIn Success:", result);
      }
    } catch (error) {
      console.error("Client SignIn Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleSignUp = async (role: string, data: any) => {
    try {
      const payload = { role, ...data };

      const response = await fetch("/api/signup", {
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
        toast.success(result.message || "Sign Up successful");
        console.log("Client SignUp Success:", result);
      }
    } catch (error) {
      console.error("Client SignUp Error:", error);
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
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="company@example.com"
                      value={companySignInEmail}
                      onChange={(e) => setCompanySignInEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-password">Password</Label>
                    <Input
                      id="company-password"
                      type="password"
                      value={companySignInPassword}
                      onChange={(e) => setCompanySignInPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({role : "company",
                        email: companySignInEmail,
                        password: companySignInPassword,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Acme Inc."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-email">Email</Label>
                    <Input
                      id="company-signup-email"
                      type="email"
                      placeholder="company@example.com"
                      value={companySignUpEmail}
                      onChange={(e) => setCompanySignUpEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-password">Password</Label>
                    <Input
                      id="company-signup-password"
                      type="password"
                      value={companySignUpPassword}
                      onChange={(e) => setCompanySignUpPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp("company", {
                        name: companyName,
                        email: companySignUpEmail,
                        password: companySignUpPassword,
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
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@example.com"
                      value={studentSignInEmail}
                      onChange={(e) => setStudentSignInEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={studentSignInPassword}
                      onChange={(e) => setStudentSignInPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({role : "student",
                        email: studentSignInEmail,
                        password: studentSignInPassword,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      placeholder="John Doe"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-signup-email">Email</Label>
                    <Input
                      id="student-signup-email"
                      type="email"
                      placeholder="student@example.com"
                      value={studentSignUpEmail}
                      onChange={(e) => setStudentSignUpEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-signup-password">Password</Label>
                    <Input
                      id="student-signup-password"
                      type="password"
                      value={studentSignUpPassword}
                      onChange={(e) => setStudentSignUpPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp("student", {
                        name: studentName,
                        email: studentSignUpEmail,
                        password: studentSignUpPassword,
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
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="university-email">Email</Label>
                    <Input
                      id="university-email"
                      type="email"
                      placeholder="university@example.com"
                      value={universitySignInEmail}
                      onChange={(e) => setUniversitySignInEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-password">Password</Label>
                    <Input
                      id="university-password"
                      type="password"
                      value={universitySignInPassword}
                      onChange={(e) => setUniversitySignInPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignIn({role : "university", 
                        email: universitySignInEmail,
                        password: universitySignInPassword,
                      })
                    }
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="university-name">University Name</Label>
                    <Input
                      id="university-name"
                      placeholder="State University"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-signup-email">Email</Label>
                    <Input
                      id="university-signup-email"
                      type="email"
                      placeholder="university@example.com"
                      value={universitySignUpEmail}
                      onChange={(e) => setUniversitySignUpEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-signup-password">Password</Label>
                    <Input
                      id="university-signup-password"
                      type="password"
                      value={universitySignUpPassword}
                      onChange={(e) => setUniversitySignUpPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleSignUp("university", {
                        name: universityName,
                        email: universitySignUpEmail,
                        password: universitySignUpPassword,
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
