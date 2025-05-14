import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import { ChatInput } from '@/components/ui/chat/chat-input';

interface ChatResizeTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function ChatResizeTextarea({ value, onChange, ...props }: ChatResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <ChatInput
      placeholder="Type your message here..."
      className="resize-none min-h-4 max-h-80 rounded-lg border-none focus-visible:ring-0 shadow-none bg-background p-3 transition-all duration-150"
      onChange={(e) => onChange(e.target.value)}
      ref={textareaRef}
      value={value}
      {...props}
    />
  );
}
