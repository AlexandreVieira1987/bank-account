import {Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {AccountEntity} from "../entities/account.entity";
import {CustomerService} from "./customer.service";
import {CustomerEntity} from "../entities/customer.entity";
import {MovementService} from "./movement.service";
import {MovementEntity} from "../entities/movement.entity";

@Injectable()
export class AccountService
{
    async model(): Promise<Repository<AccountEntity>>
    {
        return getRepository(AccountEntity)
    }

    async toCredit(attributes: {id: number, value: number}): Promise<AccountEntity|string|Error>
    {
        const model = await this.model()
        const account = await model.findOne({id: attributes.id})

        if (account instanceof Error) {
            return new Error('Account no found')
        }

        account.balance = (account.balance + attributes.value)

        const save = await model.save(account)
        if (save) {
            await AccountService.registerMovement({account: save.id, value: save.balance})
        }

        return save
    }

    async toDebit(attributes: {id: number, value: number}): Promise<AccountEntity|string|Error>
    {
        const model = await this.model()
        const account = await model.findOne({id: attributes.id})

        if (account instanceof Error) {
            return new Error('Account no found')
        }

        account.balance = (account.balance - attributes.value)
        if (account.balance < 0) {
            return new Error('Insufficient balance')
        }

        const save = await model.save(account)
        if (save) {
            await AccountService.registerMovement({account: save.id, value: save.balance})
        }

        return save
    }

    private static async registerMovement(attr: {account: number, value: number})
    {
        const movement = new MovementService();
        await movement.debit({
            account_id: attr.account,
            value: attr.value,
        } as MovementEntity)
    }

    async create(attributes: CustomerEntity): Promise<AccountEntity|Error>
    {
        const model = await this.model()
        const modelCustomer = new CustomerService()

        const customer = await modelCustomer.create(attributes)

        if (customer instanceof Error) {
            return customer
        }

        const accountAttr = {
            balance: 0,
            customer_id: attributes.id,
        } as AccountEntity


        const save = await model.save(accountAttr)

        if (!save) {
            return new Error('Error on save account')
        }

        return save
    }
}
