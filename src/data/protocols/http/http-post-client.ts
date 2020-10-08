import { ThttpResponse } from ".";

export type ThttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post (params: ThttpPostParams<T>): Promise<ThttpResponse<R>>
}