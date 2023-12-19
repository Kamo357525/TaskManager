import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import App from './App.tsx';
import theme from "./style/theme";
import './style/index.css'
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </ChakraProvider>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
