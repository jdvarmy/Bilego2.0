import React from 'react';
import { useParams } from 'react-router';
import StatusComingSoon from '../../components/StatusComingSoon/StatusComingSoon';

const Taxonomies = () => {
  const { slug } = useParams();

  return (
    <div>
      <StatusComingSoon />
    </div>
  );
};

export default Taxonomies;
