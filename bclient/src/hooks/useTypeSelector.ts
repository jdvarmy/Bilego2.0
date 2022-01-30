import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStateType } from '../store';

export const useTypeSelector: TypedUseSelectorHook<RootStateType> = useSelector;
