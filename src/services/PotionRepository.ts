import { StatusCodes } from 'http-status-codes'
import { BadRequestError, InternalServerError } from '../errors'

class PotionRepository {
    private readonly BASE_PATH = 'http://localhost:3030'
    private readonly RESOURCE = 'potions'
    private readonly HEADERS = {'Content-Type': 'application/json'}

    async searchAll() {
      const request = new Request(`${this.BASE_PATH}/${this.RESOURCE}`, {
        method: 'GET',
        headers: this.HEADERS
      })
      const response = await this.request(request).then(response => response)

      return response
    }

    async request (request:RequestInfo) {
      return await fetch(request)
        .then(response => this.handleHttpResponse(response))
        .then(response => this.handleHttpResponseData(response))
    }

    handleHttpResponse (response:any) {
      this.handleHttpErrorResponses(response)

      if (response.status === StatusCodes.NO_CONTENT) {
        return
      }

      return response.json()
    }

    handleHttpResponseData (data:any) {
      if (data.status_code !== StatusCodes.BAD_REQUEST) {
        return data
      }
      throw new BadRequestError(JSON.stringify(data))
    }

    handleHttpErrorResponses (response:any) {
      if (response.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError('Internal server error')
      }

      if (!response.ok && response.status !== StatusCodes.BAD_REQUEST) {
        throw Error('Response not valid')
      }
    }

  }

  export const searchAllPotions = async () => {
    const potionRepository = new PotionRepository()
    return await potionRepository.searchAll()
  }
