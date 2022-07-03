---
    title: Input floating label
    description: Making a floating label on input without using javascript
---

# Input floating label

In many cases we tend to use javascript to make easy things. But what if I told you that you don't have to use any javascript to make floating label on *input* tag.

## Css

### Placeholder shown

There is a [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) called *:placeholder-shown* which can be used to get information about our input state. In our case we can just 

**Code**
```css
input:placeholder-shown {
    border: 2px solid red;
}
```

**Result**
<p><input id="example-1" placeholder="placeholder" /></p>

<style>
#example-1 {
    border-width: 2px;
}
#example-1:placeholder-shown {
    border: 2px solid red;
}
</style>

### Plus selector (+)
I'm sure a lot of you familiar with this selector. This selector selects first element immediately after our element

**Code**
```css
input:placeholder-shown + .placeholder {
    color: red;
}
```

**Result**
<p>
    <div id="example-2">
        <input placeholder="placeholder"/>
        <div class="placeholder">placeholder</div>
    </div>
</p>
<style>
#example-2 input:placeholder-shown + .placeholder {
    color: red;
}
</style>

### Not pseudoclass
Lastly we need to understand what [:not()](https://developer.mozilla.org/en-US/docs/Web/CSS/:not) pseudo class means. It's simply selects all element that do not match provided selector

## Let it fly
Combining all the previous steps we could compose our wierdly looking selector that will make our input placeholder fly

**Code**
```html
<div class="input-container">
    <input placeholder="placeholder">
    <div class="placeholder">Shown placeholder</div>
</div>
```

```css
.input-container {
    position: relative;
}
.input-container input::placeholder {
    color: transparent;
    user-select: none;
}
.input-container input {
    padding: 18px 10px 10px;
}
.input-container .placeholder {
    position: absolute;
    user-select: none;
    pointer-events: none;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left;
    transition: .3s;
}
.input-container input:focus + .placeholder,
.input-container :not(input:placeholder-shown) + .placeholder {
    top: 1px;
    left: 10px;
    transform: scale(.5);
}
```

**Result**
<div id="example-4" class="input-container">
    <input placeholder="placeholder">
    <div class="placeholder">Shown placeholder</div>
</div>
<style>
#example-4 {
    position: relative;
}
#example-4 input::placeholder {
    color: transparent;
    user-select: none;
}
#example-4 input {
    padding: 18px 10px 10px;
}
#example-4 .placeholder {
    position: absolute;
    user-select: none;
    pointer-events: none;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left;
    transition: .3s;
}
#example-4 input:focus + .placeholder,
#example-4 :not(input:placeholder-shown) + .placeholder {
    top: 1px;
    left: 10px;
    transform: scale(.5);
}
</style>

As you can see floating placeholder floats unless input is empty.

Hope it was helpful. In the next chapter I will show you my thoughts on form building