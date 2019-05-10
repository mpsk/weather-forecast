export class BaseService {
  protected static async handleRequest<T = void>(request: () => Promise<T>): Promise<T | void> {
    let resp;
    try {
      resp = await request();
    } catch (error) {
      // TODO: Fire via special error handler
      throw new Error(error);
    }
    return resp;
  }
}
