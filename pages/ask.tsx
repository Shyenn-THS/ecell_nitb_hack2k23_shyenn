import ErrorMessage from '@/components/ErrorMessage';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

const Ask = (props: Props) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <ErrorMessage
        action={{ name: 'Sign In', func: signIn }}
        message="Please Login to Ask Question and Get Answers from our Experts"
      />
    );
  }

  return <div>ask</div>;
};

export default Ask;
