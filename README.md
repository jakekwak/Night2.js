# Night2.js

[night.js](https://github.com/jb1905/night.js) 와 [darkmode.js](https://github.com/sandoche/Darkmode.js) 를 조합해서 만든 장소와 시간(sunrise, sunset)에 따라 다크모드로 변경하기


## Getting Started
**Connect using script tag in HTML:**
```html
<script src="../lib/night2.js"></script>
```

**&bull; Vanilla JavaScript e.g:**
```js
      const night = new Night({
        defaultId: 'darkmode',
        lightClass: 'light',
        darkClass: 'dark',
        auto: true,
        onToggle() {
          console.log('onToggle')
        },
        onAuto() {

        },
        onLight() {

        },
        onDark() {},
      });
```
> `<div id="darkmode" class="something">` 에
> dark mode인 경우엔 `<div id="darkmode" class="something dark">`로
> light mode인 경우엔 `<div id="darkmode" class="something light">`로 됨
> > lightClass: '' 인 경우에는 `<div id="darkmode" class="something">`로

## Functions
**&bull; Switch between light and dark mode:**
```js
night.toggle();
```

**• Switch mode automatically (based on time, location and sun position):**
```js
night.auto();
```

**• Reset localStorage data:**
```js
night.reset();
```

## Options
Name | Type | Default | Description | Available options
-|-|-|-|-
**lightClass** | string | ` ` | Class added to ID when light mode is active | Name of the class
**darkClass** | string | `dark` | Class added to ID when dark mode is active | Name of the class
**cache** | boolean | `true` | Cache location coordinates in local storage for one day | `true` (enable), `false` (disable)
**cacheClear** | boolean | `true` | Clear location coordinates in local storage everyday at midnight | `true` (enable), `false` (disable)
**auto** | boolean | `true` | Enable smart switch on script init | `true` (enable), `false` (disable)
**onAuto** | function | `null` | Callback on smart switch | `() => { // code }`
**onLight** | function | `null` | Callback when dark mode is disabled | `() => { // code }`
**onDark** | function | `null` | Callback when dark mode is enabled | `() => { // code }`
**onToggle** | function | `null` | Callback on dark/light mode toggle | `() => { // code }`
**onDenied** | function | `null` | Callback on geolocation permission denied | `() => { // code }`
**onCacheClear** | function | `null` | Callback when location coordinates and midnight time in local storage cleared | `() => { // code }`
**onReset** | function | `null` | Callback on localStorage reset | `() => { // code }`

## Events
`smartDark` event will output sun position times and user geolocation latitude & longitude

`smartDarkError` event will output message when permission to geolocation is denied
