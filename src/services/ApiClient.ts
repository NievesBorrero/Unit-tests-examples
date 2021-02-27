import { StatusCodes } from 'http-status-codes'

import { BACKEND_BASE_URL } from '../constants/envar'
import { BadRequestError, InternalServerError } from '../errors'

class ApiClient {
    BASE_URL: string
    resource: string
    headers: Headers

    constructor () {
      this.BASE_URL = `${BACKEND_BASE_URL}/{resource}/`
      this.resource = ''
      this.headers = new Headers({
        'Content-Type': 'application/json'
      })
    }

    on (resource: string): ApiClient {
      this.resource = resource
      return this
    }

    generateUrl (id?: string): string {
      const url = this.BASE_URL.replace('{resource}', this.resource)

      if (!id) return url

      return url.concat(id, '/')
    }


    async list(): Promise<unknown> {
      const request = new Request(this.generateUrl(), {
        method: 'GET',
        headers: this.headers
      })
      const response = await this.request(request).then(response => response)

      return response
    }


    async retrieve(id: string): Promise<unknown> {
      const request = new Request(this.generateUrl(id), {
        method: 'GET',
        headers: this.headers
      })
      const response = await this.request(request).then(response => response)

      return response
    }

    create (payload: object): Promise<unknown> {
      const request = new Request(this.generateUrl(), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: this.headers
      })

      return this.request(request)
    }

    async request (request:RequestInfo): Promise<unknown> {
      return await fetch(request)
        .then(response => this.handleHttpResponse(response))
        .then(response => this.handleHttpResponseData(response))
    }

    handleHttpResponse (response:Response): Promise<unknown> {
      this.handleHttpErrorResponses(response)

      if (response.status === StatusCodes.NO_CONTENT) {
        return
      }

      return response.json()
    }

    handleHttpResponseData (data: HttpError|unknown): unknown {
      if (data['status_code'] !== StatusCodes.BAD_REQUEST) {
        return data
      }
      throw new BadRequestError(JSON.stringify(data))
    }

    handleHttpErrorResponses (response: Response): void {
      if (response.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError('Internal server error')
      }

      if (!response.ok && response.status !== StatusCodes.BAD_REQUEST) {
        throw Error('Response not valid')
      }
    }
}


export const apiList = async (resource: string): Promise<unknown> => {
    const apiClient = new ApiClient()
    return await apiClient.on(resource).list()
}

export const apiCreate = async (
  resource: string, payload: object): Promise<unknown> => {
    const apiClient = new ApiClient()
    return await apiClient.on(resource).create(payload)
}

export const apiRetrieve = async (
  resource: string, id: string): Promise<unknown> => {
    const apiClient = new ApiClient()
    return await apiClient.on(resource).retrieve(id)
}
