export class BaseController {
    async response(data: any) {
        if (data instanceof Error) {
            return data.message
        }
        return data
    }
}
