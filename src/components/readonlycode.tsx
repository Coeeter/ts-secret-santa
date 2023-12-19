'use client';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import useTypeWriter from 'react-typewriter-hook';

type Props = {
  value: string;
  type: boolean;
};

export const ReadOnlyCode = (props: Props) => {
  const typing = props.type ? useTypeWriter(props.value) : props.value;

  return (
    <ReactCodeMirror
      extensions={[
        javascript({
          typescript: true,
        }),
      ]}
      readOnly
      theme={'dark'}
      editable={false}
      className="pointer-events-none select-none"
      value={typing ?? undefined}
    />
  );
};
