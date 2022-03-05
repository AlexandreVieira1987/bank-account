import { Injectable } from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {CustomerEntity} from "../entities/customer.entity";
import {MovementEntity} from "../entities/movement.entity";
import {TYPE_OPERATION_CREDIT, TYPE_OPERATION_DEBIT} from "../utils/constants";

@Injectable()
export class MovementService
{
    async model(): Promise<Repository<MovementEntity>>
    {
        return getRepository(MovementEntity)
    }

    async credit(attributes: MovementEntity): Promise<MovementEntity|Error>
    {
        const model = await this.model()

        attributes.type = TYPE_OPERATION_CREDIT
        const row = await model.save(attributes)

        if (!row) {
            return new Error('Error on save movement')
        }

        return row
    }

    async debit(attributes: MovementEntity): Promise<MovementEntity|Error>
    {
        const model = await this.model()

        attributes.type = TYPE_OPERATION_DEBIT
        const row = await model.save(attributes)

        if (!row) {
            return new Error('Error on save movement')
        }

        return row
    }
}
