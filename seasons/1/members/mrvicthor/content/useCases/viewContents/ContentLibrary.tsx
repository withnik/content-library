import { ContentCard } from './ContentCard';

type ContentProps = {
    items: {
        id: string;
        title: string;
        type: string;
        author: string;
        excerpt: string;
        publishedAt: string;
        url: string;
    }[];
};
export const ContentLibrary = ({ items }: ContentProps) => {
    return (
        <ul className="flex list-none flex-col gap-3 px-4">
            {items.map((c) => (
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
