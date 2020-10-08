import { TaccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Iauthentication, TauthenticationParams } from "@/domain/usecases"

export class AuthenticationSpy implements Iauthentication {
  account = mockAccountModel()
  params: TauthenticationParams
  callsCount = 0
  async auth(params: TauthenticationParams): Promise<TaccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}