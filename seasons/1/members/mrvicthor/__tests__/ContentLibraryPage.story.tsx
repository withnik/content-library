import ContentLibraryPage from '../content/useCases/viewContents/ContentLibraryPage';
import type { Content } from '../content/domain/ContentService';

export const Default = ({ items = [] }: { items?: Content[] }) => (
    <ContentLibraryPage items={items} />
);
