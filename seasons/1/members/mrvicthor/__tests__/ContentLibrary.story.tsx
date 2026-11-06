import { ContentLibrary } from '../content/useCases/viewContents/ContentLibrary';
import type { Content } from '../content/domain/ContentService';

export const Default = ({ items = [] }: { items?: Content[] }) => (
    <ContentLibrary items={items} />
);
