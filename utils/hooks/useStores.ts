import * as React from 'react';
import { MobXProviderContext } from 'mobx-react';

//  使用Mobx提供的context来包裹
export  function useStores() {
  // mixin code
  return React.useContext(MobXProviderContext);
}