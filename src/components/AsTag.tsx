import { createElement, forwardRef } from 'react';

export type Tags = keyof React.JSX.IntrinsicElements;

type ElementByAs<Tag extends Tags> =
  React.JSX.IntrinsicElements[Tag] extends React.DOMAttributes<infer E> ? E : never;

export type AsTagProps<Tag extends Tags = 'div'> = {
  as?: Tag;
  ref?: React.Ref<ElementByAs<Tag>>;
} & Omit<React.JSX.IntrinsicElements[Tag], 'as' | 'ref'>;

export const AsTag = forwardRef(AsTagComponent) as <Tag extends Tags = 'div'>(
  props: AsTagProps<Tag>,
) => React.JSX.Element;

function AsTagComponent<Tag extends Tags = 'div'>(
  props: AsTagProps<Tag>,
  ref: React.Ref<ElementByAs<Tag>>,
) {
  const { as = 'div', ...asProps } = props;
  return createElement(as, { ref, ...asProps });
}
