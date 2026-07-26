import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FigmaModes } from '@src/design-tokens/types';

import LinearDiagram from '../LinearDiagram/LinearDiagram';
import Card from './Card';

const outputModes: FigmaModes = {
  'Card / Output': 'Default',
};

const linearDiagramModes: FigmaModes = {
  'Linear Diagram / Output': 'Default',
};

function SlotExample({ modes }: { modes?: FigmaModes }) {
  return (
    <button
      type="button"
      style={
        {
          alignSelf: 'flex-start',
          background: '#0d0d0d',
          border: 0,
          borderRadius: 999,
          color: '#ffffff',
          cursor: 'pointer',
          font: 'inherit',
          padding: '10px 16px',
        } as CSSProperties
      }
    >
      Slot receives {modes?.['Card / Output'] ?? 'the default mode'}
    </button>
  );
}

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/UN7mmMjOojTlV2a4nmnceI/Zgredek-playground?node-id=1213-12735',
    },
    docs: {
      description: {
        component:
          'A token-driven content card with a real React slot. Slot children recursively inherit the Card modes.',
      },
    },
  },
  argTypes: {
    body: { control: 'text' },
    children: { control: false },
    headingAs: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    modes: { control: 'object' },
    title: { control: 'text' },
  },
  args: {
    body: 'The deepest discounts land on May and August, besides Black Friday Deals.',
    headingAs: 'h2',
    modes: outputModes,
    title: 'Discount development',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: (args) => <Card {...args} />,
};

export const WithContent: Story = {
  args: {
    children: <SlotExample />,
  },
  render: (args) => <Card {...args} />,
};

export const WithLinearDiagram: Story = {
  args: {
    children: <LinearDiagram modes={linearDiagramModes} />,
  },
  render: (args) => <Card {...args} />,
};
