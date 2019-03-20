# useCollapsibleContext

useCollapsibleContext is a hook that can be used inside any child component of `CollapsibleContainer`  to gain access to its state. `Group` and `Box` components are both `CollapsibleContainers` so `useCollapsibleContext` also works inside children of these components.

## Behaviour
 - When called inside a `CollapsibleContainer` component it returns an object with the following properties:  

      | name | type |  description |
      |-----------|------------|--------|
      | `collapsed` | `boolean` | determines whether the content of the `CollapsibleContainer` is displayed or not. | 
      | `setCollapsed` | `(newValue: boolean) => void` |  sets the value of `collapsed`. |
      | `collapsible` | `boolean` | determines whether the collapser is rendered. `Collapsed` could still be set with `setCollapsed`. |


 - When called outside a `CollapsibleContainer` component it throws an error.  