import React, { useEffect, useRef } from 'react';

const readyAppTicketKey = 'App ready';

const AppTicket = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      if (`${e.origin}/` !== process.env.NEXT_PUBLIC_CRA_APP_API_ROOT) {
        return;
      }

      const options = { slug: 'my-event-from-parent', options: { showHeader: false } };

      if (e.data === readyAppTicketKey) {
        frameRef.current?.contentWindow?.postMessage(JSON.stringify(options), process.env.NEXT_PUBLIC_CRA_APP_API_ROOT);
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  return (
    <div>
      <iframe ref={frameRef} frameBorder={0} src={process.env.NEXT_PUBLIC_CRA_APP_API_ROOT} />
    </div>
  );
};

export default AppTicket;
