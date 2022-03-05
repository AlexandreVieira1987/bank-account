import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CustomerService } from './services/customer.service';
import {CustomerEntity} from "./entities/customer.entity";
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import {AccountEntity} from "./entities/account.entity";
import { MovementService } from './services/movement.service';
import {MovementEntity} from "./entities/movement.entity";
import {TransferEntity} from "./entities/transfer.entity";
import { TransferService } from './services/transfer.service';
import { TransferController } from './controllers/transfer.controller';
import {TerminusModule} from "@nestjs/terminus";
import { HealthCheckController } from './controllers/health-check.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CustomerEntity,
            AccountEntity,
            MovementEntity,
            TransferEntity
        ]),
        TerminusModule
    ],
    controllers: [
        AccountController,
        TransferController,
        HealthCheckController
    ],
    providers: [
        CustomerService,
        AccountService,
        MovementService,
        TransferService,
    ]
})
export class ApiModule {}
