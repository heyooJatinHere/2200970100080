import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlMap } from '../data/urlStore.js';
import { Logger } from '../logger.js';

export default function Redirect() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = urlMap.get(shortcode);
    const now = new Date();

    if (!entry || entry.expiresAt < now) {
      Logger.error("Invalid or expired shortcode", { shortcode });
      navigate('/error');
      return;
    }

    entry.clicks.push({
      timestamp: now.toISOString(),
      source: document.referrer || 'Direct',
      location: 'Unknown',
    });

    Logger.info("Redirected", { shortcode, to: entry.longUrl });
    window.location.href = entry.longUrl;
  }, [shortcode, navigate]);

  return <></>;
}
