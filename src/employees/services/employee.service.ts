import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import MOCK_EMPLOYEES from '@data/employees';
import MOCK_ORDERS from '@data/orders';
import MOCK_VOUCHERS from '@data/vouchers';
import MOCK_COMPANIES from '@data/companies';
import { Employees } from '../models/employees';
import { CompaniesModel } from '../models/companies';
import { EmployeeListModel } from '../models/employee-list';
import {
  differenceInCalendarMonths,
  differenceInMonths,
  isDate,
} from 'date-fns';
import { ITaxInfo } from '../interface/tax-info-interface';
import { IEmployeeSpend } from '../interface/employee-spend-interface';
import { EmployeeSpendForCompanyModel } from '../models/employee-spend-for-company';

@Injectable()
export class EmployeeService {
  // let employees;
  TAX_AMOUNT = 0.3;
  constructor() {}

  /**
   * List all employees grouped by company that have more than 10€ in benefits left to spend this month.
   * This query should be flexible in such a way that you can provide a past month as an argument as well.
   */

  public fetchListOfEmployees(date: Date): EmployeeListModel[] {
    const objectToBuild: EmployeeListModel[] = [];

    // validate date value passed
    if (!isDate(date)) {
      throw new BadRequestException('Date value is invalid');
    }
    MOCK_COMPANIES.forEach((c) => {
      // get list of employees for each company
      const employees = this.getListOfEmployeesPerCompany(c.id);
      const employeesWithMoreThan10Remaining: Employees[] = [];
      // iterate throufh each employee and see if they meet condition

      employees.forEach((e) => {
        const employeeBudget = e.budget;
        const spendForGivenMonth = this.getSpendPerEmployee(e.id, date);
        const expenditure = this.calculateToTalInArray(
          spendForGivenMonth.allItems,
        );
        // get difference in spending for each employee and
        const condition = this.checkIfRemainingBudgetIsGreaterThan10(employeeBudget, expenditure);
        if (condition.pass) {
          const employeeWithMoreThan10Remaining: Employees = {
            budgetRemaining: condition.diff,
            name: e.name,
            budget: e.budget,
            id: e.id,
          };
          employeesWithMoreThan10Remaining.push(
            employeeWithMoreThan10Remaining,
          );
        }
      });

      const candidateItem = {
        companyName: c.title,
        employees: employeesWithMoreThan10Remaining,
      };
      if (
        employeesWithMoreThan10Remaining &&
        employeesWithMoreThan10Remaining.length > 0
      ) {
        objectToBuild.push(candidateItem);
      }
    });

    return objectToBuild;
  }

  // fet difference between total spend per month and available budget for employee

  private getListOfEmployeesPerCompany(companyId: number): Employees[] {
    const companyEmployees = MOCK_EMPLOYEES.filter((e) => {
      if (e.companyId === companyId) return e;
    });
    return companyEmployees;
  }

  /**
   * A list of employees from a single company with their spending in a certain month.
   * It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold
   * should be split up by net salary and taxes.
   * There should also be a total per employee
   */

  getSpendForEmployeeForCompany(date: Date, companyId: number) {
    const employees = MOCK_EMPLOYEES.filter((e) => e.companyId === companyId);
    if (!employees || employees.length < 1) {
      throw new NotFoundException('Company id provider lacks employees');
    }
    const employeeSpendForCompany: EmployeeSpendForCompanyModel[] = [];
    employees.forEach((e) => {
      const spendForEmployee = this.getSpendPerEmployee(e.id, date);

      const summary = this.calculateNetSalaryAndTaxes(
        spendForEmployee.itemsToBeTaxed,
      );

      const unTaxedTotal = this.calculateToTalInArray(
        spendForEmployee.untaxedItems,
      );

      const totalSpend = unTaxedTotal + summary.totalTaxed;

      const summerySpend: EmployeeSpendForCompanyModel = {
        employeeName: e.name,
        netSalary: summary.totalNet,
        taxFree: spendForEmployee.untaxedItems,
        taxes: summary.totalTaxed,
        totalSpent: totalSpend,
      };

      employeeSpendForCompany.push(summerySpend);
    });

    return employeeSpendForCompany;
  }

  // fetch all employees for given company
  // get total spent by each employee below 44
  // get total spent by each employee above 44
  getSpendPerEmployee(employeeId: number, date: Date): IEmployeeSpend {
    const moneySpent: number[] = [];
    const moneySpentBelow44: number[] = [];
    const moneySpentAbove44: number[] = [];
    const sortedByLeastDateFirst = MOCK_ORDERS.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
    });
    sortedByLeastDateFirst.forEach((o) => {
      const differenceInMonths = differenceInCalendarMonths(o.date, date);
      if (differenceInMonths === 0 && employeeId === o.employeeId) {
        // find voucher
        const voucher = MOCK_VOUCHERS.find((v) => v.id === o.voucherId);
        // check whether total of moneySpent is above 44
        moneySpent.push(voucher.amount);
        const totalSpent = this.calculateToTalInArray(moneySpent);
        if (totalSpent >= 44) {
          // else push to below array
          moneySpentAbove44.push(voucher.amount);
        } else if (totalSpent < 44) {
          moneySpentBelow44.push(voucher.amount);
        }
      }
    });

    return {
      itemsToBeTaxed: moneySpentAbove44,
      untaxedItems: moneySpentBelow44,
      allItems: moneySpent,
    };
  }

  /**
   *Helper function start here
   */

  calculateToTalInArray(moneySpent: number[]) {
    const total = moneySpent.reduce(
      (previous, current) => Number(previous) + Number(current),
      0,
    );
    return total;
  }

  calculateNetSalaryAndTaxes(itemsToTax: number[]) {
    const taxableAmount: number[] = [];
    const netItems: number[] = [];
    const grossItems: number[] = [];
    itemsToTax.forEach((i) => {
      const taxable = i * this.TAX_AMOUNT;
      const grossAmount = i;
      const netAmount = i - taxable;
      taxableAmount.push(taxable);
      netItems.push(netAmount);
      grossItems.push(grossAmount);
    });
    const totalTaxed = this.calculateToTalInArray(taxableAmount);
    const totalNet = this.calculateToTalInArray(netItems);
    const totalGross = this.calculateToTalInArray(grossItems);
    return {
      totalTaxed,
      totalNet,
      totalGross,
    };
  }

  // check if employee meets condition
  private checkIfRemainingBudgetIsGreaterThan10(employeeBudget: number, employeeExpenditure: number) {
    const difference = employeeExpenditure - employeeBudget;
    if (difference >= 10) {
      return {
        pass: true,
        diff: difference,
      };
    }
    return {
      pass: false,
      diff: difference,
    };
  }
}
