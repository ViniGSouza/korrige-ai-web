import { useCallback, useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface FileDropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  accept?: string;
  maxSize?: number;
}

export function FileDropzone({
  onFileSelect,
  selectedFile,
  accept = "image/*,.pdf,.doc,.docx",
  maxSize = 10 * 1024 * 1024, // 10MB
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);

      if (file.size > maxSize) {
        setError(
          `Arquivo muito grande. Tamanho máximo: ${maxSize / 1024 / 1024}MB`
        );
        return false;
      }

      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const mimeType = file.type;

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type;
        }
        if (type.includes("*")) {
          const baseType = type.split("/")[0];
          return mimeType.startsWith(baseType);
        }
        return mimeType === type;
      });

      if (!isAccepted) {
        setError("Formato de arquivo não aceito");
        return false;
      }

      return true;
    },
    [accept, maxSize]
  );

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onFileSelect(file);
      }
    },
    [validateFile, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    onFileSelect(null);
    setError(null);
  }, [onFileSelect]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-primary" />;
    }
    if (file.type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <File className="h-8 w-8 text-primary" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-accent/50",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-muted-foreground/25",
            error && "border-destructive"
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div
              className={cn(
                "p-4 rounded-full transition-colors",
                isDragging ? "bg-primary/20" : "bg-muted"
              )}
            >
              <Upload
                className={cn(
                  "h-8 w-8 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {isDragging
                  ? "Solte o arquivo aqui"
                  : "Arraste e solte seu arquivo aqui"}
              </p>
              <p className="text-xs text-muted-foreground">
                ou clique para selecionar
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              PDF, DOCX, JPG, PNG (máx. {maxSize / 1024 / 1024}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-accent/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{getFileIcon(selectedFile)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="flex-shrink-0 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
