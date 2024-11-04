export interface ResponseInterface {
  success: boolean;
  message: string;
  data: Record<string, any>
}

export interface AuthResponseInterface {
  success: boolean;
  message: string;
  token: string;
}