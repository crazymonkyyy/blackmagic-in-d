# tg's counter


```d
enum counter=cast(immutable(void)*)[0].ptr;
auto getcount()=>(*(cast(int*)counter));
auto count()=>(*(cast(int*)counter))++;
```
