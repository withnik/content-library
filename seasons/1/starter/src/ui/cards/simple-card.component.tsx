import { Button } from '@primer/react';
import { Card } from '@primer/react/experimental';

type SimpleCardProps = {
  headerText: string;
  subheaderText: string;
  descriptionText: string;
  timeText: string;
  href: string;
};

const SimpleCard = ({
  headerText,
  subheaderText,
  descriptionText,
  timeText,
  href,
}: SimpleCardProps) => {
  return (
    <Card>
      <Card.Heading>{headerText}</Card.Heading>
      <Card.Action>
        <Button as="a" href={href} size="small">Open</Button>
      </Card.Action>
      <Card.Description>{descriptionText}</Card.Description>
      <Card.Metadata>{subheaderText} · {timeText}</Card.Metadata>
    </Card>
  );
};

export default SimpleCard;
