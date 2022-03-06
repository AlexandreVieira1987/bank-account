import {Test, TestingModule} from '@nestjs/testing';
import {AccountService} from './account.service';
import {AccountEntity} from "../entities/account.entity";
import {MovementService} from "./movement.service";
import {CustomerService} from "./customer.service";
import {TransferService} from "./transfer.service";
import {CustomerEntity} from "../entities/customer.entity";
import {MovementEntity} from "../entities/movement.entity";
import {TransferEntity} from "../entities/transfer.entity";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TYPE_OPERATION_CREDIT} from "../utils/constants";

const accountMock: AccountEntity[] = [
    new AccountEntity({customer_id: 1, balance: 1000}),
    new AccountEntity({customer_id: 2, balance: 1000}),
    new AccountEntity({customer_id: 3, balance: 1000}),
]

const customerMock = new CustomerEntity({name: 'Testing', cpf: '12154125428', id: undefined})
const movementMock = new MovementEntity({type: TYPE_OPERATION_CREDIT, value: 1000, account_id: 1})

describe('AccountService', () => {
    let accountService: AccountService;
    let accountEntity: Repository<AccountEntity>

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
        }).compile();

        accountService = module.get<AccountService>(AccountService);
        accountEntity = module.get<Repository<AccountEntity>>(getRepositoryToken(AccountEntity))
    });

    it ('should be defined', () => {
        expect(accountService).toBeDefined();
        expect(accountEntity).toBeDefined();
    });

    describe('findAll', () => {
        it ('should return a account list ', async () => {
            const result = await accountService.findAll()

            expect(result).toEqual(accountMock)
            expect(accountEntity.find).toHaveBeenCalledTimes(1)
        });

        it ('should throw an exception', () => {
            jest.spyOn(accountEntity, 'find').mockRejectedValueOnce(new Error())
            expect(accountService.findAll()).rejects.toThrowError()
        });
    })

    describe('create', () => {
        it ('should return a new account ', async () => {
            const result = await accountService.create(customerMock)

            expect(result).toBe(accountMock[0])
            expect(accountEntity.save).toHaveBeenCalledTimes(1)
        });

        it ('should throw an exception', () => {
            jest.spyOn(accountEntity, 'save').mockRejectedValueOnce(new Error())
            expect(accountService.create(customerMock)).rejects.toThrowError()
        });
    })

    describe('toCredit', () => {
        it ('should to credit an account ', async () => {
            const result = await accountService.toCredit({id: 1, value: 1000})

            expect(result).toBe(accountMock[0])
            expect(accountEntity.save).toHaveBeenCalledTimes(1)
        });

        it ('should throw an exception', () => {
            jest.spyOn(accountEntity, 'save').mockRejectedValueOnce(new Error())
            expect(accountService.toCredit({id: 1, value: 1000})).rejects.toThrowError()
        });
    })

    describe('toDebit', () => {
        it ('should to debit an account', async () => {
            const result = await accountService.toDebit({id: 1, value: 1000})

            expect(result).toBe(accountMock[0])
            expect(accountEntity.save).toHaveBeenCalledTimes(1)
        });

        it ('should throw an exception', () => {
            jest.spyOn(accountEntity, 'save').mockRejectedValueOnce(new Error())
            expect(accountService.toDebit({id: 1, value: 1000})).rejects.toThrowError()
        });
    })
});
