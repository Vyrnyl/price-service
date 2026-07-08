export interface PriceRecord {
  id: string;
  storeId: string;
  commodityId: string;
  date: string;
  time: string;
  store: string;
  location: string;
  commodity: string;
  commodityDetails: string;
  price: string;
  status: string;
  srp?: string;
  officerInitials: string;
  officerName: string;
}

export interface StoreOption {
  id: string;
  name: string;
  location: string;
}

export interface CommodityOption {
  id: string;
  name: string;
}

export type PriceStatusValue = "COMPLIANT" | "OVERPRICE" | "UNDERPRICE";

export interface CreatePriceRecordPayload {
  commodityId: string;
  storeId: string;
  price: number;
  dateAndTime: string;
  status: PriceStatusValue;
}
