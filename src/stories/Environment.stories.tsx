import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

type EnvironmentReadyProps = {
  accent: string;
  message: string;
  title: string;
};

function EnvironmentReady({ accent, message, title }: EnvironmentReadyProps) {
  return (
    <main
      style={
        {
          '--environment-accent': accent,
          background: '#ffffff',
          border: '1px solid #d9deea',
          borderRadius: 24,
          boxShadow: '0 20px 50px rgba(23, 32, 52, 0.12)',
          display: 'grid',
          gap: 16,
          maxWidth: 560,
          padding: 36,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        style={{
          background: 'var(--environment-accent)',
          borderRadius: 999,
          height: 8,
          width: 64,
        }}
      />
      <h1 style={{ fontSize: 32, letterSpacing: '-0.03em', margin: 0 }}>{title}</h1>
      <p style={{ color: '#526078', fontSize: 17, lineHeight: 1.6, margin: 0 }}>{message}</p>
      <ul style={{ color: '#33415c', display: 'grid', gap: 8, margin: 0, paddingLeft: 22 }}>
        <li>React + TypeScript library build</li>
        <li>Storybook controls, docs, and accessibility checks</li>
        <li>Figma variable and mode-cascade foundations</li>
        <li>GitHub Pages deployment workflow</li>
      </ul>
    </main>
  );
}

const meta = {
  title: 'Foundation/Environment',
  component: EnvironmentReady,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight environment check. Product components are added only from approved Figma nodes.',
      },
    },
  },
} satisfies Meta<typeof EnvironmentReady>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accent: '#5b5ce2',
    message:
      'The component workshop is ready. Change these values in Controls to confirm that story args are connected.',
    title: 'Ready for Figma components',
  },
  render: (args) => <EnvironmentReady {...args} />,
};

