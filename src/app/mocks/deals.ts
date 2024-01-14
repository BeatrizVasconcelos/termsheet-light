import { DealEnum } from "../shared/enums/deal.enum";
import { Deal } from "../shared/interfaces/deal.interface";

export const deals: Deal[] = [
    {
      id: '1',
      name: 'Deal 1',
      type: DealEnum.ACQUISITION,
      purchasePrice: 1000000,
      address: '123 Main St',
      noi: 80000,
      capRate: 8
    },
    {
      id: '2',
      name: 'Deal 2',
      type: DealEnum.LEASE,
      purchasePrice: 500000,
      address: '456 Elm St',
      noi: 40000,
      capRate: 8,
    },
  ];