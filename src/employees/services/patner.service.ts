import MOCK_ORDERS from '@data/orders';
import MOCK_PARTNERS from '@data/partners';
import MOCK_VOUCHERS from '@data/vouchers';
import { Inject, Injectable } from '@nestjs/common';
import { Orders } from '../models/orders';
import { PatnerRevenueModel } from '../models/partners-revenue';
import { EmployeeService } from './employee.service';

@Injectable()
export class PatnerService {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * List the revenue per partner.
   */

  // iterate through all patners and group oders based on this

  public revenuePerPatner() {
    const patnerRevenue: PatnerRevenueModel[] = [];
    MOCK_PARTNERS.forEach((p) => {
      const voucherSpendItems: number[] = [];
      MOCK_ORDERS.forEach((o) => {
        const voucherForOrder = MOCK_VOUCHERS.find(
          (v) => v.id === o.voucherId && v.partnerId === p.id,
        );
        if (voucherForOrder) {
          voucherSpendItems.push(voucherForOrder.amount);
        }
      });

      const revenue =
        this.employeeService.calculateToTalInArray(voucherSpendItems);

      patnerRevenue.push({
        patnerName: p.name,
        revenue,
      });
    });

    return patnerRevenue;
  }
}
