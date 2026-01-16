import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks";
import { signUpSchema, type SignUpFormData } from "../schemas/signUp.schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FieldError } from "@/shared/components/FieldError";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  const {
    mutateAsync: signUp,
    isPending: isRegistering,
  } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      });

      if (!response.data.userConfirmed) {
        setRegisteredEmail(data.email);
        setTimeout(() => {
          navigate(`/confirm-sign-up?email=${encodeURIComponent(data.email)}`);
        }, 3000);
      } else {
        navigate("/login");
      }
    } catch {
      // Erro já é tratado pelo interceptor com toast
    }
  };

  if (registeredEmail) {
    return (
      <Card className="w-full max-w-md shadow-none border-0 bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registro realizado!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <p className="font-medium mb-2">Conta criada com sucesso!</p>
              <p className="text-sm">
                Enviamos um código de verificação para{" "}
                <strong>{registeredEmail}</strong>
              </p>
              <p className="text-sm mt-2">
                Redirecionando para a página de confirmação...
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-none border-0 bg-transparent">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="João Silva"
              {...register("name")}
              disabled={isRegistering}
              aria-invalid={!!errors.name}
              className={errors.name ? "border-destructive" : ""}
            />
            <FieldError message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              disabled={isRegistering}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-destructive" : ""}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isRegistering}
              aria-invalid={!!errors.password}
              className={errors.password ? "border-destructive" : ""}
            />
            <FieldError message={errors.password?.message} />
            <p className="text-xs text-muted-foreground">
              Mínimo 8 caracteres, com maiúscula, minúscula, número e especial
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              disabled={isRegistering}
              aria-invalid={!!errors.confirmPassword}
              className={errors.confirmPassword ? "border-destructive" : ""}
            />
            <FieldError message={errors.confirmPassword?.message} />
          </div>

          <Button type="submit" className="w-full" disabled={isRegistering}>
            {isRegistering ? "Criando conta..." : "Criar conta"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
              className="p-0 h-auto font-semibold"
            >
              Fazer login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
