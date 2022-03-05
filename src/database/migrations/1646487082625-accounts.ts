import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class accounts1646487082625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'account',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "customer_id",
                        type: "integer",
                    },
                    {
                        name: "balance",
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
                        name: "fk_customer",
                        columnNames: ["customer_id"],
                        referencedTableName: "customer",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account')
    }

}
