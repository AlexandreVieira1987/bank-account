import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class transfers1646487258209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transfer',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "account_id_from",
                        type: "integer",
                    },
                    {
                        name: "account_id_to",
                        type: "integer",
                    },
                    {
                        name: "value",
                        type: "decimal(10,2)",
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_account_id_from",
                        columnNames: ["account_id_from"],
                        referencedTableName: "account",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_account_id_to",
                        columnNames: ["account_id_to"],
                        referencedTableName: "account",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transfer')
    }

}
