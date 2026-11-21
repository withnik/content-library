import { createRoot } from 'react-dom/client';
import { PrimerRoot } from '@withnik/configs/primer';
import { App } from './App';
import './index.css';
import { NuqsAdapter } from 'nuqs/adapters/react';

createRoot(document.getElementById('root')!).render(
    <PrimerRoot>
        <NuqsAdapter>
            <App />
        </NuqsAdapter>
    </PrimerRoot>,
);
