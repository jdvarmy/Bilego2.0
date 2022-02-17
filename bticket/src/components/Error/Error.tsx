import React from 'react';
import { ApplicationStatuses } from '../../typings/enum';

type Props = {
  status: ApplicationStatuses;
};

const Error = ({ status }: Props) => {
  return status === ApplicationStatuses.error ? <div>Error</div> : null;
};

export default Error;
