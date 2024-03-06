export class ValantisApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValantisApiError";
  }
}
