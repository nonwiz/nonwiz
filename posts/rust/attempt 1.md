---
title: rust, attempt 1
pinned: false
tags: 
draft: false
category: rust
type: post
---
> Just dumping it here by hand so I can learn, 99% content here taken from links below:

Ref: [Rust by example](https://doc.rust-lang.org/rust-by-example/hello.html) , [Comprehensive rust](https://google.github.io/comprehensive-rust/welcome-day-1.html) , [Rust Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2024)
# Hello world

```rust
fn main() {
	// println!, compile-time code generator before compilation.
	println!("Hello world");
}
```

```bash
# compile this file in terminal by running:
rustc main.rs
```

## Comments

```rust
// singleline comment
/* block level comment */

/// Generate library docs for following item.
//! Generate library docs for enclosing item.
```
E.g: https://doc.rust-lang.org/rust-by-example/meta/doc.html


## Formatted print

Defined macros from `std::fmt`.

- `format!`: write formatted text to [`String`](https://doc.rust-lang.org/rust-by-example/std/str.html)
- `print!`: same as `format!` but the text is printed to the console (io::stdout).
- `println!`: same as `print!` but a newline is appended.
- `eprint!`: same as `print!` but the text is printed to the standard error (io::stderr).
- `eprintln!`: same as `eprint!` but a newline is appended.

### Regular arg
```rust
println!("day {}", 1);
```

### Decimal / Precision
```rust
let pi = 3.1415292;
println!("pi is {pi:.3}")
// 3.142
```

### Diff formatting
```rust
println!("Base 10: {}", 2); // 2
println!("Base 2: {:b}", 2); // 10 - binary
// b: binary base 2
// o: octal base 8
// x: hexadecimal base 16
```

### Positional args
```rust
println!(
"{0}: what's up? {1} replied, 'Nothing much, what about you? {0}'", 
"John", "Susan"
)
```

### Named args
```rust
println!("{person1}: what's up? {person2} replied, 'Nothing much, what about you? {person1}'", person1="John", person2="Susan")
```

### Pad start
```rust
println!("{:>10}", "John")
// Result, min width of 10 characters including text within:
//    John 

println!("{name:>5}", name="John")
//  John
```
### Pad end
```rust
println!("{10}")
```

### Pad with placeholder
```rust
println!("{balance:0>5}", balance=6)
println!("{balance:X<5}", balance=7)

// 000006
// 7XXXXX
```

### Named args
```rust
println!("{balance:Y<width$}", balance = 7, width = 2);
// 7Y

// or 
let width = 2;
println!("{balance:Y<width$}")
```

### defined types require fmt::Display
```rust
println!("Custom {}", Structure(3))
```

## formatting / Display

By default, `std::fmt` only available for the standard implementation, the rest will need to `implement` it.  Start debugging in `println` by using `{value:?}`.

```rust
// Wouldn't be able to print this one by default - custom type
struct UnPrintable(i32);

// Using default derive method

#[derive(Debug)]
struct Computer<'a> {
    name: &'a str,
    model: u32,
}

fn main() {
    let zephyrus = Computer {
        name: "Test",
        model: 2014,
    };
    // Debug Normal print
    println!("{zephyrus:?}");
    // Debug Pretty print
    println!("{zephyrus:#?}");
}
```
> The & indicates a **reference**, meaning Computer does not own the string but only borrows it. The 'a is a **lifetime parameter**, ensuring that the reference to the string remains valid for at least the lifetime 'a.

### implementing display for custom type
```rust
use std::fmt; // Import `fmt`

// A structure holding two numbers. `Debug` will be derived so the results can
// be contrasted with `Display`.
#[derive(Debug)]
struct MinMax(i64, i64);

// Implement `Display` for `MinMax`.
impl fmt::Display for MinMax {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Use `self.number` to refer to each positional data point.
        write!(f, "({}, {})", self.0, self.1)
    }
}
```

### implementing display for nameable field
```rust
// Define a structure where the fields are nameable for comparison.
#[derive(Debug)]
struct Point2D {
    x: f64,
    y: f64,
}

// Similarly, implement `Display` for `Point2D`.
impl fmt::Display for Point2D {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // Customize so only `x` and `y` are denoted.
        write!(f, "x: {}, y: {}", self.x, self.y)
    }
}
```

### Exercise
```rust
use std::fmt;

#[derive(Debug)]
struct Complex {
    real: f32,
    imag: f32,
}

impl fmt::Display for Complex {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{0} + {1}i", self.real, self.imag)
    }
}

fn main() {
    let c1 = Complex {
        real: 3.3,
        imag: 7.2,
    };
    println!("Print output:\n{c1}");
    println!("\nDebug output:\n{c1:#?}");
}

/*
	Print output:
	3.3 + 7.2i
	
	Debug output:
	Complex {
	    real: 3.3,
	    imag: 7.2,
	}
*/
```

## Debug

```rust
fn test() -> i32 {
    2
}

fn main() {
    let y = 10;
    println!("Hello, world!");
    dbg!(test(), dbg!(y) + 10);
}
```
## Others

`#[allow(dead_code)]` is an [attribute](https://doc.rust-lang.org/rust-by-example/attribute.html) which only applies to the module after it.

## Types and values

By default, variable is immutable, `mut` to let it mutable.

### Values

Built-in types and syntax for literal values

|                        | Types                          | Literals               |
| ---------------------- | ------------------------------ | ---------------------- |
| Signed integers        | i8, i16, i32, i64, i128, isize | -10, 0, 1_000, 123_i64 |
| Unsigned integers      | u8, u16, u32, u64, u128, usize | 0, 123, 10_u16         |
| Floating point numbers | f32, f64                       | 3.14, -10.0e20, 2_f32  |
| Unicode scalar values  | char                           | 'a', '$', '∞'          |
| Booleans               | bool                           | true, false            |
Types have widths as follows:
- `iN`, `uN`, `fN` are *N* bits wide,
- `isize` and `usize` are the width of a pointer,
- `char` is 32 bits wide,
- `bool` is 8 bits wide.

## Assert EQ
```rust
let x = 3.14;
let y = 10;
assert_eq!(x, y)
// error: expected floating-point number, found interger.
```


# Controls
## if Expressions

```rust
fn fibo(num: u32) -> u32 {
    if num < 2 {
        return num;
    }
    return fibo(num - 1) + fibo(num - 2);
}
```

```rust
fn main() {
	let x = 5;
	let size = if x > 5 { "big" } : { "small" };
	dbg!(size);
	// size = 'small'
}
```

## match or switch case

```rust
	let y = 11;
    let size_v2 = match y {
		1 => "1",
		2 => "2",
        5 => {
            println!("is eq 5");
            "is 5"
        }
        10 => {
            println!("is 10");
            "is 10"
        }
        _ => {
            println!("not match");
            ""
        }
    };
```

## loops
### while loop
```rust
fn main() {
    let mut i: i8 = 1;
    while i < 10 {
        i += 1;
    }
    dbg!(i);
}
```

### for loop
```rust
fn main() {
    for x in 1..10 {
        println!("{x:>width$}", width = x)
    }
	
    for x in [1, 3, 5] {
        println!("{x}")
    }
}
```

### forever loop
```rust
loop {
 // alway run until "break"
}
```

### assigned or label breaks
```rust
fn main() {
    let s = [[5, 6, 7], [8, 9, 10], [21, 15, 32]];
    let mut elements_searched = 0;
    let target_value = 10;
    'outer: for i in 0..=2 {
        for j in 0..=2 {
            elements_searched += 1;
            if s[i][j] == target_value {
                break 'outer;
            }
        }
    }
    dbg!(elements_searched);
}
```

# Macros

Macros are expanded into Rust code during compilation, and can take a variable number of arguments. They are distinguished by a `!` at the end. The Rust standard library includes an assortment of useful macros.

- `println!(format, ..)` prints a line to standard output, applying formatting described in [`std::fmt`](https://doc.rust-lang.org/std/fmt/index.html).
- `format!(format, ..)` works just like `println!` but returns the result as a string.
- `dbg!(expression)` logs the value of the expression and returns it.
- `todo!()` marks a bit of code as not-yet-implemented. If executed, it will panic.
- `assert!`
- `unreachable!`
- `eprintln!`
- 



