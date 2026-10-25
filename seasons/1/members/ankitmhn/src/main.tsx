import { createRoot } from 'react-dom/client';
import { PrimerRoot } from '@withnik/configs/primer';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <PrimerRoot>
        <App />
    </PrimerRoot>,
);
