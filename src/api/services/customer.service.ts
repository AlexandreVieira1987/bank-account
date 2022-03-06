import { Injectable } from '@nestjs/common';
import {CustomerEntity} from "../entities/customer.entity";
import {getRepository, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CustomerService
{
    constructor(
        @InjectRepository(CustomerEntity)
        private model: Repository<CustomerEntity>
    ) {}

    async findAll(): Promise<CustomerEntity[]>
    {
        return await this.model.find()
    }

    async create(attributes: CustomerEntity): Promise<CustomerEntity | Error>
    {
        if (await this.model.findOne({cpf: attributes.cpf})) {
            return new Error('Customer already exists')
        }

        const save = await this.model.save(attributes)

        if (!save) {
            return new Error('Error on save customer')
        }

        return save
    }
}
