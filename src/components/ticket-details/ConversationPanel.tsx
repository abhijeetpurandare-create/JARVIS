import { Conversation } from '../../data/ticketDetailsData';

const MessageBubble = ({ message }: { message: Conversation }) => {
  const isCustomer = message.type === 'customer';
  const isPrivateNote = message.type === 'private_note';

  // Bubble styles based on type
  const bubbleStyles = isCustomer
    ? 'bg-tds-surface-bg-blue-weakest border border-tds-border-info-primary/30'
    : isPrivateNote
    ? 'bg-tds-surface-bg-warning-weakest border border-tds-border-warning-primary/40'
    : 'bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary';

  // Alignment
  const alignStyles = isCustomer ? 'ml-tds-16 mr-tds-32' : 'ml-auto mr-tds-16 ml-tds-32';

  return (
    <div className={`max-w-[calc(100%-32px)] ${alignStyles} my-tds-8`}>
      <div className={`rounded-tds-lg p-tds-12 ${bubbleStyles}`}>
        {/* Header */}
        <div className="flex items-center gap-tds-8 mb-tds-4">
          <span className="text-[12px] font-semibold text-tds-text-body-primary">{message.sender}</span>
          <span className="text-[11px] text-tds-text-caption-secondary">{message.timestamp}</span>
          {isPrivateNote && (
            <span className="text-[10px] font-medium text-tds-text-warning-primary bg-tds-surface-bg-warning-weakest px-tds-6 py-[1px] rounded-tds-full border border-tds-border-warning-primary/50 ml-auto">
              Private Note
            </span>
          )}
        </div>
        <p className="text-[11px] text-tds-text-caption-secondary mb-tds-4">{message.role}</p>

        {/* Notified To */}
        {message.notifiedTo && (
          <div className="mb-tds-6">
            <p className="text-[11px] text-tds-text-caption-secondary">
              Notified To: {message.notifiedTo.join(', ')}
            </p>
            <div className="h-px bg-tds-border-neutral-primary/50 my-tds-4" />
          </div>
        )}

        {/* Body */}
        <p className="text-[12px] text-tds-text-body-primary leading-[18px] whitespace-pre-line">
          {message.content}
        </p>
      </div>
    </div>
  );
};

const ConversationPanel = ({ conversations }: { conversations: Conversation[] }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto py-tds-12 flex flex-col">
        {conversations.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Reply action bar */}
      <div className="border-t border-tds-border-neutral-primary px-tds-16 py-tds-12 flex items-center gap-tds-8">
        <button className="flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border border-tds-border-neutral-primary text-[12px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8L8 4V6.5C14 6.5 14 12 14 12C14 12 12 8.5 8 8.5V11L2 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
          Reply
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

        {/* Toggle */}
        <div className="ml-auto flex items-center gap-tds-6">
          <div className="w-[34px] h-[18px] rounded-full bg-tds-border-neutral-primary relative cursor-pointer">
            <div className="absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-tds-surface-bg-primary-default shadow-sm" />
          </div>
          <span className="text-[11px] text-tds-text-caption-secondary">Show All</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
