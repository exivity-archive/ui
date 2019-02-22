import { action } from '@storybook/addon-actions'
import { SetStateAction } from 'react';

export const storeAndAction = (storeState: SetStateAction<any>, label: string, newValue?: any) => 
  (callbackValue: any) => {
    const value = newValue !== undefined ? newValue : callbackValue
    storeState(value)
    action(label)(value)
}
