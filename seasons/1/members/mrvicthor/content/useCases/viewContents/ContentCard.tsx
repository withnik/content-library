import { Button, Label, Link, Text } from '@primer/react';

type Props = {
    title: string;
    type: string;
    description: string;
    url: string;
    publishedAt: string;
};

export function ContentCard({
    title,
    type,
    description,
    url,
    publishedAt,
}: Props) {
    return (
        <article className="flex flex-col gap-2 rounded-md border border-(--borderColor-default) p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-1">
                    <Link
                        href={url}
                        rel="noopener noreferrer"
                        className="text-lg font-semibold"
                    >
                        {title}
                    </Link>
                    <Label>{type}</Label>
                </div>
                <Button
                    as="a"
                    rel="noopener noreferrer"
                    href={url}
                    size="small"
                >
                    Open
                </Button>
            </div>
            <Text as="p" className="line-clamp-3">
                {description}
            </Text>
            <Text as="p" className="text-sm text-(--fgColor-muted)">
                Published on {new Date(publishedAt).toLocaleDateString()}
            </Text>
        </article>
    );
}
