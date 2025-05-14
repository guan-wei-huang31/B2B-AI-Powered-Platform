export const streamChat = async (
  question: string,
  handlers: {
    onStart?: () => void;
    onMessage?: (message: string) => void;
    onComplete?: () => void;
  }
) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader!.read();
    done = doneReading;

    if (value) {
      buffer += decoder.decode(value, { stream: !done });
    }

    const lines = buffer.split('\n');

    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.status === 'start') {
            handlers.onStart?.();
          }
          if (parsed.m) {
            handlers.onMessage?.(parsed.m);
          }
          if (parsed.status === 'complete') {
            handlers.onComplete?.();
            done = true; // 如果想馬上結束串流也可以
          }
        } catch (error) {
          console.error('Error parsing JSON line:', error);
        }
      }
    }

    buffer = lines[lines.length - 1];
  }
};
