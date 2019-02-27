import { AnyObject } from "./types";

export const reassignNestedProp = (obj: AnyObject<any>, history: string[], value: any) => {  
  const key = history.pop();
  for (const property of history) obj = obj[property];
  obj[key!] = value;
}