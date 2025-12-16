import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog ,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger} from "@/components/ui/dialog";
const Login = () => {
    return (
        <div>
            <Tabs>
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <p>Account content</p>
                </TabsContent>
                <TabsContent value="password">
                    <p>Password content</p>
                </TabsContent>
            </Tabs>
        </div>
    );
};