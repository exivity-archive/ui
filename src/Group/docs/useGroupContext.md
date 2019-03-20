# useGroupContext

useGroupContext is a hook that can be used inside any child component of Group to gain access to its state.

## Behaviour
 - When called inside a Group component it returns an object with the following properties:  

      | name | type |  description |
      |-----------|------------|--------|
      | `collapsed` | `boolean` | determines whether the content of the group is displayed or not. | 
      | `toggleCollapsed` | `() => void` |  flips the value of `collapsed`. |


 - When called outside a Group component it throws an error.  