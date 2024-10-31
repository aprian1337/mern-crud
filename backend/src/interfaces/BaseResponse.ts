export interface BaseResponse<T> {
  success: boolean;
  message: string;
  error?: string;
  error_code?: string;
  data?: T;
}
