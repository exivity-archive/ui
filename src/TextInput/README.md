# TextInput

A text input.

## Usage

```jsx
() => {
    const [value, onChange] = useState('Foo Bar')
    return <TextInput value={value} onChange={onChange} />
}
```

## Props

`TextInput` overrides the default onChange attribute for easy access to the target value.

<!-- props(TextInput) with onChange -->
