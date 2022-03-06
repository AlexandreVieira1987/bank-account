import {Body, Controller, Post} from '@nestjs/common';
import {TransferService} from "../services/transfer.service";

@Controller('transfer')
export class TransferController
{
    constructor(
        private readonly model: TransferService
    ) {}

    @Post()
    async new(@Body() attributes: {account_from: number, account_to: number, value: number})
    {
        return await this.model.toTransfer(attributes)
    }
}
