import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('customer')
export class CustomerEntity
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    name: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    created_at: Date

    constructor(customer: Partial<CustomerEntity>)
    {
        this.id = customer?.id
        this.name = customer?.name,
        this.cpf = customer?.cpf,
        this.created_at = customer?.created_at
    }
}
