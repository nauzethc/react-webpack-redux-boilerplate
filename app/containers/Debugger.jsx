import React from 'react';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default (props) => {
  return (
    <DebugPanel top right bottom>
      <DevTools store={props.store} monitor={LogMonitor} />
    </DebugPanel>
  );
};
