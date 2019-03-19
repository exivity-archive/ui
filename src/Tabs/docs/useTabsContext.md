# useTabsContext

useTabsContext is a hook that can be used inside any child component of Tabs to gain access to its state.  

## Behaviour
- When called inside a Tabs component it returns an object with the following properties:  

    | name | type |  description |  
    |-----------|------------|--------|  
    | `activeIndex` | `number` | determines which tab is opened. |   
    | `setActiveIndex` | `(newActiveIndex: number) => void` |  sets the value of `activeIndex`. |  


- When called outside a Tabs component it throws an error.  