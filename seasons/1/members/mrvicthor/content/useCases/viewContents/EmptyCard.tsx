import { Blankslate } from '@primer/react/experimental';

const EmptyCard = () => {
    return (
        <Blankslate spacious className="rounded-[10px] bg-white">
            <Blankslate.Heading as="h2">
                Try a different search term, or clear filters.
            </Blankslate.Heading>
        </Blankslate>
    );
};

export default EmptyCard;
