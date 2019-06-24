# useSnapEdgeToParent

useSnapEdgeToParent is a hook that can be used to make a component avoid defined edges.

## Example

 `const [refs, positioning, handleLayout] = useSnapEdgeToParent<TargetElement, ParentElement, ContainerElement>(breakDistances, initialLayout)`

## Parameters

  | name | type | required | description |
  |-----------|------------|--------|
  | `TargetElement` | `type parameter` | `defaults to HTMLDivElement` | Determines what type the target ref should be.  | 
  | `ParentElement` | `type parameter` | `defaults to HTMLDivElement` | Determines what type the parent ref should be.  |
  | `ContainerElement` | `type parameter` | `defaults to HTMLDivElement` | Determines what type the container ref should be.  |
  | `breakDistances` | `number | { horizontal: number, vertical: number }` | `yes` | Used to specify at what distance from the edges the component should change position  |
  | `initialLayout` | `{ horizontal: 'left' | 'right' | 'auto', vertical: 'top' | 'bottom' | 'auto' }` | `defaults to { horizontal: 'auto', vertical: 'auto' }` | Can be used to specify a static position for one or both dimensions |


## Return
  
  | name | type  | description |
  |-----------|------------|--------|
  | `refs` | `{ target: RefObject<TargetElement>, parent: RefObject<ParentElement>, container: RefObject<ContainerElement> }` | An object containing the refs that should be given to the components you want to give this functionality. | 
  | `positioning` | `{ horizontal: 'left' | 'right', vertical: 'top' | 'bottom' }` | The resulting positioning after calculation.  |
  | `handleLayout` | `() => void` | Function that recalculates the positioning on call.  |


## Refs

  | name | description |
  |-----------|------------|--------|
  | `target` | Should be given to the element that should avoid the edges. | 
  | `parent` | Should be given to the element that `target` should act relative to.  |
  | `container` | Should be given to containing component if its edges should be used. If this ref is not given the target element avoids the edges of the window  |