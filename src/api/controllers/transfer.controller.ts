import {Body, Controller, Param, Post, Res} from '@nestjs/common';
import {BaseController} from "../utils/BaseController";
import {AccountService} from "../services/account.service";
import {TransferService} from "../services/transfer.service";

@Controller('transfer')
export class TransferController extends BaseController
{
    constructor(
        private readonly model: TransferService
    ) {
        super()
    }

    @Post()
    async new(@Body() attributes: {account_from: number, account_to: number, value: number}, @Res() res)
    {
        const model = await this.model.toTransfer(attributes)
        return this.response(res, model)
    }
}
