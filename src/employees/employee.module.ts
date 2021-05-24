import { HttpModule, Module } from '@nestjs/common';
import { PeopleResolver as EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './services/employee.service';
import { PatnerService } from './services/patner.service';
import { PatnerRevenueResolver } from './resolvers/patner.resolver';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [
    EmployeeService,
    EmployeeResolver,
    PatnerService,
    PatnerRevenueResolver,
  ],
})
export class EmployeeModule {}
