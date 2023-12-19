'use client';

import ReactConfetti from 'react-confetti';

type Props = {
  success: boolean;
};

export const Confetti = (props: Props) => {
  return props.success ? (
    <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
  ) : null;
};
