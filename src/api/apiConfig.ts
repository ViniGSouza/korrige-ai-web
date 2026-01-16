import axios, { AxiosError } from "axios";
import { storage } from "@/core/storage";
import { toast } from "@/shared/lib/toast";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = storage.get<string>("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "Ocorreu um erro inesperado";
    let shouldShowToast = true;

    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      const status = error.response.status;

      message =
        (data?.error as string) ||
        (data?.message as string) ||
        getDefaultErrorMessage(status);

      if (status === 422) {
        shouldShowToast = false;
      }

      if (status === 401) {
        storage.remove("token");
        storage.remove("user");
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    } else if (error.request) {
      message = "Não foi possível conectar ao servidor. Verifique sua conexão.";
    } else {
      message = error.message || "Erro ao processar requisição";
    }

    if (shouldShowToast) {
      toast.error(message);
    }

    const translatedError = new Error(message);
    return Promise.reject(translatedError);
  }
);

function getDefaultErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "Requisição inválida. Verifique os dados enviados.",
    401: "Sessão expirada. Faça login novamente.",
    403: "Você não tem permissão para acessar este recurso.",
    404: "Recurso não encontrado.",
    409: "Conflito de dados. Este registro já existe.",
    422: "Dados inválidos. Verifique o formulário.",
    429: "Muitas requisições. Aguarde um momento.",
    500: "Erro interno do servidor. Tente novamente.",
    502: "Servidor temporariamente indisponível.",
    503: "Serviço em manutenção. Tente novamente mais tarde.",
  };

  return messages[status] || "Erro ao processar requisição.";
}

export default api;
