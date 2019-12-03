import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/login';
import NovoUsuario from './pages/novo_usuario/novo_usuario';
import Dashboard from './pages/dashboard/dashboard';
import Espaco from './pages/espaco/espaco';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/novo_usuario" component={NovoUsuario}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/espaco/:id" component={Espaco}/>
                <Route path="/espaco" component={Espaco}/>
            </Switch>
        </BrowserRouter>
    );
}