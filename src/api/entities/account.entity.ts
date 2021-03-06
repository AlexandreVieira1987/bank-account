import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {CustomerEntity} from "./customer.entity";
import {ColumnNumericTransformer} from "../../database/utils/ColumnNumericTransformer";

@Entity('account')
export class AccountEntity
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    customer_id: number;

    @ManyToOne(() => CustomerEntity)
    @JoinColumn({name: 'customer_id'})
    customer: CustomerEntity

    @Column('decimal', {precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    balance: number;

    @CreateDateColumn()
    created_at: Date

    constructor(account: Partial<AccountEntity>)
    {
        this.id = account?.id,
        this.customer_id = account?.customer_id,
        this.balance = account?.balance
    }
}
