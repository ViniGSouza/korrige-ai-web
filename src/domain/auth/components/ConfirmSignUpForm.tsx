import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmSignUp } from "../hooks";
import {
  confirmSignUpSchema,
  type ConfirmSignUpFormData,
} from "../schemas/confirmSignUp.schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
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

export const ConfirmSignUpForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    mutateAsync: confirmSignUp,
    isPending: isConfirming,
    error: confirmError,
  } = useConfirmSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmSignUpFormData>({
    resolver: zodResolver(confirmSignUpSchema),
    defaultValues: {
      email: emailFromUrl,
    },
  });

  const onSubmit = async (data: ConfirmSignUpFormData) => {
    try {
      const response = await confirmSignUp(data);
      setSuccessMessage(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Erro ao confirmar registro:", error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border border-border bg-card backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Confirme seu email</CardTitle>
        <CardDescription>
          Digite o código de 6 dígitos enviado para seu email
        </CardDescription>
      </CardHeader>
      <CardContent>
        {successMessage ? (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {successMessage}
              <br />
              <span className="text-sm">Redirecionando para o login...</span>
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                disabled={isConfirming}
                readOnly={!!emailFromUrl}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmationCode">Código de Confirmação</Label>
              <Input
                id="confirmationCode"
                type="text"
                placeholder="000000"
                maxLength={6}
                {...register("confirmationCode")}
                disabled={isConfirming}
                className="text-center text-2xl tracking-widest"
              />
              {errors.confirmationCode && (
                <p className="text-sm text-destructive">
                  {errors.confirmationCode.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Verifique sua caixa de entrada e spam
              </p>
            </div>

            {confirmError && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {confirmError.message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isConfirming}>
              {isConfirming ? "Confirmando..." : "Confirmar"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/login")}
                className="text-sm text-muted-foreground"
              >
                Voltar para o login
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
