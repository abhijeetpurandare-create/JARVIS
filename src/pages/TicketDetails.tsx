import { useParams } from 'react-router-dom';
import { useState, useRef, useCallback } from 'react';
import TicketTitleBar from '../components/ticket-details/TicketTitleBar';
import ConversationPanel from '../components/ticket-details/ConversationPanel';
import PropertiesPanel from '../components/ticket-details/PropertiesPanel';
import ContextPanel from '../components/ticket-details/ContextPanel';
import { getTicketDetails } from '../data/ticketDetailsData';

// Default widths as flex-grow ratios (sum = 100 for easy reasoning)
const DEFAULT_CHAT = 65;
const DEFAULT_PROPERTIES = 17.5;
const DEFAULT_CONTEXT = 17.5;

// Constraints (as ratios out of 100)
const MIN_CHAT = 40;
const MAX_CHAT = 65;
const MIN_SIDE = 12;
const MAX_SIDE = 25;

const TicketDetails = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const ticket = getTicketDetails(ticketId || 'J17769268800001');

  const [chatRatio, setChatRatio] = useState(DEFAULT_CHAT);
  const [propsRatio, setPropsRatio] = useState(DEFAULT_PROPERTIES);
  const [ctxRatio, setCtxRatio] = useState(DEFAULT_CONTEXT);

  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<'left' | 'right' | null>(null);
  const startXRef = useRef(0);
  const startRatiosRef = useRef({ chat: 0, props: 0, ctx: 0 });

  const handleMouseDown = useCallback((divider: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = divider;
    startXRef.current = e.clientX;
    startRatiosRef.current = { chat: chatRatio, props: propsRatio, ctx: ctxRatio };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !draggingRef.current) return;

      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const delta = ((moveEvent.clientX - startXRef.current) / containerWidth) * 100;

      const { chat, props, ctx } = startRatiosRef.current;

      if (draggingRef.current === 'left') {
        let newChat = Math.max(MIN_CHAT, Math.min(MAX_CHAT, chat + delta));
        let newProps = 100 - newChat - ctx;
        newProps = Math.max(MIN_SIDE, Math.min(MAX_SIDE, newProps));
        newChat = 100 - newProps - ctx;
        setChatRatio(newChat);
        setPropsRatio(newProps);
      } else {
        let newProps = Math.max(MIN_SIDE, Math.min(MAX_SIDE, props + delta));
        let newCtx = 100 - chat - newProps;
        newCtx = Math.max(MIN_SIDE, Math.min(MAX_SIDE, newCtx));
        newProps = 100 - chat - newCtx;
        setPropsRatio(newProps);
        setCtxRatio(newCtx);
      }
    };

    const handleMouseUp = () => {
      draggingRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [chatRatio, propsRatio, ctxRatio]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Ticket Title Bar */}
      <div className="pt-tds-16 shrink-0">
        <div>
          <TicketTitleBar ticket={ticket} />
        </div>
      </div>

      {/* Main content — 3 panels with dividers between them */}
      <div ref={containerRef} className="flex flex-1 min-h-0 pb-tds-16 pt-tds-12">
        {/* Left — Conversation */}
        <div
          className="min-w-0 overflow-hidden"
          style={{ flex: chatRatio }}
        >
          <ConversationPanel conversations={ticket.conversations} />
        </div>

        {/* Divider */}
        <div className="w-px bg-tds-border-neutral-primary shrink-0 self-stretch" />

        {/* Resize handle */}
        <div
          className="w-[4px] shrink-0 cursor-col-resize rounded-full hover:bg-tds-border-info-primary/40 active:bg-tds-border-info-primary/60 transition-colors -mx-[2px] z-10 self-stretch"
          onMouseDown={(e) => handleMouseDown('left', e)}
        />

        {/* Divider */}
        <div className="w-px bg-tds-border-neutral-primary shrink-0 self-stretch" />

        {/* Middle — Properties */}
        <div
          className="min-w-0 overflow-hidden"
          style={{ flex: propsRatio }}
        >
          <PropertiesPanel ticket={ticket} />
        </div>

        {/* Divider */}
        <div className="w-px bg-tds-border-neutral-primary shrink-0 self-stretch" />

        {/* Resize handle */}
        <div
          className="w-[4px] shrink-0 cursor-col-resize rounded-full hover:bg-tds-border-info-primary/40 active:bg-tds-border-info-primary/60 transition-colors -mx-[2px] z-10 self-stretch"
          onMouseDown={(e) => handleMouseDown('right', e)}
        />

        {/* Divider */}
        <div className="w-px bg-tds-border-neutral-primary shrink-0 self-stretch" />

        {/* Right — Ask AI */}
        <div
          className="min-w-0 overflow-hidden"
          style={{ flex: ctxRatio }}
        >
          <ContextPanel ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
