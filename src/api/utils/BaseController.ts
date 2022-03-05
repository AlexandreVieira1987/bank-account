import {Res} from "@nestjs/common";

export class BaseController {
    async response(@Res() res, data: any) {
        if (data instanceof Error) {
            return res.status(400).json({message: data.message})
        }

        return res.json({
            data: data
        });
    }
}
