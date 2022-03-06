import {Test, TestingModule} from '@nestjs/testing';
import {AccountService} from './account.service';
import {AccountEntity} from "../entities/account.entity";

const accountArr = [
    new AccountEntity({customer_id: 1, balance: 1000}),
    new AccountEntity({customer_id: 2, balance: 1000}),
    new AccountEntity({customer_id: 3, balance: 1000}),
]


describe('AccountService', () => {
    let accountService: AccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                {
                    provide: 'CONNECTION',
                    useValue: {
                        find: jest.fn().mockResolvedValue(accountArr),
                        findOne: jest.fn(),
                        save: jest.fn(),
                    }
                }
            ],
        }).compile();

        accountService = module.get<AccountService>(AccountService);
    });

    it ('should be defined', () => {
        expect(accountService).toBeDefined();
    });

    describe('findAll', () => {
        it ('Retorna uma array de account', async () => {
            const result = await accountService.findAll()

            expect(result).toEqual(accountArr)

        })
    })
});
