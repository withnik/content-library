import { Blankslate } from '@primer/react/experimental';

type Props = {
    filterBy: string;
};

const EmptyCard = ({ filterBy }: Props) => {
    return (
        <Blankslate spacious className="rounded-[10px] bg-white">
            <Blankslate.Heading as="h2">
                There is no content yet that match {filterBy}.
            </Blankslate.Heading>
        </Blankslate>
    );
};

export default EmptyCard;
