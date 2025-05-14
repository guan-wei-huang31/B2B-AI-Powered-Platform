import { X } from 'lucide-react';
import { useRef, useState } from 'react';

import { ChatResizeTextarea } from '@/components/chat/chat-resize-textarea/ChatResizeTextarea';
import { ChatBubble, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/chat/expandable-chat';
import { cn } from '@/lib/utils';
import { streamChat } from '@/service/core/chat';

import MarkdownRenderer from '../markdown-renderer';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

export default function ChatSupport() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Hi I'm your AI assistant. You are welcome to consult me for **detailed product information** and **strategic product development advice**. How can I help you today?`,
      role: 'assistant',
    },
  ]);

  const [isStreaming, setIsStreaming] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStreaming) return;

    // Add user message to the chat history, and trigger SSE connection
    setMessages((prev) => {
      const userMessage: ChatMessage = {
        id: String(prev.length + 1),
        content: message,
        role: 'user',
      };
      const assistantMessage: ChatMessage = {
        id: String(prev.length + 2),
        content: '',
        role: 'assistant',
        isLoading: true,
      };
      return [...prev, userMessage, assistantMessage];
    });

    const currentQuestion = message;
    setMessage('');
    setIsStreaming(true);

    try {
      await streamChat(currentQuestion, {
        onStart: () => {
          setIsStreaming(true);
        },
        onMessage: (message) => {
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: lastMessage.content + message, isLoading: false },
            ];
          });
        },
      });
    } catch (error) {
      console.error('Stream error:', error);
    } finally {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...lastMessage, isLoading: false }];
      });
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const toggleChat = () => {
    setIsExpanded((prev) => !prev);
  };

  const closeChat = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <ExpandableChat size="sm" position="bottom-right" isOpen={isExpanded} toggleChat={toggleChat}>
        <ExpandableChatHeader className="py-3 px-4 flex flex-row items-center justify-between bg-primary/70">
          <h1 className="text-md text-border">Chat with our AI ✨</h1>
          <button type="button" onClick={closeChat}>
            <X className="h-5 stroke-white hover:stroke-border" />
          </button>
        </ExpandableChatHeader>

        {isExpanded && (
          <>
            <ExpandableChatBody>
              <ChatMessageList ref={messagesContainerRef} className="scrollbar">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    variant={message.role === 'user' ? 'sent' : 'received'}
                  >
                    <ChatBubbleMessage
                      variant={message.role === 'user' ? 'sent' : 'received'}
                      isLoading={message.isLoading}
                      className={cn('markdown', 'overflow-x-auto')}
                    >
                      <MarkdownRenderer markdown={message.content} />
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))}
              </ChatMessageList>
            </ExpandableChatBody>
            <ExpandableChatFooter>
              <form
                onSubmit={handleSubmit}
                className="relative rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring outline-1 outline-border"
              >
                <ChatResizeTextarea
                  disabled={isStreaming}
                  onKeyDown={handleKeyDown}
                  value={message}
                  onChange={setMessage}
                  minLength={2}
                />
              </form>
            </ExpandableChatFooter>
          </>
        )}
      </ExpandableChat>
    </>
  );
}
