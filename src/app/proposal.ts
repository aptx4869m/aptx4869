export class Proposal {
  requester: string; // UID of requester, can be owner, modifier, user
  // item key, count
  ownerApproval: boolean;
  userApproval: boolean;
  items: Map<string, number>;
  timestamp: number;

  additionalCNY: number;
  additionalJPY: number;

  totalWeight: number; // in g
  shippingFee: number; // in CNY
}
/** 
requester, items, count, userApproval, time1
requester, items, count, userApproval, ownerApproval, time2
any change by user -> lose owner approval
any change by owner -> lose user approval
any change by other -> lose both approval
*/
