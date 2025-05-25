---
title: 
pinned: false
tags: 
draft: true
category: post
type: post
date:
---

## attempt 1
```rust
/**
 * Timmy & Sarah think they are in love,
 * but around where they live,
 * they will only know once they pick a flower each.
 * If one of the flowers has an even number of petals
 * and the other has an odd number of petals it means they are in love.
 *
 * Write a function that will take number of petals of each flower
 * and return true if they are in love and false if they aren't.
 */
fn lovefunc(flower1: u16, flower2: u16) -> bool {
    let is_f1_even_f2_odd = flower1 % 2 == 0 && flower2 % 2 != 0;
    let is_f2_even_f1_odd = flower2 % 2 == 0 && flower1 % 2 != 0;

    if is_f1_even_f2_odd || is_f2_even_f1_odd {
        println!("Yes, they are in love.");
        return true;
    }
    println!("Nope, they are not in love.");
    false
}

fn main() {
    lovefunc(14, 14);
}
```

### alternative

```rust
fn lovefunc(flower1: u16, flower2: u16) -> bool {
	flower1 % 2 != flower2 % 2;
}

// checking if exactly one of them is odd number.
fn lovefunc(flower1: u16, flower2: u16) -> bool {
	(flower1 + flower2) % 2 == 1;
}

// checking for parity instead
fn lovefunc(flower1: u16, flower2: u16) -> bool {
    (flower1 ^ flower2) & 1 == 1
}

```