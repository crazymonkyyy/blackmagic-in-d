alias seq(T...)=T;
template appendable(discrim...){
	enum ptr_=cast(immutable(void)*)[0].ptr;
	auto poke()=>(*(cast(int*)ptr_))++;
	auto count()=>(*(cast(int*)ptr_));
	template store(int i){
	template store(T=void,T[] data=null){
		alias store=typeof(data[0]);
	}}
	template store(int i,alias A){
		alias S=store!i;
		alias store=S!A;
	}
	template append(alias A,int L=__LINE__){
		alias append=store!(poke(),A);
	}
	template append(alias A,discrim...){
		alias append=store!(poke(),A);
	}
	template opIndex(int i){
		static assert(i<count());
		alias S=store!i;
		alias opIndex=S!();
	}
	template get(int L=__LINE__){
		alias get=seq!();
		static foreach(I;0..count()){
			get=seq!(get,opIndex!I);
		}}
}
import std;
unittest{
	alias a=bar.append!int;
	alias b=bar.append!float;
	alias c=bar.append!bool;
	//static assert(is(bar.opIndex!2==bool));
	bar.get!().stringof.writeln;
}
alias bar=appendable!();
static foreach(I;0..1000){
	alias _(int i:I)=bar.append!(int,I,__LINE__);
	mixin("alias _"~I.stringof~"=_!I;");
}
unittest{
	alias a=bar.append!int;
	alias b=bar.append!float;
	alias c=bar.append!bool;
	//static assert(is(bar.opIndex!2==bool));
	//bar.get!().stringof.writeln;
}
