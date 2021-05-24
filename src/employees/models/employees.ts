import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Employees {
  constructor(intialData: Partial<Employees> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  budget: number;
  @Field({ nullable: true })
  budgetRemaining?: number;
}
