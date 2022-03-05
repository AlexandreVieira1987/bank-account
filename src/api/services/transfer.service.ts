import {Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {TransferEntity} from "../entities/transfer.entity";
import {AccountService} from "./account.service";

@Injectable()
export class TransferService
{
    async model(): Promise<Repository<TransferEntity>>
    {
        return getRepository(TransferEntity)
    }

    async toTransfer(attributes: {account_from: number, account_to: number, value: number}): Promise<TransferEntity|Error>
    {
        const account = new AccountService();

        const accountFrom = await account.toDebit({value: attributes.value, id: attributes.account_from})
        if (accountFrom instanceof Error) {
            return accountFrom
        }

        const accountTo = await account.toCredit({value: attributes.value, id: attributes.account_to})
        if (accountTo instanceof Error) {
            return accountTo
        }

        const model = await this.model()
        const save = await model.save({
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
