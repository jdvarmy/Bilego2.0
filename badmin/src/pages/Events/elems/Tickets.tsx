import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const Tickets = () => {
  return (
    <Card>
      <CardHeader title='Билеты' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Tickets;
