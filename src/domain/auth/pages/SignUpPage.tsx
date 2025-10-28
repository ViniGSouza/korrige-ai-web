import Logo from "@/brand/Logo";
import { SignUpForm } from "../components";

export const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Logo className="h-12" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Correção inteligente de redações com IA
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};
