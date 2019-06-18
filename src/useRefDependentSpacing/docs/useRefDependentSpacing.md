# useRefDependentSpacing

useRefDependentSpacing is a hook that can be used to make a CSS spacing expression based that is dependent on another component's ref.
For example: 
  "I have a component that I want to position absolutely in another component. 
  To avoid overlapping of content I want to give the containing component some padding.
  I want this padding to be dependent on the width of the absolutely positioned component"

## Example

 `const [spacing, ref] = useRefDependentSpacing<RefElement>({ baseSpacing, nodeAccessor })`

## Parameters

  | name | type | required | description |
  |-----------|------------|--------|
  | `RefElement` | `type parameter` | `defaults to HTMLElement` | Determines what type the target ref should be.  | 
  | `baseSpacing` | `number | string` | `defaults to 0` | Give the spacing a base value  |
  | `nodeAccessor` | `(node: RefElement | null) => string | number | undefined` | `yes` | Gets the node as a parameter. Used to derive the spacing |

## Return
  
  | name | type  | description |
  |-----------|------------|--------|
  | `spacing` | `string` | result of adding the returned value of the nodeAccessor and the baseSpacing in a CSS Calc expression (`calc(20px + 50%)` for instance). | 
  | `ref` | `RefObject<RefElement>` | The ref to put on the element of which you want the node to be available in the nodeAccessor  |

## Usage

```
const [spacing, ref] = useRefDependentSpacing<HTMLDivElement>({
  baseSpacing: 20, 
  nodeAccessor: (node) => {
    if(node !== null) {
      return node.getClientBoundingRect().width
    }
  }
})

<Component ref={ref}/>
<DependentComponent style={{ width: spacing }}>

```