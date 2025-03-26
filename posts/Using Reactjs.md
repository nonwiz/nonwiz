---
draft: true
---
- JSX or TSX
- JS: Javascript, TS: Typescript

## When create HTML
```
<html>
<head>
</head>
<body>
<h1> Page 1 </h1>
</body>
</html>
```

## index.html
```
<html>
<head>
</head>
<body>
<h1 className="text-red"> Page 1 </h1>
<main id="react-app"></main>
<script src="./app.js" />
</body>
</html>
```

What's the diff component vs javascript function?

## Different with normal html

1. Self closing tag must be explicit like img, input
2. `class` must name as `className`
3. style property must written as camelCase property

## Conditional Render
## Rending List of Component
1. Always have key property
2. 

```js
products.map(p => <li>{p.title + "_" + p.id}</li>)
[
 <li>Cabbage_1</li>,
 <li>Garlic_2</li>,
 <li>Apple_3</li>
]
```