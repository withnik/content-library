// Thin pass-through: the spec next door supplies the `items` prop via
// mount(id, { props }), this story just forwards whatever it's given.
import { ContentLibraryPage, type ContentLibraryPageProps } from '../src/ContentLibraryPage';

export const Default = (props: ContentLibraryPageProps) => (
    <ContentLibraryPage {...props} />
);
