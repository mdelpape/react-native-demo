import React, { Dispatch, SetStateAction } from 'react';

type StatusType = {
  status: { incomplete: string[]; complete: string[] },
  setStatus: Dispatch<SetStateAction<{ incomplete: string[]; complete: string[] }>>
};

export const StatusContext = React.createContext<StatusType>({
  status: { incomplete: [], complete: [] },
  setStatus: () => {},
});