# Input

A  input.

## Usage

```jsx
() => {
    const [value, onChange] = useState('Foo Bar')
    return <Input value={value} onChange={onChange} />
}
```

## Props

`Input` overrides the default onChange attribute for easy access to the target value.

<!-- props(Input) with onChange -->