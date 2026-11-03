import {
    ActionList,
    ActionMenu,
    Button,
    Heading,
    Link,
    PageHeader,
    Stack,
    Text,
} from '@primer/react';
import { useSyncExternalStore } from 'react';
import { createContentLibraryViewModel } from './ContentLibraryViewModelService.ts';

const TYPE_PARAM = 'type';
const typeParamListeners = new Set<() => void>();

function subscribeToTypeParam(onStoreChange: () => void) {
    typeParamListeners.add(onStoreChange);
    window.addEventListener('popstate', onStoreChange);
    return () => {
        typeParamListeners.delete(onStoreChange);
        window.removeEventListener('popstate', onStoreChange);
    };
}

function getTypeParam() {
    return new URLSearchParams(window.location.search).get(TYPE_PARAM);
}

function setTypeParam(nextFilter: string | null) {
    const params = new URLSearchParams(window.location.search);
    if (nextFilter) {
        params.set(TYPE_PARAM, nextFilter);
    } else {
        params.delete(TYPE_PARAM);
    }
    const search = params.toString();
    window.history.pushState(null, '', search ? `/?${search}` : '/');
    for (const listener of typeParamListeners) {
        listener();
    }
}

export type ContentItem = {
    id: string;
    title: string;
    type: string;
    media?: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
    thumbnailUrl: string | null;
};

export type ContentLibraryPageProps = {
    items: ContentItem[];
};

export function ContentLibraryPage({ items }: ContentLibraryPageProps) {

    const filterValue = useSyncExternalStore(
        subscribeToTypeParam,
        getTypeParam,
    );

    const viewModel = createContentLibraryViewModel(items, navigator.language, filterValue);

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>{viewModel.title}</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

            <ActionMenu>
                <ActionMenu.Button>{filterValue ?? 'All'}</ActionMenu.Button>
                <ActionMenu.Overlay>
                    <ActionList selectionVariant="single">
                        <ActionList.Item
                            selected={filterValue === null}
                            onSelect={() => setTypeParam(null)}
                        >
                            All
                        </ActionList.Item>
                        {viewModel.filterOptions.map((option) => (
                            <ActionList.Item
                                key={option}
                                selected={filterValue === option}
                                onSelect={() => setTypeParam(option)}
                            >
                                {option}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>

            <ul role="list" className="m-0 flex list-none flex-col gap-4 p-0">
                {viewModel.items.map((item) => (
                    <li
                        key={item.id}
                        data-testid={`content-item-${item.id}`}
                        className="rounded-md border border-gray-300 p-4"
                    >
                        <Stack direction="vertical" gap="condensed">
                            <Stack
                                direction="horizontal"
                                justify="space-between"
                                align="start"
                            >
                                <Heading as="h3" variant="small">
                                    <Link
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.title}
                                    </Link>
                                </Heading>
                                <Button
                                    as="a"
                                    role="button"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open
                                </Button>
                            </Stack>
                            <Text as="p" size="small">
                                {item.type} · {item.date}
                            </Text>
                            <Text as="p">{item.excerpt}</Text>
                        </Stack>
                    </li>
                ))}
            </ul>
        </main>
    );
}
