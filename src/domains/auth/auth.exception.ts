export class AuthException extends Error {
  public status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}