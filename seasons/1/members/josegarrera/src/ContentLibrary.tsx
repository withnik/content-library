import { Label, Link, LinkButton, Text } from '@primer/react';
import { Card } from '@primer/react/experimental';

import type { ContentCard } from './contentLibraryViewModel';

type ContentLibraryProps = {
    cards: ContentCard[];
};

export function ContentLibrary({ cards }: ContentLibraryProps) {
    return (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {cards.map((card) => (
                <li key={card.id}>
                    <Card>
                        <Card.Heading>
                            <Link
                                href={card.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {card.title}
                            </Link>
                        </Card.Heading>
                        <Card.Description>{card.excerpt}</Card.Description>
                        <Card.Action>
                            <LinkButton
                                href={card.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open
                            </LinkButton>
                        </Card.Action>
                        <Card.Metadata>
                            <Label>{card.type}</Label>
                            <Text>{card.publishedDate}</Text>
                        </Card.Metadata>
                    </Card>
                </li>
            ))}
        </ul>
    );
}
