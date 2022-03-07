import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AccountService} from "../services/account.service";
import {CustomerEntity} from "../entities/customer.entity";
import {ApiBody, ApiProperty, ApiResponse} from "@nestjs/swagger";
import {BaseController} from "../utils/BaseController";

@Controller('account')
export class AccountController extends BaseController
{
    constructor(
        private readonly model: AccountService
    ) {
        super()
    }

    @Post()
    @ApiResponse({
        description: 'Cria uma conta para o cliente informado',
    })
    async create(@Body() attributes: CustomerEntity)
    {
        return this.response(await this.model.create(attributes))
    }

    @Post(':account_id/credit')
    @ApiResponse({
        description: 'Credita valor na conta informada',
    })
    async credit(@Param('account_id') account_id: number, @Body() attributes: {value: number})
    {
        return this.response(await this.model.toCredit({
            value: attributes.value,
            id: account_id
        }))
    }

    @Post(':account_id/debit')
    @ApiResponse({
        description: 'Debita valor na conta informada',
    })
    async debit(@Param('account_id') account_id: number, @Body() attributes: {value: number})
    {
        return this.response(await this.model.toDebit({
            value: attributes.value,
            id: account_id
        }))
    }

    @Get(':account_id/balance')
    @ApiResponse({
        description: 'Retorna o saldo da conta informada',
    })
    async balance(@Param('account_id') account_id: number)
    {
        return this.response(await this.model.balance(account_id))
    }
}
