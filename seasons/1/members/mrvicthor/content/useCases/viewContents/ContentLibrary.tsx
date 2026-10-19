import data from '../../../../../data/content.json';
import { ContentCard } from './ContentCard';
export const ContentLibrary = () => {
    const { items } = data;
    const orderedItems = [...items].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt),
    );

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
