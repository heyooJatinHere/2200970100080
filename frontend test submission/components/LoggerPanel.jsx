import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';

export default function LoggerPanel() {
  const [open, setOpen] = useState(false);
  const logs = window.__logs || [];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        View Logs
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6">Logger Panel</Typography>
          <Button size="small" onClick={() => (window.__logs = [])}>Clear Logs</Button>
          <Divider sx={{ my: 2 }} />
          <List>
            {[...logs].reverse().map((log, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemText
                  primary={`[${log.level}] ${log.message}`}
                  secondary={
                    <>
                      <Typography variant="caption">{log.timestamp}</Typography>
                      {Object.entries(log)
                        .filter(([k]) => !['timestamp', 'level', 'message'].includes(k))
                        .map(([key, value]) => (
                          <Typography key={key} variant="body2" color="textSecondary">
                            {key}: {JSON.stringify(value)}
                          </Typography>
                        ))}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
