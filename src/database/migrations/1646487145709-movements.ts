import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class movements1646487145709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'movement',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "account_id",
                        type: "integer",
                    },
                    {
                        name: 'type',
                        type: 'varchar(10)'
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
                        name: "fk_account",
                        columnNames: ["account_id"],
                        referencedTableName: "account",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movement')
    }

}
