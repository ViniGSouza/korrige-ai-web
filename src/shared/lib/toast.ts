import { toast as sonnerToast } from "sonner";

/**
 * Serviço centralizado de Toast
 * Usa Sonner para exibir notificações com estilo consistente
 */

// Mapeamento de erros comuns de API para mensagens amigáveis
const ERROR_MESSAGES: Record<string, string> = {
  // Erros de autenticação
  "Invalid credentials": "Credenciais inválidas. Verifique seu e-mail e senha.",
  "User not found": "Usuário não encontrado.",
  "User already exists": "Este e-mail já está cadastrado.",
  "Email not verified":
    "E-mail não verificado. Verifique sua caixa de entrada.",
  "Token expired": "Sua sessão expirou. Faça login novamente.",
  "Invalid token": "Token inválido. Faça login novamente.",
  Unauthorized: "Você não tem permissão para acessar este recurso.",

  // Erros de validação
  "Validation error": "Erro de validação. Verifique os dados informados.",
  "Invalid email": "E-mail inválido.",
  "Weak password": "Senha muito fraca.",

  // Erros de rede
  "Network Error": "Erro de conexão. Verifique sua internet.",
  timeout: "O servidor demorou para responder. Tente novamente.",
  ECONNREFUSED: "Não foi possível conectar ao servidor.",

  // Erros de servidor
  "Internal server error":
    "Erro interno do servidor. Tente novamente mais tarde.",
  "Service unavailable": "Serviço temporariamente indisponível.",

  // Erros de redação
  "Essay not found": "Redação não encontrada.",
  "Essay already submitted": "Esta redação já foi enviada para correção.",
  "Invalid file type": "Tipo de arquivo não suportado.",
  "File too large": "Arquivo muito grande. Máximo permitido: 10MB.",
};

// Traduz mensagem de erro para português
function translateError(message: string): string {
  // Verifica mapeamento direto
  if (ERROR_MESSAGES[message]) {
    return ERROR_MESSAGES[message];
  }

  // Verifica se contém alguma palavra-chave
  const lowerMessage = message.toLowerCase();

  for (const [key, translation] of Object.entries(ERROR_MESSAGES)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return translation;
    }
  }

  // Se já está em português ou não encontrou tradução, retorna a original
  return message;
}

export const toast = {
  /**
   * Exibe toast de sucesso
   */
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Exibe toast de erro
   * Traduz automaticamente mensagens de erro comuns
   */
  error: (message: string, description?: string) => {
    const translatedMessage = translateError(message);
    sonnerToast.error(translatedMessage, {
      description: description ? translateError(description) : undefined,
      duration: 6000,
    });
  },

  /**
   * Exibe toast de aviso
   */
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 5000,
    });
  },

  /**
   * Exibe toast informativo
   */
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Exibe toast de loading com promise
   * Útil para operações assíncronas
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: (err) => translateError(err?.message || messages.error),
    });
  },

  /**
   * Trata erro de API automaticamente
   * Extrai a mensagem de erro e exibe toast apropriado
   */
  apiError: (error: unknown) => {
    let message = "Ocorreu um erro inesperado. Tente novamente.";

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object") {
      const errorObj = error as Record<string, unknown>;
      message = (errorObj.message || errorObj.error || message) as string;
    }

    toast.error(message);
  },

  /**
   * Remove todos os toasts ativos
   */
  dismiss: () => {
    sonnerToast.dismiss();
  },
};

export default toast;
