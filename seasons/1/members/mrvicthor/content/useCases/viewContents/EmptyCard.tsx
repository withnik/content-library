import { Blankslate } from '@primer/react/experimental';
import type { FilterBy } from '../../domain/ContentService';

type Props = {
    filterBy: FilterBy;
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
