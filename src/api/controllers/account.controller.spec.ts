import {Test, TestingModule} from '@nestjs/testing';
import {AccountController} from './account.controller';
import {CustomerEntity} from "../entities/customer.entity";
import {AccountService} from "../services/account.service";
import {MovementService} from "../services/movement.service";
import {CustomerService} from "../services/customer.service";
import {TransferService} from "../services/transfer.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {MovementEntity} from "../entities/movement.entity";
import {TYPE_OPERATION_CREDIT} from "../utils/constants";
import {AccountEntity} from "../entities/account.entity";
import {TransferEntity} from "../entities/transfer.entity";

const accountMock: AccountEntity[] = [
    new AccountEntity({customer_id: 1, balance: 1000}),
    new AccountEntity({customer_id: 2, balance: 1000}),
    new AccountEntity({customer_id: 3, balance: 1000}),
]

const customerMock = new CustomerEntity({name: 'Testing', cpf: '12154125428', id: undefined})
const movementMock = new MovementEntity({type: TYPE_OPERATION_CREDIT, value: 1000, account_id: 1})

describe('AccountController', () => {
    let accountController: AccountController;
    let accountService: AccountService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                MovementService,
                CustomerService,
                TransferService,
                {
                    provide: getRepositoryToken(MovementEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue(movementMock),
                        findOne: jest.fn().mockResolvedValue(movementMock),
                        save: jest.fn().mockResolvedValue(movementMock),
                    }
                },
                {
                    provide: getRepositoryToken(CustomerEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue(customerMock),
                        findOne: jest.fn().mockResolvedValue(customerMock),
                        save: jest.fn().mockResolvedValue(customerMock),
                    }
                },
                {
                    provide: getRepositoryToken(TransferEntity),
                    useValue: {}
                },
                {
                    provide: getRepositoryToken(AccountEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue(accountMock),
                        findOne: jest.fn().mockResolvedValue(accountMock[0]),
                        save: jest.fn().mockResolvedValue(accountMock[0]),
                    }
                }
            ],
            controllers: [AccountController],
        }).compile();

        accountController = module.get<AccountController>(AccountController);
        accountService = module.get<AccountService>(AccountService);
    });

    it('should be defined', () => {
        expect(accountController).toBeDefined();
    });

    describe('create', () => {
        it ('should return new account created', async () => {
            const result = await accountController.create(customerMock)

            expect(result).toBe(accountMock[0])
        })

        it ('should throw an exception', () => {
            jest.spyOn(accountService, 'create').mockRejectedValueOnce(new Error())
            expect(accountService.create(customerMock)).rejects.toThrowError()
        });
    })
});
