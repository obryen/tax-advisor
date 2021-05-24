import { Test, TestingModule } from '@nestjs/testing';
import { IBudgetInfo } from '../interface/budget-info-interface';
import { EmployeeService } from '../services/employee.service';

describe.only('EmployeeService', () => {
  let service: EmployeeService;
  const remainingBudgetValue = 20;
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

  it(`should return true  if the difference between expenditure and budget is above ${remainingBudgetValue}`, () => {
    const mockBudget = 50;
    const mockExpenditure = 80;

    const expectedResponse: IBudgetInfo = {
      difference: 30,
      budgetIsAboveValue: true,
    };

    expect(
      service.checkIfRemainingBudgetIsGreaterThanValue(
        mockBudget,
        mockExpenditure,
        expectedResponse.difference,
      ),
    ).toEqual(expectedResponse);
  });

  it(`should return false  if the difference between expenditure and budget is below ${remainingBudgetValue}`, () => {
    const mockBudget = 80;
    const mockExpenditure = 50;

    const expectedResponse: IBudgetInfo = {
      difference: -30,
      budgetIsAboveValue: true,
    };

    expect(
      service.checkIfRemainingBudgetIsGreaterThanValue(
        mockBudget,
        mockExpenditure,
        expectedResponse.difference,
      ),
    ).toEqual(expectedResponse);
  });
});
