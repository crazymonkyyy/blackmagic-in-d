# Bad turing-completeness

//todo rant about how "reductions" in computer science are often "expansions", a round trip conversion from sat to minesweeper will be much much larger

In the fundmentals of computer science is the concept of a "reduction", a turing machine can simulate lamda calculous, lamda calculous can emulate addition, and lamda calculous can run a turing machine emulator.

It should be noted this is a terrible name; a "reduction" is a drastic expansion to compute. It important for non-constructive math if a machine exists that you cant prove halts, its less so for you throwing together a 10 line script.

Lisp doesnt do chruch numerals, they use op code; so even that crowd has limits to the level of impractically they will tolerate. I believe a chruch numeral muliplication is O(nm^2) to actaully compute, while if you squint and ignore the most autist of programmers, muliplcation of ints is const of just a few cycles.

Templates for a genertic programmer can do anything, because it has enough chruch-ness to impliment the text replacement turing compleness thoery. **BUT** thats a truely awful method of computation. I believe D is far in the lead for simplifying and actaully compiling templates. *Template metaprogramming is a chruch machine that generates turing machines*. Even the safetyphiles will praise `alias reassignment` for being a massive speed up, its insanity it took so long it seems to me to be something like not requiring chruch numerals in lisp, before any list in template land would be of O(n^2) complexity before you even started. **This book will cover imparitive template computation**, these are bugs, but remember, how a chruch machine emulates a turing machine.

**syntax sugar has semantic meaning**
