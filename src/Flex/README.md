# Flex

A general purpose component to help make layouts easier.

## Usage

```jsx
<Flex alignItems='center'>
  <Flex.Item paddingRight={1}>
    <Text>Watch out for this...</Text>
  </Flex.Item>
  <Flex.Item>
    <Heading>Bumaye!</Heading>
  </Flex.Item>
</Flex>
```

## Props

Both `Flex` and `Flex.Item` inherit all props from `Block`.

### Flex

```
direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
```

### Flex.Item

```
order?: string | number
grow?: string | number
shrink?: string | number
basis?: string | number
alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
```
