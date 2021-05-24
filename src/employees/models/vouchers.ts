import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Vouchers {
  constructor(intialData: Partial<Vouchers> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: true })
  id: string;
  @Field()
  amount: string;
  @Field()
  patnerId: string;
}
