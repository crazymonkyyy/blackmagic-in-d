# What are Overload Sets

```d
--- a.d
import std;
void fizz(bool){"bool".writeln;}
--- app.d
import std;
void bar(int){"int".writeln;}
void bar(float){"float".writeln;}
alias foo=bar;
import a;
alias foo=fizz;
void foobar(alias A)(){
	A(1);
	A(13.37);
	A(true);
}
unittest{
	foobar!foo;// prints "int","float" and "bool"
}
```

What **is** `foo`, or for that matter `foobar.A`? Why does this work?

Its an overload set. (as are **ALL** symbols in D, just lets not worry about it)

Poeple who imagine a compiler being a stateless trasformation have little to say on the subject, theres a 4 paragraphs in the spec, the template book doesnt contain the phase.

But the compiler isnt a stateless abstraction (as implied by the spec) and as your tool, sharpen it. The compiler **must** compute something, whats a reasonable mental model for its behavoir?

Maybe `alias`'s are some sensable abstractions? :)

No, alias's dont even exist. :D

```d
alias foo=int;
unittest{
	pragma(msg,__traits(identifier,foo));//Error: argument `int` has no identifier
}
```

Maybe alias's are no-op's that merely redirect as they say in the spec?

No, its modifies state. ^q^

```d
void landmine()(){static assert(0);}
pragma(msg,"nothing exploded yet");
alias step=landmine!();//BOOM
```

My current best geuss is that the famous `ast` is an overload set tree and aliases. And alias is a *stateful* operation that adds to a todo list of initualizations, while returning an overload set "pointer". The walterism compiler seems to scan the tree chasing `initualizations` i.e. `!()` of a template, building up a tree compile time. 

(and also selective imports, if you dont know, look into the topic when you get a dual context error)

//todo probaly could have code here showing some parts of this take

So, what is `foo`? Well adding:

```d
foreach(A;__traits(getOverloads,mixin(__MODULE__),"foo",true)){
	__traits(fullyQualifiedName,A).writeln;
}
```

prints

```
bar
app.bar
a.fizz
```

Well thats *an* answer.

Do I understand the difference between `bar` and `app.bar`? No. I expect its buggy as hell when I play with it. The n'th `bar` seems to be the (n-1)'th function parsed, maybe, who knows; maybe the first bar has claim of a list of header its combined with. These airnt good dependable traits but I dont know of better options for more stable infomation.
