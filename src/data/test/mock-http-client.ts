import { HttpPostClient, ThttpPostParams, HttpStatusCode, ThttpResponse } from "../protocols/http"

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
      url?: string
      body?: T
      response: ThttpResponse<R> = { 
        statusCode: HttpStatusCode.ok
      }

      async post (params: ThttpPostParams<T>): Promise<ThttpResponse<R>> {
        this.url = params.url
        this.body = params.body
        return Promise.resolve(this.response)
      }

    }