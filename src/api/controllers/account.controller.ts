import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AccountService} from "../services/account.service";
import {CustomerEntity} from "../entities/customer.entity";

@Controller('account')
export class AccountController
{
    constructor(
        private readonly model: AccountService
    ) {}

    @Post()
    async create(@Body() attributes: CustomerEntity)
    {
        return await this.model.create(attributes);
    }

    @Post(':account_id/credit')
    async credit(@Param('account_id') account_id: number, @Body() attributes: {value: number})
    {
        return  await this.model.toCredit({
            value: attributes.value,
            id: account_id
        })
    }

    @Post(':account_id/debit')
    async debit(@Param('account_id') account_id: number, @Body() attributes: {value: number})
    {
        return await this.model.toDebit({
            value: attributes.value,
            id: account_id
        })

    }

    @Get(':account_id/balance')
    async balance(@Param('account_id') account_id: number)
    {
        return await this.model.balance(account_id)
    }
}
