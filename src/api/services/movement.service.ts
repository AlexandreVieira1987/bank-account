import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {MovementEntity} from "../entities/movement.entity";
import {TYPE_OPERATION_CREDIT, TYPE_OPERATION_DEBIT} from "../utils/constants";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class MovementService
{
    constructor(
        @InjectRepository(MovementEntity)
        private model: Repository<MovementEntity>
    ) {}

    async credit(attributes: MovementEntity): Promise<MovementEntity|Error>
    {
        attributes.type = TYPE_OPERATION_CREDIT
        const row = await this.model.save(attributes)

        if (!row) {
            return new Error('Error on save movement')
        }

        return row
    }

    async debit(attributes: MovementEntity): Promise<MovementEntity|Error>
    {
        attributes.type = TYPE_OPERATION_DEBIT
        const row = await this.model.save(attributes)

        if (!row) {
            return new Error('Error on save movement')
        }

        return row
    }
}
