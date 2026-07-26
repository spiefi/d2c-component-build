import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { FigmaModes } from '../design-tokens/types';

type ElementPropsWithModes = {
  children?: ReactNode;
  modes?: FigmaModes;
};

function isModes(value: unknown): value is FigmaModes {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively gives React component children the parent's Figma modes.
 * A child's own collection selections override the corresponding parent selections.
 * Host DOM elements and fragments carry the cascade without receiving a `modes` attribute.
 */
export function cloneChildrenWithModes(children: ReactNode, modes: FigmaModes): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const element = child as ReactElement<ElementPropsWithModes>;
    const childModes = isModes(element.props.modes) ? element.props.modes : {};
    const effectiveModes = { ...modes, ...childModes };
    const hasChildren = Object.prototype.hasOwnProperty.call(element.props, 'children');
    const nextChildren = hasChildren
      ? cloneChildrenWithModes(element.props.children, effectiveModes)
      : undefined;
    const isHostElement = typeof element.type === 'string' || element.type === Fragment;

    return cloneElement(element, {
      ...(!isHostElement && { modes: effectiveModes }),
      ...(hasChildren && { children: nextChildren }),
    });
  });
}
