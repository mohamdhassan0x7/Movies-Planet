import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { HashRouter } from 'react-router-dom';
import style from '../src/Style/index.css'
import App from '../src/Components/App';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <HashRouter>
        <App />
    </HashRouter>
);

