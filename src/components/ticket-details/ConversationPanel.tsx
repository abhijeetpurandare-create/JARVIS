import { useState, useRef, useEffect } from 'react';
import { Button } from '@delhivery/tarmac';
import { Conversation } from '../../data/ticketDetailsData';

const MessageBubble = ({ message }: { message: Conversation }) => {
  const isCustomer = message.type === 'customer';
  const isPrivateNote = message.type === 'private_note';

  const bubbleStyles = isCustomer
    ? 'bg-tds-surface-bg-blue-weakest border border-tds-border-info-primary/30'
    : isPrivateNote
    ? 'bg-tds-surface-bg-warning-weakest border border-tds-border-warning-primary/40'
    : 'bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary';

  const alignStyles = isCustomer ? 'ml-tds-16 mr-tds-32' : 'ml-auto mr-tds-16 ml-tds-32';

  return (
    <div className={`max-w-[calc(100%-32px)] ${alignStyles} my-tds-8`}>
      <div className={`rounded-tds-lg p-tds-12 ${bubbleStyles}`}>
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
        {message.notifiedTo && (
          <div className="mb-tds-6">
            <p className="text-[11px] text-tds-text-caption-secondary">
              Notified To: {message.notifiedTo.join(', ')}
            </p>
            <div className="h-px bg-tds-border-neutral-primary/50 my-tds-4" />
          </div>
        )}
        <p className="text-[12px] text-tds-text-body-primary leading-[18px] whitespace-pre-line">
          {message.content}
        </p>
      </div>
    </div>
  );
};

type ReplyMode = 'reply' | 'note' | 'forward' | 'escalate' | null;

// Toolbar icons
const BoldIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2.5H9.5C10.163 2.5 10.7989 2.76339 11.2678 3.23223C11.7366 3.70107 12 4.33696 12 5C12 5.66304 11.7366 6.29893 11.2678 6.76777C10.7989 7.23661 10.163 7.5 9.5 7.5H4V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 7.5H10.5C11.163 7.5 11.7989 7.76339 12.2678 8.23223C12.7366 8.70107 13 9.33696 13 10C13 10.663 12.7366 11.2989 12.2678 11.7678C11.7989 12.2366 11.163 12.5 10.5 12.5H4V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ItalicIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3H6.5M9.5 13H6M8.5 3L7.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const UnderlineIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2.5V7.5C4 8.56087 4.42143 9.57828 5.17157 10.3284C5.92172 11.0786 6.93913 11.5 8 11.5C9.06087 11.5 10.0783 11.0786 10.8284 10.3284C11.5786 9.57828 12 8.56087 12 7.5V2.5M3 13.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ListOlIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M7 4H14M7 8H14M7 12H14M3 4V2L2 2.5M2 6H4L2 4M2 12H4L3 10.5C3.5 10 4 10 4 10.5C4 11 3 12 2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ListUlIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M7 4H14M7 8H14M7 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3.5" cy="4" r="1" fill="currentColor"/><circle cx="3.5" cy="8" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/></svg>;
const LinkIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6.5 9C7 9.5 7.6 9.8 8.2 10C8.8 10.2 9.4 10.2 10 10C10.6 9.8 11.1 9.5 11.5 9L13 7.5C13.8 6.7 14.2 5.6 14.2 4.5C14.2 3.4 13.8 2.3 13 1.5C12.2 0.7 11.1 0.3 10 0.3C8.9 0.3 7.8 0.7 7 1.5L6.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 7C9 6.5 8.4 6.2 7.8 6C7.2 5.8 6.6 5.8 6 6C5.4 6.2 4.9 6.5 4.5 7L3 8.5C2.2 9.3 1.8 10.4 1.8 11.5C1.8 12.6 2.2 13.7 3 14.5C3.8 15.3 4.9 15.7 6 15.7C7.1 15.7 8.2 15.3 9 14.5L9.5 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ImageIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/><circle cx="5" cy="6" r="1.25" stroke="currentColor" strokeWidth="1"/><path d="M1.5 11L5 8L8 10.5L11 8L14.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const AttachIcon = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 7.5L7.5 13.5C6.83696 14.163 5.93913 14.5 5 14.5C4.06087 14.5 3.16304 14.163 2.5 13.5C1.83696 12.837 1.5 11.9391 1.5 11C1.5 10.0609 1.83696 9.16304 2.5 8.5L8.5 2.5C8.94 2.06 9.53 1.81 10.15 1.81C10.77 1.81 11.36 2.06 11.8 2.5C12.24 2.94 12.49 3.53 12.49 4.15C12.49 4.77 12.24 5.36 11.8 5.8L5.79 11.8C5.57 12.02 5.28 12.14 4.97 12.14C4.66 12.14 4.37 12.02 4.15 11.8C3.93 11.58 3.81 11.29 3.81 10.98C3.81 10.67 3.93 10.38 4.15 10.16L9.65 4.66" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SendIcon = () => <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/**
 * Reply box — always fully visible, grows with content, no height limit.
 * Scrolls with messages (Gmail-like behavior).
 */
