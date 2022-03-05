import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {BaseController} from "../utils/BaseController";
import {AccountEntity} from "../entities/account.entity";
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
        const model = await this.model.save(attributes);
        return this.response(res, model);
    }
}
