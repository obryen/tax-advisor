import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../services/employee.service';

describe.only('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return sum of array given number array,', () => {
    const mockArray = [3, 2, 1];
    const expectedResult = 6;

    expect(service.calculateToTalInArray(mockArray)).toEqual(expectedResult);
  });

  it('should return taxed values(when sum of values exceeded 44), gross(tax+ net) and net amounts(take home amount) given an array of to be taxed values ', () => {
    const amountsToTax = [10, 20, 30, 44];
    // taxed (3% of each value) : 3 ,6 , 9, 13.2
    // gross ( spent amount): 10, 20, 30, 44
    // net spend (spent - taxed): 7, 14,21, 30.8
    const expectedResult = {
      totalTaxed: 31.2,
      totalNet: 72.8,
      totalGross: 104,
    };

    expect(service.calculateNetSalaryAndTaxes(amountsToTax)).toEqual(
      expectedResult,
    );
  });
});
