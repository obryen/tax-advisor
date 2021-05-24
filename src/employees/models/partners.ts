import { ObjectType, Field } from '@nestjs/graphql';
import { Vouchers } from './vouchers';

@ObjectType()
export class Patners {
  constructor(intialData: Partial<Patners> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: false })
  id: number;
  @Field()
  name: string;

  @Field(() => Vouchers, { nullable: true })
  vouchers: Vouchers[];
}
