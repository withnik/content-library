import { Button, Heading, Label, Link, Text } from '@primer/react';
import {
    createContentDashboardViewModel,
    type ContentItem,
} from './ContentDashboardService';

interface ContentDashboardProps {
    items: readonly ContentItem[];
    locale?: string;
}

export function ContentDashboard({ items, locale }: ContentDashboardProps) {
    const viewModel = createContentDashboardViewModel(items, { locale });

    return (
        <ul className="flex flex-col gap-4">
            {viewModel.map((item) => (
                <li
                    key={item.id}
                    className="flex flex-col gap-4 rounded border border-default p-4"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Label>{item.type}</Label>
                        <Text as="time">{item.publishedAtFormatted}</Text>
                    </div>

                    <Heading as="h2">
                        <Link
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.title}
                        </Link>
                    </Heading>

                    <Text as="p">{item.excerpt}</Text>

                    <div>
                        <Button
                            as="a"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View content
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
