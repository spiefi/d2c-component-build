import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FigmaModes } from '@src/design-tokens/types';

import LinearDiagram from './LinearDiagram';

const outputModes: FigmaModes = {
  'Linear Diagram / Output': 'Default',
};

function GraphSlotExample({ modes }: { modes?: FigmaModes }) {
  return (
    <div
      style={
        {
          alignItems: 'center',
          background: '#fff3e8',
          color: '#a84400',
          display: 'flex',
          fontSize: 10,
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        } as CSSProperties
      }
    >
      Graph slot · {modes?.['Linear Diagram / Output'] ?? 'default'}
    </div>
  );
}

const meta = {
  title: 'Components/LinearDiagram',
  component: LinearDiagram,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/UN7mmMjOojTlV2a4nmnceI/Zgredek-playground?node-id=1213-12740',
    },
    docs: {
      description: {
        component:
          'A token-driven linear chart with data-driven axis labels and a replaceable graph slot that inherits the diagram modes.',
      },
    },
  },
  argTypes: {
    chartLabel: { control: 'text' },
    graphSlot: { control: false },
    legendLabel: { control: 'text' },
    modes: { control: 'object' },
    sourceText: { control: 'text' },
    updatedText: { control: 'text' },
    xLabels: { control: 'object' },
    yAxisLabel: { control: 'text' },
    yValues: { control: 'object' },
  },
  args: {
    chartLabel: 'Discount development by month',
    graphSlot: undefined,
    legendLabel: 'Discount development',
    modes: outputModes,
    sourceText: 'Based on our internal collected data.',
    updatedText: 'Updated [timestamp]',
    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yAxisLabel: 'Discount value',
    yValues: ['60%', '30%', '0%'],
  },
} satisfies Meta<typeof LinearDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <LinearDiagram {...args} />,
};

export const WithCustomGraph: Story = {
  args: {
    graphSlot: <GraphSlotExample />,
  },
  render: (args) => <LinearDiagram {...args} />,
};
