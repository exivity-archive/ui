
# AutoLayout

A general purpose component to help make layouts easier.

## Usage

```jsx
    <Block height={280} width={800} bg='lightgray'>
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
        <Column width={300} newRow/>
        <Column/>
      </AutoLayout>
    </Block>
```

## Props

`AutoLayout and Column` use some props from [styled-system](https://styled-system.com/).

<!-- props(AutoLayout) -->
<!-- props(Column) -->
