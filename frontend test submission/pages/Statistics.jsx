import React from 'react';
import { urlMap } from '../data/urlStore.js';
import { Logger } from '../logger.js';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Statistics() {
  const data = Array.from(urlMap.entries());

  React.useEffect(() => {
    Logger.info("Visited Statistics Page");
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(([shortcode, info]) => (
            <React.Fragment key={shortcode}>
              <TableRow>
                <TableCell>{window.location.origin}/{shortcode}</TableCell>
                <TableCell>{info.longUrl}</TableCell>
                <TableCell>{info.createdAt.toLocaleString()}</TableCell>
                <TableCell>{info.expiresAt.toLocaleString()}</TableCell>
                <TableCell>{info.clicks.length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      Click Details
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Location</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {info.clicks.map((c, i) => (
                            <TableRow key={i}>
                              <TableCell>{c.timestamp}</TableCell>
                              <TableCell>{c.source}</TableCell>
                              <TableCell>{c.location}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
