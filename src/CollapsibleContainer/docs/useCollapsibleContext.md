# useCollapsibleContext

useCollapsibleContext is a hook that can be used inside any child component of `CollapsibleContainer` to gain access to its collapsed state.

## Components
Some components make use of a `CollapsibleContainer` so `useCollapsibleContext` also works in those components children. All components of which the children can use `useCollapsibleContext` are:
- [CollapsibleContainer](http://localhost:9009/?path=/story/molecules-collapsiblecontainer--default)
- [Group](http://localhost:9009/?path=/story/molecules-group--default) 
- [Box](http://localhost:9009/?path=/story/molecules-box--default)

## Behaviour
 - When called inside a `CollapsibleContainer` component it returns an object with the following properties:  

      | name | type |  description |
      |-----------|------------|--------|
      | `collapsed` | `boolean` | Determines whether the content of the `CollapsibleContainer` is displayed or not. | 
      | `setCollapsed` | `(newValue: boolean) => void` |  Sets the value of `collapsed`. |
      | `collapsible` | `boolean` | Determines whether the collapser is rendered. `collapsed` could still be set with `setCollapsed`. |


 - When called outside a `CollapsibleContainer` component it throws an error.  