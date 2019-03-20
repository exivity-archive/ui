# useBoxContext

useBoxContext is a hook that can be used inside any child component of Box to gain access to its state.

## Behaviour
- When called inside a Box component it returns an object with the following properties:  

    | name | type |  description |
    |-----------|------------|--------|
    | `collapsed` | `boolean` | Determines whether the content of the box is displayed or not. | 
    | `setCollapsed` | `(newValue: boolean) => void` |  Sets the value of `collapsed`. |
    | `collapsible` | `boolean` | Determines wether the collapse icon is shown. When `false`, `collapsed` can still be set via context |

- When called outside a Box component it throws an error. 