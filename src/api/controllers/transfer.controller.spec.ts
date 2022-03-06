import {Test, TestingModule} from '@nestjs/testing';
import {TransferController} from './transfer.controller';
import {TransferService} from "../services/transfer.service";
import {AccountService} from "../services/account.service";
import {AccountEntity} from "../entities/account.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {MovementEntity} from "../entities/movement.entity";
import {TYPE_OPERATION_CREDIT} from "../utils/constants";
import {TransferEntity} from "../entities/transfer.entity";
import {MovementService} from "../services/movement.service";
import {CustomerService} from "../services/customer.service";
import {getRepositoryToken} from "@nestjs/typeorm";

const accountMock: AccountEntity[] = [
    new AccountEntity({customer_id: 1, balance: 3000}),
    new AccountEntity({customer_id: 2, balance: 1000}),
    new AccountEntity({customer_id: 3, balance: 1000}),
]

const customerMock = new CustomerEntity({name: 'Testing', cpf: '12154125428', id: undefined})
const movementMock = new MovementEntity({type: TYPE_OPERATION_CREDIT, value: 1000, account_id: 1})
const transferMock = {account_from: 1, account_to: 2, value: 1000}
const transferResponseMock = new TransferEntity({value: 1000, account_id_from: 1, account_id_to: 2})

describe('TransferController', () => {
    let transferController: TransferController;
    let transferService: TransferService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MovementService,
                AccountService,
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
                    useValue: {
                        find: jest.fn().mockResolvedValue(transferResponseMock),
                        findOne: jest.fn().mockResolvedValue(transferResponseMock),
                        save: jest.fn().mockResolvedValue(transferResponseMock),
                    }
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
            controllers: [TransferController],
        }).compile();

        transferController = module.get<TransferController>(TransferController);
        transferService = module.get<TransferService>(TransferService);
    });

    it('should be defined', () => {
        expect(transferController).toBeDefined();
    });

    describe('create', () => {
        it ('should return new account created', async () => {
            const result = await transferController.new(transferMock)

            expect(result).toBe(transferResponseMock)
        })

        it ('should throw an exception', () => {
            jest.spyOn(transferService, 'toTransfer').mockRejectedValueOnce(new Error())
            expect(transferService.toTransfer(transferMock)).rejects.toThrowError()
        });
    })
});
