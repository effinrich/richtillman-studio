export enum ErrorCode {
  COMPONENT_NOT_FOUND = "COMPONENT_NOT_FOUND",
  STORY_NOT_FOUND = "STORY_NOT_FOUND",
  FILE_READ_ERROR = "FILE_READ_ERROR",
  FILE_WRITE_ERROR = "FILE_WRITE_ERROR",
  INVALID_PATH = "INVALID_PATH",
  INVALID_CONFIG = "INVALID_CONFIG",
  MISSING_CONFIG = "MISSING_CONFIG",
  PARSE_ERROR = "PARSE_ERROR",
  GENERATION_FAILED = "GENERATION_FAILED",
  TEMPLATE_NOT_FOUND = "TEMPLATE_NOT_FOUND",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export class StorybookMcpError extends Error {
  readonly code: ErrorCode
  readonly details?: unknown

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    details?: unknown,
  ) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.details = details
  }
}

export class GenerationError extends StorybookMcpError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.GENERATION_FAILED,
    details?: unknown,
  ) {
    super(message, code, details)
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return "An unknown error occurred"
}
