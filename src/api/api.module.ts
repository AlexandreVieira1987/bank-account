import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CustomerService } from './services/customer.service';
import {CustomerEntity} from "./entities/customer.entity";
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import {AccountEntity} from "./entities/account.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CustomerEntity,
            AccountEntity
        ])
    ],
    controllers: [AccountController],
    providers: [
        CustomerService,
        AccountService
    ]
})
export class ApiModule {}
