import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from '../services/employee.service';
import { EmployeeListModel } from '../models/employee-list';
import { EmployeeSpendForCompanyModel } from '../models/employee-spend-for-company';

@Resolver()
export class PeopleResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [EmployeeListModel], {
    name: 'employees_with_more_than_10',
    nullable: true,
  })
  getEmployeesWithMoreThan10Remaining(
    @Args('date') date: Date,
  ): EmployeeListModel[] {
    return this.employeeService.fetchListOfEmployees(date);
  }

  @Query(() => [EmployeeSpendForCompanyModel], {
    name: 'employee_spend_for_company',
    nullable: true,
  })
  companySpendPerEmployee(
    @Args('date') date: Date,
    @Args('companyId') companyId: number,
  ): EmployeeSpendForCompanyModel[] {
    return this.employeeService.getSpendForEmployeeForCompany(
      date,
      companyId,
    );
  }
}
