---
title: rust, week 1
pinned: false
tags: 
draft: false
category: rust
type: post
---
> Just dumping it here by hand so I can learn, 99% content here taken from links below:

Ref: https://doc.rust-lang.org/rust-by-example/hello.html and https://google.github.io/comprehensive-rust/welcome-day-1.html
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

## Debug

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

## Others

`#[allow(dead_code)]` is an [attribute](https://doc.rust-lang.org/rust-by-example/attribute.html) which only applies to the module after it.
