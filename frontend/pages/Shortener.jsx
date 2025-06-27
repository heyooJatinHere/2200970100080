import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Logger } from '../logger.js';
import { Delete } from '@mui/icons-material';

import { urlMap } from '../data/urlStore.js';

export default function Shortener() {
  const [entries, setEntries] = useState([{ longUrl: '', shortcode: '', validity: '' }]);
  const [errors, setErrors] = useState([]);
  const [shortened, setShortened] = useState([]);

  const validateEntry = (entry) => {
    const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    const scPattern = /^[a-zA-Z0-9]{3,10}$/;

    if (!entry.longUrl.match(urlPattern)) return 'Invalid URL format';
    if (entry.shortcode && (!scPattern.test(entry.shortcode) || urlMap.has(entry.shortcode)))
      return 'Invalid or duplicate shortcode';
    if (entry.validity && (isNaN(entry.validity) || entry.validity <= 0)) return 'Invalid validity';
    return null;
  };

  const generateShortcode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sc;
    do {
      sc = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (urlMap.has(sc));
    return sc;
  };

  const handleShorten = () => {
    const newErrors = [];
    const results = [];

    for (let i = 0; i < entries.length; i++) {
      const err = validateEntry(entries[i]);
      if (err) {
        Logger.error('Validation failed', { entry: entries[i], error: err });
        newErrors[i] = err;
      } else {
        const sc = entries[i].shortcode || generateShortcode();
        const now = new Date();
        const validMin = parseInt(entries[i].validity || 30);
        const expiry = new Date(now.getTime() + validMin * 60000);
        urlMap.set(sc, {
          longUrl: entries[i].longUrl,
          createdAt: now,
          expiresAt: expiry,
          clicks: [],
        });
        Logger.info('Shortened URL', { shortcode: sc, url: entries[i].longUrl, expiry: expiry.toISOString() });
        results.push({
          shortcode: sc,
          longUrl: entries[i].longUrl,
          expiresAt: expiry.toISOString(),
        });
        newErrors[i] = null;
      }
    }

    setErrors(newErrors);
    setShortened(results);
  };

  const handleChange = (i, field, val) => {
    const copy = [...entries];
    copy[i][field] = val;
    setEntries(copy);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shorten Your URLs
      </Typography>
      {entries.map((entry, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
          <TextField
            label="Long URL"
            value={entry.longUrl}
            onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
            fullWidth
            error={!!errors[i]}
            helperText={errors[i] || ''}
          />
          <TextField
            label="Validity (min)"
            value={entry.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
            sx={{ width: 120 }}
          />
          <TextField
            label="Custom Shortcode"
            value={entry.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            sx={{ width: 200 }}
          />
          {entries.length > 1 && (
            <IconButton onClick={() => setEntries(entries.filter((_, idx) => idx !== i))}>
              <Delete />
            </IconButton>
          )}
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {entries.length < 5 && (
          <Button onClick={() => setEntries([...entries, { longUrl: '', shortcode: '', validity: '' }])}>
            Add URL
          </Button>
        )}
        <Button variant="contained" onClick={handleShorten}>
          Shorten URLs
        </Button>
      </Box>

      {shortened.length > 0 && (
        <>
          <Typography variant="h6">Shortened Links</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Expires At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortened.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <a href={`/${row.shortcode}`}>{window.location.origin}/{row.shortcode}</a>
                  </TableCell>
                  <TableCell>{row.longUrl}</TableCell>
                  <TableCell>{row.expiresAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  );
}

export { urlMap };
