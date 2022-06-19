import React from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const Tickets = () => {
  return (
    <Card>
      <CardHeader title='Билеты' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item>
            <Button sx={{ mx: 2, my: 0.5 }} variant='outlined' startIcon={<MapIcon fontSize='small' />}>
              Добавить билеты с картой
            </Button>
            <Button sx={{ mx: 2, my: 0.5 }} variant='outlined' startIcon={<LocalActivityIcon fontSize='small' />}>
              Добавить входные билеты
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Tickets;
