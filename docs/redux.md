# Redux

## `useSelector()`

> Whenever you use useSelector(), use IRootState interface from @Redux/reducers.
> Whatever you add in reducers will be combined here. Follow code below

```js
import { IRootState } from "@Redux/reducers";
//.....

const MyComponent = () => {
    const {
        dogs
    } = useSelector((state: IRootState) => state.animals);

    return (
        ...
    )
}
```

NOTE: In case your component just need a property of state. Just use
