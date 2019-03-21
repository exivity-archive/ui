# useOutsideClickListener

Use this hook to attach an outside click listener to a div node.

## Example

 `const toBeAttachedRef = useOutsideClickListener(onOutsideClick, node)`

## Parameters

  | name | type | Required | description |
  |-----------|------------|--------|--------|
  | `onOutsideClick` | `callback` | `yes` | Callback which is called when there is a click event outside the scope of node.  | 
  | `node` | `HTMLDivElement` | `no` |The node which you want to attach to. Instead, you can also use the returned ref to attach to a div. |

## Return value
Returns a ref which should be a attached to a HTMLDivElement.