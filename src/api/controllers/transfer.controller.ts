import {Body, Controller, Post} from '@nestjs/common';
import {TransferService} from "../services/transfer.service";
import {ApiResponse} from "@nestjs/swagger";
import {BaseController} from "../utils/BaseController";

@Controller('transfer')
export class TransferController extends BaseController
{
    constructor(
        private readonly model: TransferService
    ) {
        super()
    }

    @Post()
    @ApiResponse({
        description: 'Faz uma transferência',
    })
    async new(@Body() attributes: {account_from: number, account_to: number, value: number})
    {
        return this.response(await this.model.toTransfer(attributes))
    }
}
