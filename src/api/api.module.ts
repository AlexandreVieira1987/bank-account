import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CustomerService } from './services/customer.service';
import {CustomerEntity} from "./entities/customer.entity";
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import {AccountEntity} from "./entities/account.entity";
import { MovementService } from './services/movement.service';
import {MovementEntity} from "./entities/movement.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CustomerEntity,
            AccountEntity,
            MovementEntity
        ])
    ],
    controllers: [AccountController],
    providers: [
        CustomerService,
        AccountService,
        MovementService,


        AccountEntity,
        CustomerEntity,
        MovementEntity
    ]
})
export class ApiModule {}