const ReplyBox = ({ mode, onClose, onSend }: { mode: ReplyMode; onClose: () => void; onSend: () => void }) => {
  const [toValue, setToValue] = useState('');
  const [ccValue, setCcValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [showCc, setShowCc] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-grow textarea — no max height limit
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const modeLabel = mode === 'reply' ? 'Reply' : mode === 'note' ? 'Note' : mode === 'forward' ? 'Forward' : 'Escalate to Ops';
  const modeBorder = mode === 'note'
    ? 'border-tds-border-warning-primary/50'
    : mode === 'escalate'
    ? 'border-tds-border-error-primary/40'
    : 'border-tds-border-info-primary/40';
  const modeBg = mode === 'note'
    ? 'bg-tds-surface-bg-warning-weakest/30'
    : mode === 'escalate'
    ? 'bg-[#fef2f2]'
    : 'bg-tds-surface-bg-primary-default';

  return (
    <div className={`mx-tds-16 mb-tds-12 rounded-tds-lg border ${modeBorder} ${modeBg} overflow-hidden`}>
      {/* Header */}
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
              <button onClick={() => setShowCc(true)} className="text-[11px] text-tds-text-info-primary cursor-pointer hover:underline shrink-0">Cc</button>
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

      {/* Body — auto-grows, no max height */}
      <div className="px-tds-12 py-tds-8">
        <textarea
          ref={textareaRef}
          value={bodyValue}
          onChange={handleBodyChange}
          placeholder={mode === 'note' ? 'Add a private note...' : mode === 'escalate' ? 'Describe the escalation reason...' : 'Type your reply...'}
          className="w-full text-[12px] text-tds-text-body-primary bg-transparent outline-none resize-none leading-[18px] placeholder:text-tds-text-caption-secondary/60 min-h-[80px] overflow-hidden"
          rows={4}
        />
      </div>

      {/* Formatting toolbar + Send */}
      <div className="flex items-center justify-between px-tds-12 py-tds-8 border-t border-tds-border-neutral-primary/50">
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
        <Button
          variant="black"
          buttonStyle="primary"
          size="sm"
          text="Send"
          leadingIcon={<SendIcon />}
          disabled={!bodyValue.trim()}
          onClick={onSend}
        />
      </div>
    </div>
  );
};

const ConversationPanel = ({ conversations }: { conversations: Conversation[] }) => {
  const [replyMode, setReplyMode] = useState<ReplyMode>(null);
  const [showActivity, setShowActivity] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (replyMode && scrollContainerRef.current) {
      // Scroll container to bottom so reply box is visible
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [replyMode]);

  const handleClose = () => setReplyMode(null);
  const handleSend = () => setReplyMode(null);

  return (
    <div className="flex flex-col h-full">
      {/* Messages + Reply box — scrollable together (Gmail-like) */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto py-tds-12 flex flex-col">
        {conversations.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Reply box appears inline after messages, scrolls with them */}
        {replyMode && (
          <ReplyBox mode={replyMode} onClose={handleClose} onSend={handleSend} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom action strip — STATIC, never scrolls */}
      <div className="border-t border-tds-border-neutral-primary px-tds-16 h-[52px] flex items-center gap-tds-8 shrink-0">
        <Button
          variant={replyMode === 'reply' ? 'info' : 'black'}
          buttonStyle="secondary"
          size="sm"
          text="Reply"
          leadingIcon={<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8L8 4V6.5C14 6.5 14 12 14 12C14 12 12 8.5 8 8.5V11L2 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>}
          onClick={() => setReplyMode('reply')}
        />
        <Button
          variant={replyMode === 'note' ? 'warning' : 'black'}
          buttonStyle="secondary"
          size="sm"
          text="Note"
          onClick={() => setReplyMode('note')}
        />
        <Button
          variant={replyMode === 'forward' ? 'info' : 'black'}
          buttonStyle="secondary"
          size="sm"
          text="Forward"
          onClick={() => setReplyMode('forward')}
        />
        <Button
          variant={replyMode === 'escalate' ? 'error' : 'black'}
          buttonStyle="secondary"
          size="sm"
          text="Escalate to Ops"
          onClick={() => setReplyMode('escalate')}
        />

        {/* Show Activity toggle */}
        <div className="ml-auto flex items-center gap-tds-6">
          <div
            className={`w-[34px] h-[18px] rounded-full relative cursor-pointer transition-colors ${showActivity ? 'bg-tds-surface-bg-primary-inverse-default' : 'bg-tds-border-neutral-primary'}`}
            onClick={() => setShowActivity(!showActivity)}
          >
            <div className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-tds-surface-bg-primary-default shadow-sm transition-transform ${showActivity ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
          </div>
          <span className="text-[11px] text-tds-text-caption-secondary">Show Activity</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
