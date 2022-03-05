import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AccountEntity} from "./account.entity";
import {ColumnNumericTransformer} from "../../database/utils/ColumnNumericTransformer";

@Entity('movement')
export class MovementEntity
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    account_id: number;

    @ManyToOne(() => AccountEntity)
    @JoinColumn({name: 'account_id'})
    account: AccountEntity

    @Column('decimal', {precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
    value: number;

    @Column()
    type: string;

    @CreateDateColumn()
    created_at: Date
}