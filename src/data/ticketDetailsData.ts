export interface TicketDetail {
  ticketId: string;
  subject: string;
  createdOn: string;
  raisedBy: string;
  client: string;
  source: string;
  awb: string;
  lrn: string;
  status: string;
  agent: string;
  team: string;
  category: string;
  subCategory: string;
  priority: string;
  closureDue: string;
  customerName: string;
  customerAddress: string;
  customerHistory: string;
  product: string;
  productClient: string;
  productType: string;
  shipmentStatus: string;
  centerLocation: string;
  centerMetrics: string;
  conversations: Conversation[];
}

export interface Conversation {
  id: string;
  sender: string;
  role: string;
  timestamp: string;
  content: string;
  type: 'customer' | 'agent' | 'private_note' | 'email';
  notifiedTo?: string[];
}

const ticketDetailsMap: Record<string, TicketDetail> = {
  'J17769268800001': {
    ticketId: 'J17769268800001',
    subject: 'Reattempt or delay in delivery / consignee requests a new delivery attempt due to missed or delayed attempt',
    createdOn: '25th Aug 2025',
    raisedBy: 'KAM (Client)',
    client: 'Tata Steel',
    source: 'UCP',
    awb: '62374848243499',
    lrn: '290571585',
    status: 'Open',
    agent: 'Melika Govekar',
    team: 'Service Center Operations',
    category: 'Delivery Issue',
    subCategory: 'Delivery Delayed',
    priority: 'High',
    closureDue: '21 Apr 2026, 12:00 PM',
    customerName: 'Ramesh Kumar',
    customerAddress: 'Delhi, Haryana 110061',
    customerHistory: '3/10 successful deliveries',
    product: 'CON 3(1)',
    productClient: '6023ec-RAINADIHATTI-do',
    productType: 'COD B2C',
    shipmentStatus: 'Shipment was Delivered from Gurgaon_Sector18_D (Haryana) on April 17, 2026 4:41 PM. Verification: Geo-verified.',
    centerLocation: 'Gurgaon_Sector18_D (Haryana)',
    centerMetrics: 'AVTD: 1786, 57.9% Service Level, 110 shipments aging >24 hours.',
    conversations: [
      { id: '1', sender: 'Ramesh Kumar', role: 'ramesh.kumar | Consignee', timestamp: 'Aug 25, 12:08 PM', content: 'THE ORDER IS DELAYED. THE CUSTOMER IS AVAILABLE. PLEASE DELIVER IT AS SOON AS POSSIBLE Order ID: 7300610253142', type: 'customer' },
      { id: '2', sender: 'Melika Govekar', role: 'melika.govekar | Executive | Service Center Operations', timestamp: 'Sept 04, 12:08 PM', content: 'Dear Sir/Ma\'am,\n\nWe apologise for the inconvenience caused, and we have forwarded this issue to the concerned team. We request you to allow us some more time to work on the same.\n\nRegards,\nDelhivery Customer Support Team', type: 'agent' },
      { id: '3', sender: 'Melika Govekar', role: 'melika.govekar | Executive | Service Center Operations', timestamp: 'Sept 04, 12:08 PM', content: 'Hi @Bangalore_Hoskote_GW team & @Security team AWB 73006012351322\n\nThis shipment has been found short at Bengaluru, Arahara DC (Karnataka) facility. Kindly investigate this case and share the solution.', type: 'private_note' },
      { id: '4', sender: 'Ramesh Kumar', role: 'ramesh.kumar | Consignee', timestamp: 'Sept 25, 12:08 PM', content: 'PLEASE DELIVER IT AS SOON AS POSSIBLE.', type: 'customer' },
    ],
  },
  'J17769268800002': {
    ticketId: 'J17769268800002',
    subject: 'Package not delivered - Customer complaint about missing delivery',
    createdOn: '14th Apr 2026',
    raisedBy: 'Customer',
    client: 'Flipkart',
    source: 'Mobile App',
    awb: '22828899290203',
    lrn: '310482756',
    status: 'Agent Handling',
    agent: 'Abhay Kumar',
    team: 'Last Mile Operations',
    category: 'Delivery Issue',
    subCategory: 'Package Lost',
    priority: 'Critical',
    closureDue: '21 Apr 2026, 12:00 PM',
    customerName: 'Conney Dcosta',
    customerAddress: 'Mumbai, Maharashtra 400001',
    customerHistory: '8/12 successful deliveries',
    product: 'Electronics - Mobile Phone',
    productClient: 'Flipkart-B2C',
    productType: 'Prepaid B2C',
    shipmentStatus: 'Shipment in transit at Mumbai_Andheri_DC (Maharashtra). Last scan: April 14, 2026 9:30 AM.',
    centerLocation: 'Mumbai_Andheri_DC (Maharashtra)',
    centerMetrics: 'AVTD: 2340, 62.1% Service Level, 85 shipments aging >24 hours.',
    conversations: [
      { id: '1', sender: 'Conney Dcosta', role: 'conney.dcosta | Customer', timestamp: 'Apr 14, 09:30 AM', content: 'My package was supposed to be delivered yesterday but I haven\'t received it. The tracking shows delivered but nothing was left at my door. Order ID: FK-8834921', type: 'customer' },
      { id: '2', sender: 'Abhay Kumar', role: 'abhay.kumar | Executive | Last Mile Operations', timestamp: 'Apr 14, 11:45 AM', content: 'Dear Customer,\n\nWe are sorry to hear about this. We have raised an investigation with the delivery center. Our team will verify the delivery proof and get back to you within 24 hours.\n\nRegards,\nDelhivery Support', type: 'agent' },
      { id: '3', sender: 'Abhay Kumar', role: 'abhay.kumar | Executive | Last Mile Operations', timestamp: 'Apr 14, 11:50 AM', content: '@Mumbai_Andheri_DC team - Please check delivery proof for AWB 22828899290203. Customer claims non-delivery. Verify GPS coordinates and POD image.', type: 'private_note', notifiedTo: ['dc.mumbai@delhivery.com', 'ops.lead@delhivery.com'] },
      { id: '4', sender: 'Conney Dcosta', role: 'conney.dcosta | Customer', timestamp: 'Apr 15, 08:00 AM', content: 'Any update on this? It\'s been more than 24 hours now.', type: 'customer' },
    ],
  },
  'J17769268800003': {
    ticketId: 'J17769268800003',
    subject: 'Wrong item delivered - Exchange request pending',
    createdOn: '13th Apr 2026',
    raisedBy: 'Customer',
    client: 'Amazon',
    source: 'Email',
    awb: '22828899290204',
    lrn: '310482757',
    status: 'Waiting On Customer',
    agent: 'Ravi Sharma',
    team: 'Returns & Exchange',
    category: 'Delivery Issue',
    subCategory: 'Wrong Item',
    priority: 'Medium',
    closureDue: '20 Apr 2026, 12:00 PM',
    customerName: 'Seeya Sitaram Mahale',
    customerAddress: 'Pune, Maharashtra 411001',
    customerHistory: '5/5 successful deliveries',
    product: 'Clothing - T-Shirt XL',
    productClient: 'Amazon-IN',
    productType: 'Prepaid B2C',
    shipmentStatus: 'Return pickup scheduled for April 16, 2026. Awaiting customer confirmation.',
    centerLocation: 'Pune_Hinjewadi_DC (Maharashtra)',
    centerMetrics: 'AVTD: 890, 71.3% Service Level, 42 shipments aging >24 hours.',
    conversations: [
      { id: '1', sender: 'Seeya Sitaram Mahale', role: 'seeya.mahale | Customer', timestamp: 'Apr 13, 03:20 PM', content: 'I ordered a blue T-shirt size XL but received a red one in size M. Please arrange for an exchange. Order: AMZ-99281034', type: 'customer' },
      { id: '2', sender: 'Ravi Sharma', role: 'ravi.sharma | Executive | Returns & Exchange', timestamp: 'Apr 13, 04:00 PM', content: 'Dear Customer,\n\nWe sincerely apologize for the mix-up. We have initiated a return pickup for the wrong item. Please keep the package ready. A replacement will be shipped once we receive the return.\n\nPickup scheduled: April 16, 2026\n\nRegards,\nDelhivery Support', type: 'agent' },
      { id: '3', sender: 'Seeya Sitaram Mahale', role: 'seeya.mahale | Customer', timestamp: 'Apr 16, 10:00 AM', content: 'The pickup person hasn\'t arrived yet. When will they come?', type: 'customer' },
    ],
  },
};

// Fallback for unknown ticket IDs
const defaultTicket: TicketDetail = ticketDetailsMap['J17769268800001'];

export function getTicketDetails(ticketId: string): TicketDetail {
  return ticketDetailsMap[ticketId] || { ...defaultTicket, ticketId };
}
