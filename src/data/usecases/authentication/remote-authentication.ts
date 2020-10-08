import { TaccountModel } from "@/domain/models";
import { TauthenticationParams, Iauthentication } from "../../../domain/usecases";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HttpPostClient, HttpStatusCode } from "../../protocols/http";

export class RemoteAuthentication implements Iauthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<TauthenticationParams, TaccountModel>
    ) {}

  async auth(params: TauthenticationParams): Promise<TaccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
      })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
  
}