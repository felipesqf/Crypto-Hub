import React from 'react';
import Portfolio from './components/pages/Portfolio/Portfolio';
import { useAppContext } from './store';

function Auth(ComposedComponent) {
    const [ state ] = useAppContext();

    return function Authentication(props) {
        return state.isAuthenticated
            ? <ComposedComponent {...props} />
            : <Portfolio />;
    };
}

export default Auth;
