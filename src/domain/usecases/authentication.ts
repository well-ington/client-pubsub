import { TaccountModel } from "../models/account-model";

export type TauthenticationParams = {
  email: string
  password: string
}

export interface Iauthentication {
  auth (params: TauthenticationParams): Promise<TaccountModel>
}