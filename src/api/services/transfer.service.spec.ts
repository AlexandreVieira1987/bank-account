import {Test, TestingModule} from '@nestjs/testing';
import {TransferService} from './transfer.service';
import {MovementService} from "./movement.service";
import {CustomerService} from "./customer.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {MovementEntity} from "../entities/movement.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {TransferEntity} from "../entities/transfer.entity";
import {AccountEntity} from "../entities/account.entity";
import {TYPE_OPERATION_CREDIT} from "../utils/constants";
import {Repository} from "typeorm";
import {AccountService} from "./account.service";

const accountMock: AccountEntity[] = [
    new AccountEntity({customer_id: 1, balance: 3000}),
    new AccountEntity({customer_id: 2, balance: 1000}),
    new AccountEntity({customer_id: 3, balance: 1000}),
]

const customerMock = new CustomerEntity({name: 'Testing', cpf: '12154125428', id: undefined})
const movementMock = new MovementEntity({type: TYPE_OPERATION_CREDIT, value: 1000, account_id: 1})
const transferMock = {account_from: 1, account_to: 2, value: 1000}
const transferResponseMock = new TransferEntity({value: 1000, account_id_from: 1, account_id_to: 2})


describe('TransferService', () => {
    let transferService: TransferService;
    let transferEntity: Repository<TransferEntity>

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
                // {
                //     provide: getRepositoryToken(CustomerEntity),
                //     useValue: {
                //         find: jest.fn().mockResolvedValue(customerMock),
                //         findOne: jest.fn().mockResolvedValue(customerMock),
                //         save: jest.fn().mockResolvedValue(customerMock),
                //     }
                // },
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
        }).compile();

        transferService = module.get<TransferService>(TransferService);
        transferEntity = module.get<Repository<TransferEntity>>(getRepositoryToken(TransferEntity))
    });

    it('should be defined', () => {
        expect(transferService).toBeDefined();
        expect(transferEntity).toBeDefined();
    });

    describe('findAll', () => {
        it ('should return a transfer account ', async () => {
            const result = await transferService.toTransfer(transferMock)

            expect(result).toEqual(transferResponseMock)
            expect(transferEntity.save).toHaveBeenCalledTimes(1)
        });

        it ('should throw an exception', () => {
            jest.spyOn(transferEntity, 'save').mockRejectedValueOnce(new Error())
            expect(transferService.toTransfer(transferMock)).rejects.toThrowError()
        });
    })
});
