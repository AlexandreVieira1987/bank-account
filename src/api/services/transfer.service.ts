import {Inject, Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {TransferEntity} from "../entities/transfer.entity";
import {AccountService} from "./account.service";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TransferService
{
    constructor(
        @InjectRepository(TransferEntity)
        private model: Repository<TransferEntity>,

        @Inject(AccountService)
        private account: AccountService

    ) {}

    async toTransfer(attributes: {account_from: number, account_to: number, value: number}): Promise<TransferEntity|Error>
    {
        const accountFrom = await this.account.toDebit({value: attributes.value, id: attributes.account_from})
        if (accountFrom instanceof Error) {
            return accountFrom
        }

        const accountTo = await this.account.toCredit({value: attributes.value, id: attributes.account_to})
        if (accountTo instanceof Error) {
            return accountTo
        }

        const save = await this.model.save({
            value: attributes.value,
            account_id_from: attributes.account_from,
            account_id_to: attributes.account_to
        } as TransferEntity)

        if (!save) {
            return new Error('Error on save account')
        }

        return save
    }
}
