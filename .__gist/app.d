
alias BVec2 = GVec2!byte;   /// A 2D vector using bytes.
alias IVec2 = GVec2!int;    /// A 2D vector using ints.
alias UVec2 = GVec2!uint;   /// A 2D vector using uints.
alias Vec2 = GVec2!float;   /// A 2D vector using floats.
alias DVec2 = GVec2!double; /// A 2D vector using doubles.

alias BVec3 = GVec3!byte;   /// A 3D vector using bytes.
alias IVec3 = GVec3!int;    /// A 3D vector using ints.
alias UVec3 = GVec3!uint;   /// A 3D vector using uints.
alias Vec3 = GVec3!float;   /// A 3D vector using floats.
alias DVec3 = GVec3!double; /// A 3D vector using doubles.

alias BVec4 = GVec4!byte;   /// A 4D vector using bytes.
alias IVec4 = GVec4!int;    /// A 4D vector using ints.
alias UVec4 = GVec4!uint;   /// A 4D vector using uints.
alias Vec4 = GVec4!float;   /// A 4D vector using floats.
alias DVec4 = GVec4!double; /// A 4D vector using doubles.

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