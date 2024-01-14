export interface Deal {
    id: string;
    name: string;
    type: string;
    purchasePrice: number;
    address: string;
    noi: number;
    capRate?: number;
  }