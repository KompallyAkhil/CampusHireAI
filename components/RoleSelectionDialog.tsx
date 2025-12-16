import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RoleSelectionDialogProps {
  children: React.ReactNode
}

export function RoleSelectionDialog({ children }: RoleSelectionDialogProps) {
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
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="university">University</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Tabs defaultValue="signin" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input id="company-email" type="email" placeholder="company@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-password">Password</Label>
                    <Input id="company-password" type="password" />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Acme Inc." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-email">Email</Label>
                    <Input id="company-signup-email" type="email" placeholder="company@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company-signup-password">Password</Label>
                    <Input id="company-signup-password" type="password" />
                  </div>
                  <Button className="w-full">Sign Up</Button>
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
                    <Input id="student-email" type="email" placeholder="student@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input id="student-password" type="password" />
                  </div>
                   <Button className="w-full">Sign In</Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input id="student-name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-signup-email">Email</Label>
                    <Input id="student-signup-email" type="email" placeholder="student@example.com" />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="student-signup-password">Password</Label>
                    <Input id="student-signup-password" type="password" />
                  </div>
                  <Button className="w-full">Sign Up</Button>
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
                    <Input id="university-email" type="email" placeholder="university@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-password">Password</Label>
                    <Input id="university-password" type="password" />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="university-name">University Name</Label>
                    <Input id="university-name" placeholder="State University" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university-signup-email">Email</Label>
                    <Input id="university-signup-email" type="email" placeholder="university@example.com" />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="university-signup-password">Password</Label>
                    <Input id="university-signup-password" type="password" />
                  </div>
                  <Button className="w-full">Sign Up</Button>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
