import { Label, Link, LinkButton, Text } from '@primer/react';
import { Card } from '@primer/react/experimental';

import { type ContentItem, formatPublishedAt } from './contentItem';

type ContentLibraryProps = {
    items: ContentItem[];
};

export function ContentLibrary({ items }: ContentLibraryProps) {
    return (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {items.map((item) => (
                <li key={item.id}>
                    <Card>
                        <Card.Heading>
                            <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.title}
                            </Link>
                        </Card.Heading>
                        <Card.Description>{item.excerpt}</Card.Description>
                        <Card.Action>
                            <LinkButton
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open
                            </LinkButton>
                        </Card.Action>
                        <Card.Metadata>
                            <Label>{item.type}</Label>
                            <Text>{formatPublishedAt(item.publishedAt)}</Text>
                        </Card.Metadata>
                    </Card>
                </li>
            ))}
        </ul>
    );
}
