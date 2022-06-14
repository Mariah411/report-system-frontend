import { RootState } from './../store/index';
import { TypedUseSelectorHook, useSelector } from "react-redux";

// типизация хука useSelector 
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector