import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Common/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    tabIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default menu button with standard styling.
 */
export const Default: Story = {
  args: {
    children: 'Menu',
    variant: 'default',
    size: 'md',
  },
};

/**
 * Primary variant menu button.
 */
export const Primary: Story = {
  args: {
    children: 'Primary Menu',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Secondary variant menu button.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Menu',
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * Danger variant menu button for destructive actions.
 */
export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'md',
  },
};

/**
 * Link variant menu button.
 */
export const Link: Story = {
  args: {
    children: 'Link Menu',
    variant: 'link',
    size: 'md',
  },
};

/**
 * Small size menu button.
 */
export const SmallSize: Story = {
  args: {
    children: 'Small',
    variant: 'primary',
    size: 'sm',
  },
};

/**
 * Large size menu button.
 */
export const LargeSize: Story = {
  args: {
    children: 'Large',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Menu button in disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Menu (Disabled)',
    variant: 'primary',
  },
};

/**
 * Menu button with title attribute for tooltip.
 */
export const WithTitle: Story = {
  args: {
    children: 'Menu',
    title: 'Click to open menu',
    variant: 'primary',
  },
};

/**
 * Menu button with ARIA attributes for expanded/controls.
 */
export const WithAriaAttributes: Story = {
  args: {
    'aria-label': 'Options menu',
    'aria-expanded': false,
    'aria-controls': 'menu-popup',
    children: 'Open Options',
    variant: 'primary',
  },
};

/**
 * Controlled menu with state management.
 */
export const Controlled: Story = {
  render: (args) => {
    const ControlledMenu = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <Menu
          {...args}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="primary"
        >
          {isOpen ? 'Close Menu' : 'Open Menu'}
        </Menu>
      );
    };
    return <ControlledMenu />;
  },
};

/**
 * Menu button with custom className for additional styling.
 */
export const WithCustomClassName: Story = {
  args: {
    children: 'Custom Styled',
    className: 'font-bold',
    variant: 'primary',
  },
};
