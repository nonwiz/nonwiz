---
title: 
pinned: false
tags: 
draft: true
category: post
type: post
date:
---
```rust
/*
 * Grasshopper - Grade book
 * Complete the function so that
 * it finds the average of the three scores passed to it
 * and returns the letter value associated with that grade.
 * 90 <= score <= 100: 'A'
 * 80 <= score < 90: 'B'
 * 70 <= score < 80: 'C'
 * 60 <= score < 70: 'D'
 * 0 <= score < 60: 'F'
 *
*/
fn get_grade(s1: u8, s2: u8, s3: u8) -> char {
    let avg = (s1 + s2 + s3) / 3;
    match avg {
        num if num >= 90 => 'A',
        num if num >= 80 => 'B',
        num if num >= 70 => 'C',
        num if num >= 60 => 'D',
        _ => 'F',
    }
}
```

## solution

Using range match without extra variable binding is faster to read and better compile-time guarantees.

```rust
fn get_grade(s1: u16, s2: u16, s3: u16) -> char {
    match (s1 + s2 + s3) / 3 {
        90..=100 => 'A',
        80..=89 => 'B',
        70..=79 => 'C',
        60..=69 => 'D',
        0..=59 => 'F',
        _ => unreachable!()
    }
}
```

