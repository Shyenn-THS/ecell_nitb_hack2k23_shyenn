import ErrorMessage from '@/components/ErrorMessage';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

const Reports = (props: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <ErrorMessage
        action={{ name: 'Sign In', func: signIn }}
        message="Please Login to see Reports"
      />
    );
  }

  return <div>Report</div>;
};

export default Reports;
