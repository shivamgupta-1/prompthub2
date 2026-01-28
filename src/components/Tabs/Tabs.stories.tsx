import React, { useState } from "react";
import type { Meta } from "@storybook/react";
import { Tabs, Tab, TabPanel } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

// Sample content for tabs
const sampleTabs = [
  { value: 0, label: "Overview", content: "This is the overview tab content." },
  { value: 1, label: "Details", content: "This is the details tab content with more information." },
  { value: 2, label: "Settings", content: "This is the settings tab content." },
];

// Default story
export const Default = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue}>
      {sampleTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {sampleTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Size small
export const SizeSmall = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue} size="sm">
      {sampleTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {sampleTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Size large
export const SizeLarge = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue} size="lg">
      {sampleTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {sampleTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Variant scrollable
export const VariantScrollable = () => {
  const [value, setValue] = useState(0);

  const manyTabs = Array.from({ length: 10 }, (_, i) => ({
    value: i,
    label: `Tab ${i + 1}`,
    content: `Content for tab ${i + 1}`,
  }));

  return (
    <div style={{ maxWidth: "400px" }}>
      <Tabs value={value} onChange={setValue} variant="scrollable">
        {manyTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
        {manyTabs.map((tab) => (
          <TabPanel key={`panel-${tab.value}`} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

// Variant centered
export const VariantCentered = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue} variant="centered">
      {sampleTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {sampleTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Variant full-width
export const VariantFullWidth = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue} variant="full-width">
      {sampleTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {sampleTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Variant vertical
export const VariantVertical = () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: "flex", gap: "var(--space-4)" }}>
      <Tabs value={value} onChange={setValue} variant="vertical">
        {sampleTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
        {sampleTabs.map((tab) => (
          <TabPanel key={`panel-${tab.value}`} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

// Variant vertical-centered
export const VariantVerticalCentered = () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: "flex", gap: "var(--space-4)", height: "300px" }}>
      <Tabs value={value} onChange={setValue} variant="vertical-centered">
        {sampleTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
        {sampleTabs.map((tab) => (
          <TabPanel key={`panel-${tab.value}`} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

// With icons
export const WithIcons = () => {
  const [value, setValue] = useState(0);

  const tabsWithIcons = [
    { value: 0, label: "Overview", icon: "📋", content: "Overview content" },
    { value: 1, label: "Details", icon: "📊", content: "Details content" },
    { value: 2, label: "Settings", icon: "⚙️", content: "Settings content" },
  ];

  return (
    <Tabs value={value} onChange={setValue}>
      {tabsWithIcons.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} />
      ))}
      {tabsWithIcons.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// With badges
export const WithBadges = () => {
  const [value, setValue] = useState(0);

  const tabsWithBadges = [
    { value: 0, label: "Inbox", badge: 5, content: "5 new messages" },
    { value: 1, label: "Archive", badge: 0, content: "No archived items" },
    { value: 2, label: "Trash", badge: 2, content: "2 items in trash" },
  ];

  return (
    <Tabs value={value} onChange={setValue}>
      {tabsWithBadges.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} badge={tab.badge} />
      ))}
      {tabsWithBadges.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// With disabled tabs
export const WithDisabledTabs = () => {
  const [value, setValue] = useState(0);

  const tabsWithDisabled = [
    { value: 0, label: "Tab 1", disabled: false, content: "Content 1" },
    { value: 1, label: "Tab 2 (Disabled)", disabled: true, content: "Content 2" },
    { value: 2, label: "Tab 3", disabled: false, content: "Content 3" },
  ];

  return (
    <Tabs value={value} onChange={setValue}>
      {tabsWithDisabled.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          disabled={tab.disabled}
        />
      ))}
      {tabsWithDisabled.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Controlled component with external button
export const ControlledExternally = () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <button
          onClick={() => setValue(0)}
          style={{
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: value === 0 ? "var(--color-primary)" : "var(--bg-surface)",
            color: value === 0 ? "white" : "var(--text-primary)",
            border: "var(--border-width-sm) solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
          }}
        >
          Show Tab 1
        </button>
        <button
          onClick={() => setValue(1)}
          style={{
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: value === 1 ? "var(--color-primary)" : "var(--bg-surface)",
            color: value === 1 ? "white" : "var(--text-primary)",
            border: "var(--border-width-sm) solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
          }}
        >
          Show Tab 2
        </button>
        <button
          onClick={() => setValue(2)}
          style={{
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: value === 2 ? "var(--color-primary)" : "var(--bg-surface)",
            color: value === 2 ? "white" : "var(--text-primary)",
            border: "var(--border-width-sm) solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
          }}
        >
          Show Tab 3
        </button>
      </div>

      <Tabs value={value} onChange={setValue}>
        {sampleTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
        {sampleTabs.map((tab) => (
          <TabPanel key={`panel-${tab.value}`} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

// String value tabs
export const WithStringValues = () => {
  const [value, setValue] = useState("overview");

  const stringTabs = [
    { value: "overview", label: "Overview", content: "Overview section" },
    { value: "details", label: "Details", content: "Details section" },
    { value: "config", label: "Configuration", content: "Configuration section" },
  ];

  return (
    <Tabs value={value} onChange={setValue}>
      {stringTabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
      {stringTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
};

// Comprehensive example with all features
export const Comprehensive = () => {
  const [value, setValue] = useState(0);

  const comprehensiveTabs = [
    {
      value: 0,
      label: "Dashboard",
      icon: "📊",
      badge: 3,
      content: "Welcome to your dashboard with 3 pending notifications",
    },
    {
      value: 1,
      label: "Profile",
      icon: "👤",
      content: "Manage your profile information and preferences",
    },
    {
      value: 2,
      label: "Disabled",
      icon: "🔒",
      disabled: true,
      content: "This tab is disabled",
    },
    {
      value: 3,
      label: "Settings",
      icon: "⚙️",
      content: "Configure your application settings and preferences",
    },
  ];

  return (
    <Tabs value={value} onChange={setValue} size="md" variant="centered">
      {comprehensiveTabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          icon={tab.icon}
          badge={tab.badge}
          disabled={tab.disabled}
        />
      ))}
      {comprehensiveTabs.map((tab) => (
        <TabPanel key={`panel-${tab.value}`} value={tab.value}>
          <div
            style={{
              padding: "var(--space-4)",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              marginTop: "var(--space-4)",
            }}
          >
            {tab.content}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};
