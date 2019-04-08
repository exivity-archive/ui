# Section

A section renders a content block of with a default margin around it. The first/last
siblings have their top/bottom margin removed.

Use `globalSectionSpacing` exported from _utils/styled/index.ts_ to add this behaviour to other
components, or use `styled(Section)`.

Various components already inherit from this component or use `globalSectionSpacing`, e.g. _Paragraph_, _List_, _Heading_.

## Usage

```jsx
<>
  <Section>
    <Block bg='red' p={2}>
      <Text color='white'>I have a bottom margin.</Text>
    </Block>
  </Section>
  <Section>
    <Block bg='yellow' p={2}>
      <Text>I have a top and bottom margin.</Text>
    </Block>
  </Section>
  <Section>
    <Block bg='green' p={2}>
      <Text color='white'>I have a top margin.</Text>
    </Block>
  </Section>
</>
```

The margin can be removed with the `noMargin` prop.

```jsx
<>
  <Heading noMargin>I don't like margins.</Heading>
  <Paragraph noMargin>I love it.</Paragraph>
</>
```

## Props

<!-- props(Section) -->
