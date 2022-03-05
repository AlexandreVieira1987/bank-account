import { Injectable } from '@nestjs/common';
import {CustomerEntity} from "../entities/customer.entity";
import {getRepository, Repository} from "typeorm";

@Injectable()
export class CustomerService
{
    async model(): Promise<Repository<CustomerEntity>>
    {
        return getRepository(CustomerEntity)
    }

    async findAll(): Promise<CustomerEntity[]>
    {
        return (await this.model()).find()
    }

    async create(attributes: CustomerEntity): Promise<CustomerEntity | Error>
    {
        const model = await this.model()

        if (await model.findOne({cpf: attributes.cpf})) {
            return new Error('Customer already exists')
        }

        const save = await model.save(attributes)

        if (!save) {
            return new Error('Error on save customer')
        }

        return save
    }
}
