import { z } from "zod";

export const confirmSignUpSchema = z.object({
  email: z.string().email("Email inválido"),
  confirmationCode: z.string().min(6, "Código deve ter no mínimo 6 caracteres"),
});

export type ConfirmSignUpFormData = z.infer<typeof confirmSignUpSchema>;
