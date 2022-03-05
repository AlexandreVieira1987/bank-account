import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {ApiModule} from "./api/api.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ApiModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [
                __dirname + '/**/*.entity{.ts,.js}'
            ],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
