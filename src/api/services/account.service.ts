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
            const movement = new MovementService();
            await movement.credit({
                account_id: save.id,
                value: attributes.value,
            } as MovementEntity)
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
            const movement = new MovementService();
            await movement.debit({
                account_id: save.id,
                value: attributes.value,
            } as MovementEntity)
        }

        return save
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
