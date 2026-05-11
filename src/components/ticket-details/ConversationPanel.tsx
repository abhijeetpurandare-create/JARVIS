interface Message {
  id: string;
  sender: string;
  role: string;
  timestamp: string;
  content: string;
  type: 'customer' | 'agent' | 'private_note' | 'email';
  notifiedTo?: string[];
}

const mockConversations: Message[] = [
  {
    id: '1',
    sender: 'Ramesh Kumar',
    role: 'ramesh.kumar | Consignee',
    timestamp: 'Aug 25, 12:08 PM',
    content: 'THE ORDER IS DELAYED. THE CUSTOMER IS AVAILABLE. PLEASE DELIVER IT AS SOON AS POSSIBLE Order ID: 7300610253142',
    type: 'customer',
  },
  {
    id: '2',
    sender: 'Melika Govekar',
    role: 'melika.govekar | Executive | Service Center Operations',
    timestamp: 'Sept 04, 12:08 PM',
    content: 'Dear Sir/Ma\'am,\n\nWe apologise for the inconvenience caused, and we have forwarded this issue to the concerned team. We request you to allow us some more time to work on the same.\n\nRegards,\nDelhivery Customer Support Team',
    type: 'agent',
  },
  {
    id: '3',
    sender: 'Melika Govekar',
    role: 'melika.govekar | Executive | Service Center Operations',
    timestamp: 'Sept 04, 12:08 PM',
    content: 'Hi @Bangalore_Hoskote_GW team & @Security team AWB 73006012351322\n\nThis shipment has been found short at Bengaluru, Arahara DC (Karnataka) facility. Kindly investigate this case and share the solution to correct the shipment ID',
    type: 'private_note',
  },
  {
    id: '4',
    sender: 'Melika Govekar',
    role: 'melika.govekar | Executive | Service Center Operations',
    timestamp: 'Sept 04, 12:08 PM',
    content: 'Dear Sir/Ma\'am,\n\nWe apologise for the inconvenience caused, and we have forwarded this issue to the concerned team. We request you to allow us some more time to work on the same.\n\nRegards,\nDelhivery Customer Support Team',
    type: 'agent',
  },
  {
    id: '5',
    sender: 'Melika Govekar',
    role: 'melika.govekar@delhivery.com | Executive | Service Center Operations',
    timestamp: 'Sept 04, 12:08 PM',
    content: 'Dear Sir/Ma\'am,\n\nWe apologise for the inconvenience caused, and we have forwarded this issue to the concerned team. We request you to allow us some more time to work on the same.\n\nRegards,\nDelhivery Customer Support Team',
    type: 'email',
  },
  {
    id: '6',
    sender: 'Melika Govekar',
    role: 'melika.govekar | Executive | Service Center Operations',
    timestamp: 'Sept 09, 12:08 PM',
    content: 'The shipment is marked as lost. Please proceed with the claim.',
    type: 'private_note',
    notifiedTo: ['ramesh.kb@delhivery.com', 'ishani.singh@delhivery.com', 'rajesh.c@delhivery.com'],
  },
  {
    id: '7',
    sender: 'Ramesh Kumar',
    role: 'ramesh.kumar | Consignee',
    timestamp: 'Sept 25, 12:08 PM',
    content: 'PLEASE DELIVER IT AS SOON AS POSSIBLE.',
    type: 'customer',
  },
];

const CustomerAvatar = () => (
  <div className="w-[32px] h-[32px] rounded-full bg-tds-surface-bg-blue-weakest flex items-center justify-center shrink-0">
    <span className="text-[11px] font-semibold text-tds-text-info-blue-primary">RK</span>
  </div>
);

const AgentAvatar = () => (
  <div className="w-[32px] h-[32px] rounded-full bg-tds-surface-bg-coal-weakest flex items-center justify-center shrink-0">
    <span className="text-[11px] font-semibold text-tds-text-caption-primary">MG</span>
  </div>
);

const MessageBubble = ({ message }: { message: Message }) => {
  const isPrivateNote = message.type === 'private_note';

  return (
    <div className={`px-tds-24 py-tds-12 ${isPrivateNote ? 'bg-tds-surface-bg-warning-weakest' : ''}`}>
      <div className="flex gap-tds-16">
        {/* Avatar */}
        {message.type === 'customer' ? <CustomerAvatar /> : <AgentAvatar />}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-tds-2">
            <div>
              <div className="flex items-center gap-tds-8">
                <span className="text-[12px] font-semibold text-tds-text-body-primary">{message.sender}</span>
                <span className="text-[12px] text-tds-text-caption-secondary">{message.timestamp}</span>
              </div>
              <p className="text-[12px] text-tds-text-caption-secondary">{message.role}</p>
            </div>
            {isPrivateNote && (
              <span className="text-[12px] font-medium text-tds-text-warning-primary bg-tds-surface-bg-warning-weakest px-tds-8 py-[2px] rounded-tds-default border border-tds-border-warning-primary">
                Private Note
              </span>
            )}
          </div>

          {/* Notified To */}
          {message.notifiedTo && (
            <div className="mb-tds-4">
              <p className="text-[12px] text-tds-text-caption-secondary">
                Notified To: {message.notifiedTo.join(', ')} {message.notifiedTo.length > 3 && `+${message.notifiedTo.length - 3} more`}
              </p>
              <div className="h-px bg-tds-border-neutral-primary my-tds-4" />
            </div>
          )}

          {/* Body */}
          <p className="text-[13px] text-tds-text-body-primary leading-[20px] whitespace-pre-line">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const ConversationPanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto">
        {mockConversations.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Reply action bar */}
      <div className="border-t border-tds-border-neutral-primary px-tds-24 py-tds-16 flex items-center gap-tds-12">
        <div className="flex items-center gap-tds-8">
          <button className="flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border border-tds-border-neutral-primary text-[12px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8L8 4V6.5C14 6.5 14 12 14 12C14 12 12 8.5 8 8.5V11L2 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            Reply
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border border-tds-border-neutral-primary text-[12px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
            Note
          </button>
          <button className="flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border border-tds-border-neutral-primary text-[12px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
            Forward
          </button>
          <button className="flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border border-tds-border-neutral-primary text-[12px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
            Canned Response
          </button>
        </div>

        {/* Toggle — Show All */}
        <div className="ml-auto flex items-center gap-tds-6">
          <div className="w-[38px] h-[20px] rounded-full bg-tds-border-neutral-primary relative cursor-pointer">
            <div className="absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-tds-surface-bg-primary-default shadow-sm" />
          </div>
          <span className="text-[12px] text-tds-text-caption-secondary">Show All</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
