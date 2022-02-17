import React from 'react';
import { ApplicationStatuses } from '../../typings/enum';

type Props = {
  status: ApplicationStatuses;
};

const Loading = ({ status }: Props) => {
  return status === ApplicationStatuses.loading ? <div>Loading</div> : null;
};

export default Loading;
