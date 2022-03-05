export default {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [],
    migrationsTableName: "migration",
    migrations: ["src/database/migrations/*.ts"],
    cli: {
        migrationsDir: 'src/database/migrations'
    }
}
