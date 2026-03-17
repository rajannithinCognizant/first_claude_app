// DEMO ONLY — provides stub data for the order list feature.
// Replace with real HTTP calls when connecting to a live API.

import { Injectable, signal } from '@angular/core';
import type { InventoryItem, Order, OrderDetail, OwnerOption } from './order.model';

const MOCK_ORDERS: Order[] = [
  { id: 1,  orderName: 'streaming-tst1',           advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Atlanta',  campaignStart: '03/12/2026', campaignEnd: '03/29/2026', budget: 119.00,   status: 'ActiveSchedule' },
  { id: 2,  orderName: 'All-test',                  advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Atlanta',  campaignStart: '02/27/2026', campaignEnd: '05/22/2026', budget: 1000.00,  status: 'Expired' },
  { id: 3,  orderName: 'linear-test-parallel-exec', advertiser: 'Test adv new 11/19', agency: '',                market: 'Boston',   campaignStart: '02/04/2026', campaignEnd: '03/31/2026', budget: 122.75,   status: 'Expired' },
  { id: 4,  orderName: 'LiveSports-Nithintest45',   advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Atlanta',  campaignStart: '02/02/2026', campaignEnd: '04/16/2026', budget: 379.00,   status: 'Expired' },
  { id: 5,  orderName: 'LiveSports-Nithin3',        advertiser: '9Nov_livesports',   agency: '',                 market: 'Atlanta',  campaignStart: '01/29/2026', campaignEnd: '02/28/2026', budget: 31.00,    status: 'SuccessToAOS' },
  { id: 6,  orderName: 'L+F+D 29/01',               advertiser: '9Nov_livesports',   agency: '',                 market: 'Atlanta',  campaignStart: '01/29/2026', campaignEnd: '02/23/2026', budget: 814.00,   status: 'Submitted' },
  { id: 7,  orderName: 'LiveSports-Nithin29/01',    advertiser: '9Nov_livesports',   agency: '',                 market: 'Atlanta',  campaignStart: '01/29/2026', campaignEnd: '02/28/2026', budget: 23.00,    status: 'SuccessToAOS' },
  { id: 8,  orderName: 'L+F+D 29/01',               advertiser: '9Nov_livesports',   agency: '',                 market: 'Atlanta',  campaignStart: '01/29/2026', campaignEnd: '02/23/2026', budget: 814.00,   status: 'Submitted' },
  { id: 9,  orderName: 'LinearOrder-Test01',        advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Chicago',  campaignStart: '01/15/2026', campaignEnd: '02/15/2026', budget: 2500.00,  status: 'Expired' },
  { id: 10, orderName: 'Digital-Campaign-Q1',       advertiser: 'TestAdvertiser Inc', agency: 'MediaBuy Co.',    market: 'New York', campaignStart: '01/01/2026', campaignEnd: '03/31/2026', budget: 5000.00,  status: 'ActiveSchedule' },
  { id: 11, orderName: 'SportsPackage-Jan',         advertiser: '9Nov_livesports',   agency: '',                 market: 'Miami',    campaignStart: '01/05/2026', campaignEnd: '01/31/2026', budget: 450.00,   status: 'Expired' },
  { id: 12, orderName: 'BrandAwareness-Feb',        advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Dallas',   campaignStart: '02/01/2026', campaignEnd: '02/28/2026', budget: 1250.00,  status: 'SuccessToAOS' },
  { id: 13, orderName: 'RetailDrive-March',         advertiser: 'RetailChain Corp',  agency: 'AdAgency Plus',    market: 'Seattle',  campaignStart: '03/01/2026', campaignEnd: '03/31/2026', budget: 880.00,   status: 'Submitted' },
  { id: 14, orderName: 'AutoSale-Spring',           advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Atlanta',  campaignStart: '03/15/2026', campaignEnd: '04/30/2026', budget: 3200.00,  status: 'ActiveSchedule' },
  { id: 15, orderName: 'LocalNews-Package',         advertiser: 'LocalMedia Group',  agency: '',                 market: 'Boston',   campaignStart: '02/10/2026', campaignEnd: '03/10/2026', budget: 640.00,   status: 'Expired' },
  { id: 16, orderName: 'PrimeTime-Q2',              advertiser: '9Nov_livesports',   agency: 'MediaBuy Co.',     market: 'Chicago',  campaignStart: '04/01/2026', campaignEnd: '06/30/2026', budget: 7500.00,  status: 'Submitted' },
  { id: 17, orderName: 'MorningShow-Ad',            advertiser: 'TestAdvertiser Inc', agency: '',                market: 'New York', campaignStart: '01/20/2026', campaignEnd: '02/20/2026', budget: 920.00,   status: 'SuccessToAOS' },
  { id: 18, orderName: 'WeekendSpots-Feb',          advertiser: 'RetailChain Corp',  agency: 'AdAgency Plus',    market: 'Miami',    campaignStart: '02/14/2026', campaignEnd: '02/28/2026', budget: 310.00,   status: 'Expired' },
  { id: 19, orderName: 'StreamingBundle-01',        advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Dallas',   campaignStart: '03/01/2026', campaignEnd: '04/15/2026', budget: 1800.00,  status: 'ActiveSchedule' },
  { id: 20, orderName: 'DigitalDisplay-Q1',         advertiser: 'LocalMedia Group',  agency: '',                 market: 'Seattle',  campaignStart: '01/10/2026', campaignEnd: '03/10/2026', budget: 2100.00,  status: 'SuccessToAOS' },
  { id: 21, orderName: 'SportsLive-Weekend',        advertiser: '9Nov_livesports',   agency: 'MediaBuy Co.',     market: 'Atlanta',  campaignStart: '02/07/2026', campaignEnd: '02/22/2026', budget: 560.00,   status: 'Expired' },
  { id: 22, orderName: 'AutoShow-Campaign',         advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Chicago',  campaignStart: '03/05/2026', campaignEnd: '03/20/2026', budget: 990.00,   status: 'Submitted' },
  { id: 23, orderName: 'NightNews-Spots',           advertiser: 'TestAdvertiser Inc', agency: 'AdAgency Plus',   market: 'Boston',   campaignStart: '01/25/2026', campaignEnd: '02/25/2026', budget: 740.00,   status: 'Expired' },
  { id: 24, orderName: 'HolidaySale-Spring',        advertiser: 'RetailChain Corp',  agency: '',                 market: 'New York', campaignStart: '03/20/2026', campaignEnd: '04/05/2026', budget: 4200.00,  status: 'ActiveSchedule' },
  { id: 25, orderName: 'LocalEvents-Mar',           advertiser: 'LocalMedia Group',  agency: 'MediaBuy Co.',     market: 'Miami',    campaignStart: '03/08/2026', campaignEnd: '03/22/2026', budget: 285.00,   status: 'SuccessToAOS' },
  { id: 26, orderName: 'CableBundle-Q2',            advertiser: '9Nov_livesports',   agency: '',                 market: 'Dallas',   campaignStart: '04/01/2026', campaignEnd: '06/30/2026', budget: 6800.00,  status: 'Submitted' },
  { id: 27, orderName: 'Streaming-Premium01',       advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Seattle',  campaignStart: '02/15/2026', campaignEnd: '03/15/2026', budget: 1650.00,  status: 'Expired' },
  { id: 28, orderName: 'RetailSpots-Weekly',        advertiser: 'RetailChain Corp',  agency: 'AdAgency Plus',    market: 'Atlanta',  campaignStart: '01/05/2026', campaignEnd: '01/25/2026', budget: 430.00,   status: 'SuccessToAOS' },
  { id: 29, orderName: 'MorningDrive-Feb',          advertiser: 'TestAdvertiser Inc', agency: '',                market: 'Chicago',  campaignStart: '02/02/2026', campaignEnd: '02/27/2026', budget: 870.00,   status: 'Expired' },
  { id: 30, orderName: 'EventSponsor-March',        advertiser: 'LocalMedia Group',  agency: 'MediaBuy Co.',     market: 'Boston',   campaignStart: '03/10/2026', campaignEnd: '03/25/2026', budget: 3400.00,  status: 'ActiveSchedule' },
  { id: 31, orderName: 'DigitalFirst-Q1',           advertiser: '9Nov_livesports',   agency: '',                 market: 'New York', campaignStart: '01/15/2026', campaignEnd: '03/31/2026', budget: 9200.00,  status: 'SuccessToAOS' },
  { id: 32, orderName: 'AutoFinance-Campaign',      advertiser: 'VATLAND CDJR F...', agency: 'FCA MARKETCEN...', market: 'Miami',    campaignStart: '03/01/2026', campaignEnd: '03/31/2026', budget: 2750.00,  status: 'Submitted' },
];

const tv = (budget: number, cpm: number, impressions: number, status: string): InventoryItem =>
  ({ type: 'TV', category: 'Local', id: '-', budget, cpm, impressions, status });

const MOCK_ORDER_DETAILS: Record<number, OrderDetail> = {
  1:  { orderId: '313685', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '03/12/2026', lastUpdated: '03/12/2026', impressions: 720,   cpm: 165.28, inventory: [tv(119.00,   165.28, 720,   'ActiveSchedule')] },
  2:  { orderId: '313586', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '02/27/2026', lastUpdated: '03/03/2026', impressions: 6835,  cpm: 146.31, inventory: [tv(1000.00,  146.31, 6835,  'ExpiredSchedule')] },
  3:  { orderId: '313469', accountExecutive: 'Disha Sil',   createdBy: 'Nithin Rajan', createdOn: '02/04/2026', lastUpdated: '02/07/2026', impressions: 1506,  cpm: 81.51,  inventory: [tv(122.75,   81.51,  1506,  'ExpiredSchedule')] },
  4:  { orderId: '313412', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '02/02/2026', lastUpdated: '02/10/2026', impressions: 3140,  cpm: 120.70, inventory: [tv(379.00,   120.70, 3140,  'ExpiredSchedule')] },
  5:  { orderId: '313388', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/29/2026', lastUpdated: '02/28/2026', impressions: 420,   cpm: 73.81,  inventory: [tv(31.00,    73.81,  420,   'SuccessToAOS')] },
  6:  { orderId: '313375', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/29/2026', lastUpdated: '02/02/2026', impressions: 8540,  cpm: 95.31,  inventory: [tv(814.00,   95.31,  8540,  'Submitted')] },
  7:  { orderId: '313371', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/29/2026', lastUpdated: '02/28/2026', impressions: 310,   cpm: 74.19,  inventory: [tv(23.00,    74.19,  310,   'SuccessToAOS')] },
  8:  { orderId: '313370', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/29/2026', lastUpdated: '02/02/2026', impressions: 8540,  cpm: 95.31,  inventory: [tv(814.00,   95.31,  8540,  'Submitted')] },
  9:  { orderId: '313245', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '01/15/2026', lastUpdated: '02/01/2026', impressions: 17500, cpm: 142.86, inventory: [tv(2500.00,  142.86, 17500, 'ExpiredSchedule')] },
  10: { orderId: '313100', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '01/01/2026', lastUpdated: '03/15/2026', impressions: 42000, cpm: 119.05, inventory: [{ type: 'Digital', category: 'Display', id: '-', budget: 5000.00, cpm: 119.05, impressions: 42000, status: 'ActiveSchedule' }] },
  11: { orderId: '313098', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/05/2026', lastUpdated: '01/25/2026', impressions: 3800,  cpm: 118.42, inventory: [tv(450.00,   118.42, 3800,  'ExpiredSchedule')] },
  12: { orderId: '313056', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '02/01/2026', lastUpdated: '02/28/2026', impressions: 9800,  cpm: 127.55, inventory: [tv(1250.00,  127.55, 9800,  'SuccessToAOS')] },
  13: { orderId: '313034', accountExecutive: 'Sarah Jones', createdBy: 'Nithin Rajan', createdOn: '03/01/2026', lastUpdated: '03/10/2026', impressions: 7200,  cpm: 122.22, inventory: [tv(880.00,   122.22, 7200,  'Submitted')] },
  14: { orderId: '313022', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '03/15/2026', lastUpdated: '03/15/2026', impressions: 24600, cpm: 130.08, inventory: [tv(3200.00,  130.08, 24600, 'ActiveSchedule')] },
  15: { orderId: '313010', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '02/10/2026', lastUpdated: '03/05/2026', impressions: 5200,  cpm: 123.08, inventory: [tv(640.00,   123.08, 5200,  'ExpiredSchedule')] },
  16: { orderId: '312988', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '04/01/2026', lastUpdated: '04/01/2026', impressions: 58000, cpm: 129.31, inventory: [{ type: 'TV', category: 'Prime',   id: '-', budget: 7500.00, cpm: 129.31, impressions: 58000, status: 'Submitted' }] },
  17: { orderId: '312955', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '01/20/2026', lastUpdated: '02/15/2026', impressions: 7500,  cpm: 122.67, inventory: [tv(920.00,   122.67, 7500,  'SuccessToAOS')] },
  18: { orderId: '312940', accountExecutive: 'Sarah Jones', createdBy: 'Nithin Rajan', createdOn: '02/14/2026', lastUpdated: '02/28/2026', impressions: 2600,  cpm: 119.23, inventory: [tv(310.00,   119.23, 2600,  'ExpiredSchedule')] },
  19: { orderId: '312918', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '03/01/2026', lastUpdated: '03/12/2026', impressions: 13800, cpm: 130.43, inventory: [{ type: 'Streaming', category: 'OTT',     id: '-', budget: 1800.00, cpm: 130.43, impressions: 13800, status: 'ActiveSchedule' }] },
  20: { orderId: '312900', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '01/10/2026', lastUpdated: '03/08/2026', impressions: 16500, cpm: 127.27, inventory: [{ type: 'Digital', category: 'Display', id: '-', budget: 2100.00, cpm: 127.27, impressions: 16500, status: 'SuccessToAOS' }] },
  21: { orderId: '312877', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '02/07/2026', lastUpdated: '02/22/2026', impressions: 4500,  cpm: 124.44, inventory: [tv(560.00,   124.44, 4500,  'ExpiredSchedule')] },
  22: { orderId: '312855', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '03/05/2026', lastUpdated: '03/18/2026', impressions: 7800,  cpm: 126.92, inventory: [tv(990.00,   126.92, 7800,  'Submitted')] },
  23: { orderId: '312833', accountExecutive: 'Sarah Jones', createdBy: 'Nithin Rajan', createdOn: '01/25/2026', lastUpdated: '02/20/2026', impressions: 6000,  cpm: 123.33, inventory: [tv(740.00,   123.33, 6000,  'ExpiredSchedule')] },
  24: { orderId: '312810', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '03/20/2026', lastUpdated: '03/20/2026', impressions: 33000, cpm: 127.27, inventory: [tv(4200.00,  127.27, 33000, 'ActiveSchedule')] },
  25: { orderId: '312790', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '03/08/2026', lastUpdated: '03/22/2026', impressions: 2300,  cpm: 123.91, inventory: [tv(285.00,   123.91, 2300,  'SuccessToAOS')] },
  26: { orderId: '312766', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '04/01/2026', lastUpdated: '04/01/2026', impressions: 52000, cpm: 130.77, inventory: [{ type: 'TV', category: 'Cable',   id: '-', budget: 6800.00, cpm: 130.77, impressions: 52000, status: 'Submitted' }] },
  27: { orderId: '312744', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '02/15/2026', lastUpdated: '03/10/2026', impressions: 12800, cpm: 128.91, inventory: [{ type: 'Streaming', category: 'OTT',     id: '-', budget: 1650.00, cpm: 128.91, impressions: 12800, status: 'ExpiredSchedule' }] },
  28: { orderId: '312720', accountExecutive: 'Sarah Jones', createdBy: 'Nithin Rajan', createdOn: '01/05/2026', lastUpdated: '01/22/2026', impressions: 3500,  cpm: 122.86, inventory: [tv(430.00,   122.86, 3500,  'SuccessToAOS')] },
  29: { orderId: '312698', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '02/02/2026', lastUpdated: '02/24/2026', impressions: 7000,  cpm: 124.29, inventory: [tv(870.00,   124.29, 7000,  'ExpiredSchedule')] },
  30: { orderId: '312675', accountExecutive: 'David Lee',   createdBy: 'Nithin Rajan', createdOn: '03/10/2026', lastUpdated: '03/25/2026', impressions: 26500, cpm: 128.30, inventory: [tv(3400.00,  128.30, 26500, 'ActiveSchedule')] },
  31: { orderId: '312650', accountExecutive: 'Priya Sharma', createdBy: 'Nithin Rajan', createdOn: '01/15/2026', lastUpdated: '03/28/2026', impressions: 72000, cpm: 127.78, inventory: [{ type: 'Digital', category: 'Display', id: '-', budget: 9200.00, cpm: 127.78, impressions: 72000, status: 'SuccessToAOS' }] },
  32: { orderId: '312628', accountExecutive: 'Mike Anthony', createdBy: 'Nithin Rajan', createdOn: '03/01/2026', lastUpdated: '03/30/2026', impressions: 21400, cpm: 128.50, inventory: [tv(2750.00,  128.50, 21400, 'Submitted')] },
};

export const OWNER_OPTIONS: OwnerOption[] = [
  { label: 'Owner/Creator', value: 'owner' },
  { label: 'Advertiser',    value: 'advertiser' },
  { label: 'Agency',        value: 'agency' },
];

@Injectable({ providedIn: 'root' })
export class MockDataService {
  /** All orders as a read-only signal. */
  readonly orders = signal<Order[]>(MOCK_ORDERS);

  /** Returns the detail record for a given order id, or undefined if not found. */
  getOrderDetail(orderId: number): OrderDetail | undefined {
    return MOCK_ORDER_DETAILS[orderId];
  }
}
