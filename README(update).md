#  version: 0.1.9

## labelRender 

```typescript
//old 
type labelRender =(label:string|number) => ReactNode,

//new 
type params =   {
    label:string|number,
    field:string|number,
    checked:boolean,
    disabled?:boolean
}

type labelRender = ({
    label,
    field,
    checked,
    disabled
}) => ReactNode,
```

## checkbox 

```javascript

size  "medium"  => "small"

child pl  8 => 2

```

#  version: 0.2.1

fix: Trigger onChange multiple times when canceling all
修复全部取消时触发多次onChange