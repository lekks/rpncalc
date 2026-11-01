import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App, {registerClipboardSupport} from './components/App';
import * as serviceWorker from './serviceWorker';

registerClipboardSupport();
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element is missing');
}
createRoot(container).render(<App/>);
serviceWorker.unregister();
