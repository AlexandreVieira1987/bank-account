import {Controller, Get} from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    TypeOrmHealthIndicator
} from "@nestjs/terminus";

@Controller('health')
export class HealthCheckController
{
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,

        private db: TypeOrmHealthIndicator,
        private memoryIndicator: MemoryHealthIndicator,

        private diskIndicator: DiskHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.memoryIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
            () => this.diskIndicator.checkStorage('disk health', {
                thresholdPercent: 0.5, path: '/'
            })
        ]);
    }
}
