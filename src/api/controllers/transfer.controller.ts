import {Body, Controller, Post} from '@nestjs/common';
import {TransferService} from "../services/transfer.service";
import {ApiResponse} from "@nestjs/swagger";

@Controller('transfer')
export class TransferController
{
    constructor(
        private readonly model: TransferService
    ) {}

    @Post()
    @ApiResponse({
        description: 'Faz uma transferência',
    })
    async new(@Body() attributes: {account_from: number, account_to: number, value: number})
    {
        const model = await this.model.toTransfer(attributes)
        if (model instanceof Error) {
            return model.message
        }
        return model
    }
}
