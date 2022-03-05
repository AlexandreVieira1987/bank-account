import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class customers1646487003175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customer',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar(50)",
                    },
                    {
                        name: "cpf",
                        type: "varchar(11)",
                        isUnique: true
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer')
    }

}
