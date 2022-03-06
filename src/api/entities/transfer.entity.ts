import {AfterInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AccountEntity} from "./account.entity";
import {ColumnNumericTransformer} from "../../database/utils/ColumnNumericTransformer";

@Entity('transfer')
export class TransferEntity
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    account_id_to: number;

    @ManyToOne(() => AccountEntity)
    @JoinColumn({name: 'account_id_to'})
    accountTo: AccountEntity

    @Column()
    account_id_from: number;

    @ManyToOne(() => AccountEntity)
    @JoinColumn({name: 'account_id_from'})
    accountFrom: AccountEntity

    @Column('decimal', {precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    value: number;

    @CreateDateColumn()
    created_at: Date

    constructor(transfer: Partial<TransferEntity>)
    {
        this.id = transfer?.id
        this.account_id_to = transfer?.account_id_to,
        this.account_id_from = transfer?.account_id_from,
        this.value = transfer?.value
    }
}