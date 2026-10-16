import data from '../../../../../data/content.json';
import { sortByNewest } from '../../../helpers/sortByNewest';
import { ContentCard } from './ContentCard';
export const ContentLibrary = () => {
    const { items } = data;
    const orderedItems = sortByNewest(items);

    return (
        <ul className="flex list-none flex-col gap-3 px-4">
            {orderedItems.map((c) => (
                <li key={c.id}>
                    <ContentCard
                        description={c.excerpt}
                        title={c.title}
                        type={c.type}
                        url={c.url}
                        publishedAt={c.publishedAt}
                    />
                </li>
            ))}
        </ul>
    );
};
