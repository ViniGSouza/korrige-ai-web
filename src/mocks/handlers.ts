import { http, HttpResponse } from "msw";

// Mock user data
const mockUser = {
  userId: "user-123",
  name: "João Silva",
  email: "joao@email.com",
  id: "user-123",
};

// Mock essays data
const mockEssays = [
  {
    essayId: "essay-1",
    userId: "user-123",
    title: "A importância da educação digital no Brasil",
    theme: "Educação Digital",
    content: "Texto da redação...",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    correction: {
      totalScore: 840,
      competency1: { score: 160, feedback: "Bom domínio da escrita formal." },
      competency2: { score: 180, feedback: "Excelente compreensão do tema." },
      competency3: { score: 160, feedback: "Boa organização de ideias." },
      competency4: { score: 180, feedback: "Uso adequado de conectivos." },
      competency5: { score: 160, feedback: "Proposta de intervenção clara." },
    },
  },
  {
    essayId: "essay-2",
    userId: "user-123",
    title: "O papel das redes sociais na democracia",
    theme: "Redes Sociais",
    content: "Texto da redação...",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    correction: {
      totalScore: 760,
      competency1: { score: 140, feedback: "Algumas inadequações na escrita formal." },
      competency2: { score: 160, feedback: "Boa compreensão do tema." },
      competency3: { score: 160, feedback: "Boa organização de ideias." },
      competency4: { score: 160, feedback: "Uso adequado de conectivos." },
      competency5: { score: 140, feedback: "Proposta de intervenção incompleta." },
    },
  },
  {
    essayId: "essay-3",
    userId: "user-123",
    title: "Desafios da mobilidade urbana nas grandes cidades",
    theme: "Mobilidade Urbana",
    content: "Texto da redação...",
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    correction: null,
  },
];

export const handlers = [
  // Auth endpoints - usando wildcard para interceptar qualquer domínio
  http.post("*/auth/sign-in", async ({ request }) => {
    const body = (await request.json()) as { email?: string };

    // Simula erro de credenciais inválidas
    if (body.email === "erro@teste.com") {
      return HttpResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Simula erro de servidor
    if (body.email === "servidor@erro.com") {
      return HttpResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return HttpResponse.json({
      data: {
        idToken: "mock-id-token",
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    });
  }),

  http.get("*/users/profile", () => {
    return HttpResponse.json({
      data: mockUser,
    });
  }),

  // Essays endpoints
  http.get("*/essays", () => {
    return HttpResponse.json({
      data: {
        essays: mockEssays,
        total: mockEssays.length,
      },
    });
  }),

  http.get("*/essays/:essayId", ({ params }) => {
    const essay = mockEssays.find((e) => e.essayId === params.essayId);
    if (!essay) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      data: essay,
    });
  }),

  http.post("*/essays", async ({ request }) => {
    const body = await request.json() as { title?: string; theme?: string; content?: string };
    const newEssay = {
      essayId: `essay-${Date.now()}`,
      userId: "user-123",
      title: body.title || "Nova Redação",
      theme: body.theme || "Tema Livre",
      content: body.content || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      correction: null,
    };
    return HttpResponse.json({
      data: newEssay,
    });
  }),

  http.delete("*/essays/:essayId", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
