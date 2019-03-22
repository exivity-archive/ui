# CollapsibleContext

The CollapsibleContext can be used inside any child component of `CollapsibleContainer` to gain access to its collapsed state.

## Components
Some components make use of a `CollapsibleContainer` so the `CollapsibleContext` is also available in those components children. All components of which the children can use the `CollapsibleContext` are:
- CollapsibleContainer
- Group
- Box

## Shape
 - When used inside a `CollapsibleContainer` component that is collapsible (this is the default but it's optional):  

      | name | type |  description |
      |-----------|------------|--------|
      | `collapsed` | `boolean` | Determines whether the content of the `CollapsibleContainer` is displayed or not. | 
      | `onCollapse` | `(newValue: boolean) => void` |  Gets run when collapser gets clicked. By default it flips the value of collapsed |  


 - When used outside a `CollapsibleContainer` component or one that isn't collapsible: `null`


