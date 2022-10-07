import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../store/menu/actions';

export const usePageTitle = (title: string): void => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: title });
    }, [dispatch, title]);
};
