import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStoreType } from '../store';

export const useTypeSelector: TypedUseSelectorHook<RootStoreType> = useSelector;
