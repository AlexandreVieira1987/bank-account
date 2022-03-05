import {Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {AccountEntity} from "../entities/account.entity";
import {CustomerService} from "./customer.service";
import {CustomerEntity} from "../entities/customer.entity";

@Injectable()
export class AccountService
{
    async model(): Promise<Repository<AccountEntity>>
    {
        return getRepository(AccountEntity)
    }

    async save(attributes: CustomerEntity): Promise<AccountEntity|string|Error> {
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
