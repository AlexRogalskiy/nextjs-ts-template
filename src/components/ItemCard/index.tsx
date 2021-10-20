import { FC } from 'react';
import NextLink from 'next/link';
import { Heading, HeadingProps, LinkBox, LinkOverlay } from '@chakra-ui/react';
import colorHashers from '@/modules/colorHashers';

interface Props {
  title: string;
  titleAs?: HeadingProps['as'];
  href: string;
}

const ItemCardBox: FC = ({ children }) => (
  <LinkBox
    as="li"
    bgColor="rgba(255,255,255,0.99)"
    borderRadius="4px"
    boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
    padding={3}
    textAlign="center"
    position="relative"
    sx={{
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        boxShadow: 'rgba(149, 157, 165, 0.45) 2px 12px 28px',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.6s',
      },
      '&:hover': {
        zIndex: 1,
        '&::after': {
          opacity: 1,
        },
      },
    }}
  >
    {children}
  </LinkBox>
);

interface TitleProps {
  textColor: string;
  dotColor: string;
  as: Props['titleAs'];
}

const ItemCardTitle: FC<TitleProps> = ({
  textColor,
  dotColor,
  as,
  children,
}) => (
  <Heading
    as={as}
    size="md"
    color={textColor}
    display="flex"
    alignItems="center"
    justifyContent="center"
    transition="transform 0.3s"
    sx={{
      '&::before, &::after': {
        content: '""',
        display: 'inline-block',
        width: '4px',
        height: '4px',
        marginLeft: 1,
        marginRight: 1,
        transition: 'transform 0.4s',
        pointerEvents: 'none',
        backgroundColor: dotColor,
        'li:hover &': {
          transform: 'scale(1.5, 1.5)',
          borderRadius: '15%',
        },
      },
    }}
  >
    {children}
  </Heading>
);

const ItemCard: FC<Props> = ({ title, titleAs = 'h3', href, children }) => {
  const dotColor = colorHashers.decoration.hex(title);
  const textColor = colorHashers.text.hex(title);
  return (
    <ItemCardBox>
      <ItemCardTitle as={titleAs} textColor={textColor} dotColor={dotColor}>
        <NextLink href={href} passHref>
          <LinkOverlay>{title}</LinkOverlay>
        </NextLink>
      </ItemCardTitle>
      {children}
    </ItemCardBox>
  );
};

export default ItemCard;
