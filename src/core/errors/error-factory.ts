export const errorFactory = ( statusCode: number ) => {
  return class extends Error{
    constructor(message: string, cause: string){
      super(message, { cause: cause });
      this.message = message;
      this.cause = cause;
    }
  }
}
