"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function InstagramEmbed({ embedCode }: { embedCode: string }) {
  useEffect(() => {
    // Load Instagram embed script if not already present
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.instgrm?.Embeds.process();
    }
  }, []);

  return (
    <div
      className="instagram-embed"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
