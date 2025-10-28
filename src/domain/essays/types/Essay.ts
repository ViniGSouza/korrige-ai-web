export type EssayStatus = "pending" | "processing" | "completed" | "failed";

export type AIProvider = "claude" | "openai";

export type FileType = "image" | "pdf" | "docx" | "text";

export interface CompetencyScore {
  score: number; // 0-200
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface EssayCorrection {
  competency1: CompetencyScore;
  competency2: CompetencyScore;
  competency3: CompetencyScore;
  competency4: CompetencyScore;
  competency5: CompetencyScore;
  totalScore: number; // 0-1000
  overallFeedback: string;
  processedAt: string;
  processingTimeMs: number;
}

export interface Essay {
  essayId: string;
  userId: string;
  title: string;
  content?: string;
  fileKey?: string;
  fileType?: FileType;
  status: EssayStatus;
  extractedText?: string;
  correction?: EssayCorrection;
  aiProvider?: AIProvider;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEssayRequest {
  title: string;
  content?: string;
  fileKey?: string;
  fileType?: FileType;
  aiProvider?: AIProvider;
}

export interface UploadUrlRequest {
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresIn: number;
}

export interface ListEssaysResponse {
  essays: Essay[];
  nextToken?: string;
}
