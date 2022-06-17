import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

const Gallery = () => {
  return (
    <Card>
      <CardHeader title='Галерея' />
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

export default Gallery;
