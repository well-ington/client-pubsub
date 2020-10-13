import { ThttpPostParams, ThttpResponse, HttpPostClient } from "@/data/protocols/http"
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: ThttpPostParams<any>): Promise<ThttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}