import { useState, useRef, useEffect } from 'react';
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

type ReplyMode = 'reply' | 'note' | 'forward' | null;

// Formatting toolbar icons
const BoldIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2.5H9.5C10.163 2.5 10.7989 2.76339 11.2678 3.23223C11.7366 3.70107 12 4.33696 12 5C12 5.66304 11.7366 6.29893 11.2678 6.76777C10.7989 7.23661 10.163 7.5 9.5 7.5H4V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 7.5H10.5C11.163 7.5 11.7989 7.76339 12.2678 8.23223C12.7366 8.70107 13 9.33696 13 10C13 10.663 12.7366 11.2989 12.2678 11.7678C11.7989 12.2366 11.163 12.5 10.5 12.5H4V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ItalicIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3H6.5M9.5 13H6M8.5 3L7.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const UnderlineIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2.5V7.5C4 8.56087 4.42143 9.57828 5.17157 10.3284C5.92172 11.0786 6.93913 11.5 8 11.5C9.06087 11.5 10.0783 11.0786 10.8284 10.3284C11.5786 9.57828 12 8.56087 12 7.5V2.5M3 13.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ListOlIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M7 4H14M7 8H14M7 12H14M3 4V2L2 2.5M2 6H4L2 4M2 12H4L3 10.5C3.5 10 4 10 4 10.5C4 11 3 12 2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ListUlIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M7 4H14M7 8H14M7 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3.5" cy="4" r="1" fill="currentColor"/><circle cx="3.5" cy="8" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/></svg>;
const LinkIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5C6.94774 9.94774 7.46516 10.3 8.02513 10.5388C8.5851 10.7776 9.18 10.8984 9.78 10.8984C10.38 10.8984 10.9749 10.7776 11.5349 10.5388C12.0948 10.3 12.6123 9.94774 13.06 9.5L14.56 8C15.4484 7.11157 15.9484 5.90565 15.9484 4.65C15.9484 3.39435 15.4484 2.18843 14.56 1.3C13.6716 0.411573 12.4656 -0.0884399 11.21 -0.0884399C9.95435 -0.0884399 8.74843 0.411573 7.86 1.3L7.36 1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 6.5C9.05226 6.05226 8.53484 5.7 7.97487 5.46118C7.4149 5.22236 6.82 5.10156 6.22 5.10156C5.62 5.10156 5.0251 5.22236 4.46513 5.46118C3.90516 5.7 3.38774 6.05226 2.94 6.5L1.44 8C0.551573 8.88843 0.0515747 10.0944 0.0515747 11.35C0.0515747 12.6056 0.551573 13.8116 1.44 14.7C2.32843 15.5884 3.53435 16.0884 4.79 16.0884C6.04565 16.0884 7.25157 15.5884 8.14 14.7L8.64 14.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ImageIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/><circle cx="5" cy="6" r="1.25" stroke="currentColor" strokeWidth="1"/><path d="M1.5 11L5 8L8 10.5L11 8L14.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const AttachIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 7.5L7.5 13.5C6.83696 14.163 5.93913 14.5 5 14.5C4.06087 14.5 3.16304 14.163 2.5 13.5C1.83696 12.837 1.5 11.9391 1.5 11C1.5 10.0609 1.83696 9.16304 2.5 8.5L8.5 2.5C8.94 2.06 9.53 1.81 10.15 1.81C10.77 1.81 11.36 2.06 11.8 2.5C12.24 2.94 12.49 3.53 12.49 4.15C12.49 4.77 12.24 5.36 11.8 5.8L5.79 11.8C5.57 12.02 5.28 12.14 4.97 12.14C4.66 12.14 4.37 12.02 4.15 11.8C3.93 11.58 3.81 11.29 3.81 10.98C3.81 10.67 3.93 10.38 4.15 10.16L9.65 4.66" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const ReplyTextbox = ({ mode, onClose, onSend }: { mode: ReplyMode; onClose: () => void; onSend: () => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [toValue, setToValue] = useState('');
  const [ccValue, setCcValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [showCc, setShowCc] = useState(false);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-grow textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const modeLabel = mode === 'reply' ? 'Reply' : mode === 'note' ? 'Note' : 'Forward';
  const modeBorderColor = mode === 'note'
    ? 'border-tds-border-warning-primary/50'
    : mode === 'forward'
    ? 'border-tds-border-neutral-primary'
    : 'border-tds-border-info-primary/40';
  const modeBgColor = mode === 'note'
    ? 'bg-tds-surface-bg-warning-weakest/30'
    : 'bg-tds-surface-bg-primary-default';

  return (
    <div className={`mx-tds-16 mb-tds-12 rounded-tds-lg border ${modeBorderColor} ${modeBgColor} overflow-hidden`}>
      {/* Header with mode label and close */}
      <div className="flex items-center justify-between px-tds-12 py-tds-8 border-b border-tds-border-neutral-primary/50">
        <span className="text-[12px] font-semibold text-tds-text-body-primary">{modeLabel}</span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-[20px] h-[20px] rounded-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest text-tds-text-caption-secondary"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* To / Cc fields (not for Note) */}
      {mode !== 'note' && (
        <div className="px-tds-12 pt-tds-8 flex flex-col gap-tds-4">
          <div className="flex items-center gap-tds-8">
            <span className="text-[11px] text-tds-text-caption-secondary w-[24px] shrink-0">To:</span>
            <input
              type="text"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              placeholder="Enter recipient email"
              className="flex-1 text-[12px] text-tds-text-body-primary bg-transparent outline-none placeholder:text-tds-text-caption-secondary/60 border-b border-tds-border-neutral-primary/30 pb-tds-4"
            />
            {!showCc && (
              <button
                onClick={() => setShowCc(true)}
                className="text-[11px] text-tds-text-info-primary cursor-pointer hover:underline shrink-0"
              >
                Cc
              </button>
            )}
          </div>
          {showCc && (
            <div className="flex items-center gap-tds-8">
              <span className="text-[11px] text-tds-text-caption-secondary w-[24px] shrink-0">Cc:</span>
              <input
                type="text"
                value={ccValue}
                onChange={(e) => setCcValue(e.target.value)}
                placeholder="Add Cc recipients"
                className="flex-1 text-[12px] text-tds-text-body-primary bg-transparent outline-none placeholder:text-tds-text-caption-secondary/60 border-b border-tds-border-neutral-primary/30 pb-tds-4"
              />
            </div>
          )}
        </div>
      )}

      {/* Rich text area */}
      <div className="px-tds-12 py-tds-8">
        <textarea
          ref={textareaRef}
          value={bodyValue}
          onChange={handleTextareaChange}
          placeholder={mode === 'note' ? 'Add a private note...' : 'Type your reply...'}
          className="w-full text-[12px] text-tds-text-body-primary bg-transparent outline-none resize-none leading-[18px] placeholder:text-tds-text-caption-secondary/60 min-h-[60px]"
          rows={3}
        />
      </div>

      {/* Formatting toolbar + Send */}
      <div className="flex items-center justify-between px-tds-12 py-tds-8 border-t border-tds-border-neutral-primary/50">
        {/* Formatting icons */}
        <div className="flex items-center gap-tds-4">
          {[BoldIcon, ItalicIcon, UnderlineIcon, ListOlIcon, ListUlIcon, LinkIcon, ImageIcon, AttachIcon].map((Icon, idx) => (
            <button
              key={idx}
              className="flex items-center justify-center w-[26px] h-[26px] rounded-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest text-tds-text-caption-secondary hover:text-tds-text-body-primary transition-colors"
            >
              <Icon />
            </button>
          ))}
        </div>

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={!bodyValue.trim()}
          className="flex items-center gap-tds-4 px-tds-12 py-tds-6 rounded-tds-default text-[12px] font-medium bg-tds-surface-bg-primary-inverse-default text-tds-text-heading-inverse-only-white cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Send
        </button>
      </div>
    </div>
  );
};

const ConversationPanel = ({ conversations }: { conversations: Conversation[] }) => {
  const [replyMode, setReplyMode] = useState<ReplyMode>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when reply box opens
  useEffect(() => {
    if (replyMode && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [replyMode]);

  const handleActionClick = (mode: ReplyMode) => {
    setReplyMode(mode);
  };

  const handleClose = () => {
    setReplyMode(null);
  };

  const handleSend = () => {
    // In a real app, this would send the message
    setReplyMode(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto py-tds-12 flex flex-col">
        {conversations.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Reply textbox — appears inline after messages */}
        {replyMode && (
          <ReplyTextbox mode={replyMode} onClose={handleClose} onSend={handleSend} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply action bar — stays static at bottom */}
      <div className="border-t border-tds-border-neutral-primary px-tds-16 h-[52px] flex items-center gap-tds-8 shrink-0">
        <button
          onClick={() => handleActionClick('reply')}
          className={`flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border text-[12px] font-medium cursor-pointer transition-colors ${
            replyMode === 'reply'
              ? 'border-tds-border-info-primary bg-tds-surface-bg-blue-weakest text-tds-text-info-primary'
              : 'border-tds-border-neutral-primary text-tds-text-body-primary hover:bg-tds-surface-bg-coal-weakest'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8L8 4V6.5C14 6.5 14 12 14 12C14 12 12 8.5 8 8.5V11L2 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
          Reply
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          onClick={() => handleActionClick('note')}
          className={`flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border text-[12px] font-medium cursor-pointer transition-colors ${
            replyMode === 'note'
              ? 'border-tds-border-warning-primary bg-tds-surface-bg-warning-weakest text-tds-text-warning-primary'
              : 'border-tds-border-neutral-primary text-tds-text-body-primary hover:bg-tds-surface-bg-coal-weakest'
          }`}
        >
          Note
        </button>
        <button
          onClick={() => handleActionClick('forward')}
          className={`flex items-center gap-tds-4 px-tds-8 py-tds-4 rounded-tds-default border text-[12px] font-medium cursor-pointer transition-colors ${
            replyMode === 'forward'
              ? 'border-tds-border-info-primary bg-tds-surface-bg-blue-weakest text-tds-text-info-primary'
              : 'border-tds-border-neutral-primary text-tds-text-body-primary hover:bg-tds-surface-bg-coal-weakest'
          }`}
        >
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
          <span className="text-[11px] text-tds-text-caption-secondary">Show Activity</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
