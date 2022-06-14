import { AllActionCreators } from './../store/reducers/action-creators';
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";



export const useActions = ( ) => {
    const dispatch = useDispatch();
    return bindActionCreators(AllActionCreators, dispatch)
}