
# AutoLayout

A general purpose component to help make layouts easier.

## Usage

```jsx
    <Block height={1000} width={1600} bg='lightgray'>
      <AutoLayout height='100%' spacing={[1,1,2]} wrapInWidgets>
        <Column width={300}>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column>
          <Heading>
            Details
          </Heading>
        </Column>
      </AutoLayout>
    </Block>
```

## Props

`AutoLayout and Column` use some props from [styled-system](https://styled-system.com/).

<!-- props(AutoLayout) with styled-system -->
<!-- props(Column) with styled-system -->
