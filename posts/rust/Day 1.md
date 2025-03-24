---
title: Day 1
pinned: false
tags: 
draft: false
category: rust
type: post
---
> 99% of the content below are taken from: https://doc.rust-lang.org/rust-by-example/hello.html. I'm just writing it here so I can get familiar with it :).
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










