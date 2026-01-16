import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
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

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: login,
    isPending: isLoggingIn,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/app/dashboard");
    } catch {
      // Erro já é tratado pelo interceptor com toast
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-0 bg-transparent">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              disabled={isLoggingIn}
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
              placeholder="••••••"
              {...register("password")}
              disabled={isLoggingIn}
              aria-invalid={!!errors.password}
              className={errors.password ? "border-destructive" : ""}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/sign-up")}
              className="p-0 h-auto font-semibold"
            >
              Criar conta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
