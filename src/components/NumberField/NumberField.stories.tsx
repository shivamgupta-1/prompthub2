import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NumberField from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Common/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberField>;

/**
 * Default number field with standard styling.
 */
export const Default: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="Enter a number" placeholder="Type a number..." size="md" />
    </div>
  ),
};

/**
 * Controlled number field with state management.
 */
export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [val, setVal] = useState<string | number>(5);
      return (
        <div style={{ padding: 'var(--space-4)' }}>
          <NumberField
            label="Controlled Number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            min={0}
            max={100}
          />
          <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Value: {val}
          </p>
        </div>
      );
    };
    return <Demo />;
  },
};

/**
 * Number field with minimum and maximum constraints.
 */
export const WithMinMax: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="Number (0-100)" min={0} max={100} defaultValue={50} step={5} />
    </div>
  ),
};

/**
 * Disabled number field.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="Disabled Field" disabled defaultValue={42} />
    </div>
  ),
};

/**
 * Number field in error state.
 */
export const ErrorState: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="With Error" error placeholder="Invalid input" />
    </div>
  ),
};

/**
 * Required number field.
 */
export const Required: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="Required" required placeholder="Enter a value" />
    </div>
  ),
};

/**
 * Different size variants (small, medium, large).
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NumberField label="Small" size="sm" defaultValue={1} />
      <NumberField label="Medium" size="md" defaultValue={2} />
      <NumberField label="Large" size="lg" defaultValue={3} />
    </div>
  ),
};

/**
 * Different visual variants (outlined, filled, standard).
 */
export const Variants: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <NumberField label="Outlined" variant="outlined" defaultValue={10} />
      <NumberField label="Filled" variant="filled" defaultValue={20} />
      <NumberField label="Standard" variant="standard" defaultValue={30} />
    </div>
  ),
};

/**
 * Number field with custom step increment.
 */
export const WithStep: Story = {
  render: () => (
    <div style={{ padding: 'var(--space-4)' }}>
      <NumberField label="Step by 0.5" min={0} max={10} step={0.5} defaultValue={2.5} />
    </div>
  ),
};
