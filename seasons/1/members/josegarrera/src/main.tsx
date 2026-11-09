import { createRoot } from 'react-dom/client';
import { PrimerRoot } from '@withnik/configs/primer';
import contentSource from '../../../data/content.json';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <PrimerRoot>
        <App records={contentSource.items} />
    </PrimerRoot>,
);
