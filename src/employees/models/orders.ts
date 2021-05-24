import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Orders {
  constructor(intialData: Partial<Orders> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: true })
  id: number;
  @Field()
  employeeId: number;
  @Field()
  voucherId: number;
  @Field()
  date: Date;

  amount?: number;
}
