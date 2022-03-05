import {Module} from '@nestjs/common';
import {ApiService} from './api.service';
import {ApiController} from './api.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([])
    ],
    controllers: [ApiController],
    providers: [ApiService]
})
export class ApiModule {
}
