# Explict Overload Sets

With (hopefully) an understanding of how overload sets one of the most fundmental concepts in the compiler. What do I suggest you do with it?

Specailization, lots and lots of specailization.

```d
int foo(T:int)()=>1;
int foo(T:float)()=>2;
static assert(foo!float==2);
```

Foo when initualized can look up a value here. But remember last chapter, foo can be passed around and *everything* is an overload set; these could easily be types, functions, *or other templates*.

But most realisticly, an hacky "ct type array":

```d
alias foo(int I:0)=int;
alias foo(int I:1)=float;
static foreach(I;0..2){
	pragma(msg,foo!I.stringof);
}
```

---

Ive had an argument with kap resently(basicly nearly a fist fight >:( ) about the radical importance of templates, the anti-template extermist claimed "(T) > (int N,T)" if you can believe it. (I couldnt I was shocked by the ignorence) 

He pointed at his own code: https://github.com/Kapendev/joka/blob/main/source/joka/math.d

```d
alias BVec2 = GVec2!byte;   /// A 2D vector using bytes.
alias IVec2 = GVec2!int;    /// A 2D vector using ints.
alias UVec2 = GVec2!uint;   /// A 2D vector using uints.
alias Vec2 = GVec2!float;   /// A 2D vector using floats.
alias DVec2 = GVec2!double; /// A 2D vector using doubles.

alias BVec3 = GVec3!byte;   /// A 3D vector using bytes.
...

alias BVec4 = GVec4!byte;   /// A 4D vector using bytes.
...

/// A generic 2D vector.
struct GVec2(T) {
	T x = 0; /// The X component of the vector.
	T y = 0; /// The Y component of the vector.
	...

/// A generic 3D vector.
struct GVec3(T) {
	T x = 0; /// The X component of the vector.
	T y = 0; /// The Y component of the vector.
	T z = 0; /// The Z component of the vector.
	...
...
```

I tried, in vain, to explain that he should just define all three reasonable ways to access the types.... but I disgess.

He seemed to think it was nessery to define a super vec template in some awful hellscape of meta programming and 500 lines of hard to untangle code. This isnt true. You need to define a single `overload set` but it is not nessery to make that a single template.

Consider this rewrite of the headers:

```d
/// A generic 2D vector.
alias GVec2(T=float)=GVec!(2,T);
struct GVec(int N:2,T) {
	T x = 0; /// The X component of the vector.
	T y = 0; /// The Y component of the vector.
}
/// A generic 3D vector.
alias GVec3(T=float)=GVec!(3,T);
struct GVec(int N:3,T) {
	T x = 0; /// The X component of the vector.
	T y = 0; /// The Y component of the vector.
	T z = 0; /// The Z component of the vector.
}
alias GVec4(T=float)=GVec!(4,T);
struct GVec(int N:4,T) {
	T x = 0; /// The X component of the vector.
	T y = 0; /// The Y component of the vector.
	T z = 0; /// The Z component of the vector.
	T w = 0; /// The W component of the vector.
}
```

Suddenly `GVec` is one overload set and (in thoery) doesnt change any of his other code.

This will allow users to define meta programming over the vec's:

```d
void print(int N,T)(GVec!(N,T) bar){
	import std;
	writeln("this is a vector of ",N," ",T.stringof);
	static foreach(C;"xyzw"[0..N]){
		writeln(C,":",mixin("bar."~C));
}}
unittest{
	IVec3(1,4,7).print;
	DVec4(2,6,0,0).print;
}
```

```
this is a vector of 3 int
x:1
y:4
z:7
this is a vector of 4 double
x:2
y:6
z:0
w:0
```

and we could keep going :D

[code](overloadgist.d)
