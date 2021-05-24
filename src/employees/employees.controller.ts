import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeListModel } from './models/employee-list';
import { EmployeeService } from './services/employee.service';
import { PatnerService } from './services/patner.service';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly patnerService: PatnerService,
  ) {}

  @Post('/list')
  getAllEmplotees(@Body('date') date: Date): EmployeeListModel[] {
    return this.employeeService.fetchListOfEmployees(new Date(date));
  }

  @Post(':id/spend_per_employee')
  spendPerEmployee(@Body('date') date: Date, @Param('id') companyId: number) {
    return this.employeeService.getSpendPerEmployee(companyId, date);
  }

  @Get('/revenuePerPatner')
  revenuePerPatner() {
    return this.patnerService.revenuePerPatner();
  }
}
