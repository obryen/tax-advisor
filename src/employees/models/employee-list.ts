import { Employees } from './employees';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeListModel {
  constructor(intialData: Partial<EmployeeListModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field()
  companyName: string;
  @Field(() => [Employees])
  employees: Employees[];
}
