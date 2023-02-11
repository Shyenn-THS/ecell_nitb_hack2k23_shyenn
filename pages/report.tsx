import ErrorMessage from '@/components/ErrorMessage';
import { useSession } from 'next-auth/react';
import React from 'react';
import { signIn } from 'next-auth/react';

type Props = {};

const Report = (props: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <ErrorMessage
        action={{ name: 'Sign In', func: signIn }}
        message="Please Login to View Reports"
      />
    );
  }
  return <div>Report</div>;
};

export default Report;
