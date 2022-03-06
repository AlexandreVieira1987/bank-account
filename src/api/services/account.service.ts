import {Inject, Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {AccountEntity} from "../entities/account.entity";
import {CustomerService} from "./customer.service";
import {CustomerEntity} from "../entities/customer.entity";
import {MovementService} from "./movement.service";
import {MovementEntity} from "../entities/movement.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AccountService
{
    constructor(
        @InjectRepository(AccountEntity)
        private model: Repository<AccountEntity>,

        @Inject(MovementService)
        private movement: MovementService,

        @Inject(CustomerService)
        private customer: CustomerService,
    )
    {}

    async findAll(): Promise<AccountEntity[]|Error>
    {
        const model = await this.model()
        return await model.find()
    }

    async findOne(id: number): Promise<AccountEntity|Error>
    {
        const model = await this.model
        const account = await model.findOne({ id })

        if (account === undefined) {
            return new Error('Account no found')
        }

        return account
    }

    async balance(id: number): Promise<number|Error>
    {
        const account = await this.findOne(id)

        if (account instanceof Error) {
            return new Error('Account no found')
        }

        return account.balance
    }

    async toCredit(attributes: {id: number, value: number}): Promise<AccountEntity|string|Error>
    {
        const account = await this.findOne(attributes.id)

        if (account instanceof Error) {
            return new Error('Account no found')
        }

        account.balance = (account.balance + attributes.value)

        const model = await this.model
        const save = await model.save(account)
        if (save) {
            await this.registerMovement({account: save.id, value: save.balance})
        }

        return save
    }

    async toDebit(attributes: {id: number, value: number}): Promise<AccountEntity|string|Error>
    {
        const account = await this.findOne(attributes.id)

        if (account instanceof Error) {
            return new Error('Account no found')
        }

        account.balance = (account.balance - attributes.value)
        if (account.balance < 0) {
            return new Error('Insufficient balance')
        }

        const model = await this.model
        const save = await model.save(account)
        if (save) {
            await this.registerMovement({account: save.id, value: save.balance})
        }

        return save
    }

    private async registerMovement(attr: {account: number, value: number})
    {
        await this.movement.debit({
            account_id: attr.account,
            value: attr.value,
        } as MovementEntity)
    }

    async create(attributes: CustomerEntity): Promise<AccountEntity|Error>
    {
        const model = await this.model
        const customer = await this.customer.create(attributes)

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
