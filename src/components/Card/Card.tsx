import { Children, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

import { getVariableByName } from '@src/design-tokens/figma-variables-resolver.js';
import { cloneChildrenWithModes } from '@src/utils/react-utils';

import type { FigmaModes } from '../../design-tokens/types';

import './Card.css';

type CardHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'> & {
  /** Supporting copy shown below the title. */
  body?: ReactNode;
  /** Optional slot content. The slot is omitted when empty, and React component children inherit `modes`. */
  children?: ReactNode;
  /** Semantic heading element used for the title. */
  headingAs?: CardHeadingLevel;
  /** Figma modes keyed by exact variable collection name. */
  modes?: FigmaModes;
  /** Primary Card heading. */
  title?: ReactNode;
};

type CardStyle = CSSProperties & Record<`--card-${string}`, string | number>;

function resolveCardToken(name: string, modes: FigmaModes): string | number {
  const value = getVariableByName(name, modes);

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error(`[Card] Figma variable "${name}" did not resolve to a CSS-compatible value.`);
  }

  return value;
}

function toPixels(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export default function Card({
  body = 'The deepest discounts land on May and August, besides Black Friday Deals.',
  children = null,
  className,
  headingAs: Heading = 'h2',
  modes = {},
  style,
  title = 'Discount development',
  ...rest
}: CardProps) {
  const hasSlotContent = Children.toArray(children).some((child) => child !== '');
  const cardStyle: CardStyle = {
    '--card-background': String(resolveCardToken('card/background', modes)),
    '--card-body-font-family': String(resolveCardToken('card/body/fontFamily', modes)),
    '--card-body-font-size': toPixels(resolveCardToken('card/body/fontSize', modes)),
    '--card-body-font-weight': resolveCardToken('card/body/fontWeight', modes),
    '--card-body-line-height': toPixels(resolveCardToken('card/body/lineHeight', modes)),
    '--card-border-color': String(resolveCardToken('card/border/color', modes)),
    '--card-content-gap': toPixels(resolveCardToken('card/content/gap', modes)),
    '--card-foreground': String(resolveCardToken('card/foreground', modes)),
    '--card-padding-horizontal': toPixels(resolveCardToken('card/padding/horizontal', modes)),
    '--card-padding-vertical': toPixels(resolveCardToken('card/padding/vertical', modes)),
    '--card-radius': toPixels(resolveCardToken('card/radius', modes)),
    '--card-slot-gap': toPixels(resolveCardToken('card/slot/gap', modes)),
    '--card-text-gap': toPixels(resolveCardToken('card/textWrap/gap', modes)),
    '--card-title-font-family': String(resolveCardToken('card/title/fontFamily', modes)),
    '--card-title-font-size': toPixels(resolveCardToken('card/title/fontSize', modes)),
    '--card-title-font-weight': resolveCardToken('card/title/fontWeight', modes),
    '--card-title-line-height': toPixels(resolveCardToken('card/title/lineHeight', modes)),
    ...style,
  };

  return (
    <article
      {...rest}
      className={['Card', hasSlotContent && 'Card--with-slot', className]
        .filter(Boolean)
        .join(' ')}
      data-name="card"
      style={cardStyle}
    >
      <header className="Card__text">
        <Heading className="Card__title">{title}</Heading>
        {body !== null && <p className="Card__body">{body}</p>}
      </header>

      {hasSlotContent && (
        <div className="Card__slot">{cloneChildrenWithModes(children, modes)}</div>
      )}
    </article>
  );
}
