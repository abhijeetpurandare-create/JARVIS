import { useParams } from 'react-router-dom';
import { useState, useRef, useCallback } from 'react';
import TicketTitleBar from '../components/ticket-details/TicketTitleBar';
import ConversationPanel from '../components/ticket-details/ConversationPanel';
import PropertiesPanel from '../components/ticket-details/PropertiesPanel';
import ContextPanel from '../components/ticket-details/ContextPanel';
import { getTicketDetails } from '../data/ticketDetailsData';

// Default widths (percentages of available space)
const DEFAULT_CHAT_WIDTH = 65;
const DEFAULT_PROPERTIES_WIDTH = 17.5;
const DEFAULT_CONTEXT_WIDTH = 17.5;

// Constraints
const MIN_CHAT_WIDTH = 40;
const MAX_CHAT_WIDTH = 65;
const MIN_SIDE_WIDTH = 12;
const MAX_SIDE_WIDTH = 25;

const TicketDetails = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const ticket = getTicketDetails(ticketId || 'J17769268800001');

  const [chatWidth, setChatWidth] = useState(DEFAULT_CHAT_WIDTH);
  const [propertiesWidth, setPropertiesWidth] = useState(DEFAULT_PROPERTIES_WIDTH);
  const [contextWidth, setContextWidth] = useState(DEFAULT_CONTEXT_WIDTH);

  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<'left' | 'right' | null>(null);
  const startXRef = useRef(0);
  const startWidthsRef = useRef({ chat: 0, properties: 0, context: 0 });

  const handleMouseDown = useCallback((divider: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = divider;
    startXRef.current = e.clientX;
    startWidthsRef.current = { chat: chatWidth, properties: propertiesWidth, context: contextWidth };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current || !draggingRef.current) return;

      const containerWidth = containerRef.current.getBoundingClientRect().width;
      // Account for gaps (2 gaps × 16px each = 32px)
      const availableWidth = containerWidth - 32;
      const deltaPercent = ((moveEvent.clientX - startXRef.current) / availableWidth) * 100;

      const { chat: startChat, properties: startProps, context: startCtx } = startWidthsRef.current;

      if (draggingRef.current === 'left') {
        // Dragging between Chat and Properties
        let newChat = startChat + deltaPercent;
        let newProps = startProps - deltaPercent;

        // Clamp
        newChat = Math.max(MIN_CHAT_WIDTH, Math.min(MAX_CHAT_WIDTH, newChat));
        newProps = 100 - newChat - startCtx;
        newProps = Math.max(MIN_SIDE_WIDTH, Math.min(MAX_SIDE_WIDTH, newProps));
        newChat = 100 - newProps - startCtx;

        setChatWidth(newChat);
        setPropertiesWidth(newProps);
      } else {
        // Dragging between Properties and Context
        let newProps = startProps + deltaPercent;
        let newCtx = startCtx - deltaPercent;

        // Clamp
        newProps = Math.max(MIN_SIDE_WIDTH, Math.min(MAX_SIDE_WIDTH, newProps));
        newCtx = 100 - startChat - newProps;
        newCtx = Math.max(MIN_SIDE_WIDTH, Math.min(MAX_SIDE_WIDTH, newCtx));
        newProps = 100 - startChat - newCtx;

        setPropertiesWidth(newProps);
        setContextWidth(newCtx);
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
  }, [chatWidth, propertiesWidth, contextWidth]);

  return (
    <div className="flex flex-col h-full bg-tds-surface-bg-coal-weakest">
      {/* Ticket Title Bar — in a container */}
      <div className="pr-tds-16 pt-tds-16">
        <div className="bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary">
          <TicketTitleBar ticket={ticket} />
        </div>
      </div>

      {/* Main content — 3 resizable panels */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden pr-tds-16 py-tds-16 pt-tds-12 gap-tds-16">
        {/* Left — Conversation thread */}
        <div
          className="overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary"
          style={{ width: `${chatWidth}%`, flexShrink: 0 }}
        >
          <ConversationPanel conversations={ticket.conversations} />
        </div>

        {/* Resize handle — left divider */}
        <div
          className="w-[4px] shrink-0 cursor-col-resize rounded-full hover:bg-tds-border-info-primary/40 active:bg-tds-border-info-primary/60 transition-colors -mx-tds-8 z-10 self-stretch"
          onMouseDown={(e) => handleMouseDown('left', e)}
        />

        {/* Middle — Properties */}
        <div
          className="overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary"
          style={{ width: `${propertiesWidth}%`, flexShrink: 0 }}
        >
          <PropertiesPanel ticket={ticket} />
        </div>

        {/* Resize handle — right divider */}
        <div
          className="w-[4px] shrink-0 cursor-col-resize rounded-full hover:bg-tds-border-info-primary/40 active:bg-tds-border-info-primary/60 transition-colors -mx-tds-8 z-10 self-stretch"
          onMouseDown={(e) => handleMouseDown('right', e)}
        />

        {/* Right — AI Context */}
        <div
          className="overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary"
          style={{ width: `${contextWidth}%`, flexShrink: 0 }}
        >
          <ContextPanel ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
