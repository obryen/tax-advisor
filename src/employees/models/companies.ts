import { Field, ObjectType } from '@nestjs/graphql';
import { Employees } from './employees';

@ObjectType()
export class CompaniesModel {
  constructor(intialData: Partial<CompaniesModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }

  @Field()
  id: number;
  @Field()
  title: string;

  @Field(() => Employees, { nullable: true })
  employees: Employees[];

}