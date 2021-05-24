import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeSpendForCompanyModel {
  constructor(intialData: Partial<EmployeeSpendForCompanyModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }

  @Field()
  employeeName: string;
  @Field(() => [Number])
  taxFree: number[];
  @Field()
  netSalary: number;
  @Field()
  taxes: number;
  @Field()
  totalSpent: number;
}
