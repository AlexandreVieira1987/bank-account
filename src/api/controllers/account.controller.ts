import {Body, Controller, Param, Post, Res} from '@nestjs/common';
import {BaseController} from "../utils/BaseController";
import {AccountService} from "../services/account.service";
import {CustomerEntity} from "../entities/customer.entity";

@Controller('account')
export class AccountController extends BaseController
{
    constructor(
        private readonly model: AccountService
    ) {
        super()
    }

    @Post()
    async create(@Body() attributes: CustomerEntity, @Res() res)
    {
        const model = await this.model.create(attributes);
        return this.response(res, model);
    }

    @Post(':account_id/credit')
    async credit(@Param('account_id') account_id: number, @Body() attributes: {value: number}, @Res() res)
    {
        const model = await this.model.toCredit({
            value: attributes.value,
            id: account_id
        })

        return this.response(res, model)
    }
}
