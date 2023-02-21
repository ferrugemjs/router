# Router to FerrugemJS

![Ferrugem router logo](/assets/img/router-fjs.png) 


**A basic router implementation to [FerrugemJS](https://github.com/ferrugemjs/library).**

This is a basic implementation of routes for "Ferrugemjs", please feel free to do merge requests and improve this router or create your own.
This router is implemented using [page.js](https://visionmedia.github.io/page.js/).

[![NPM](https://nodei.co/npm/@ferrugemjs/router.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@ferrugemjs/router/)

#### how to start:
clone
[skeleton-typescript](https://github.com/ferrugemjs/skeleton-typescript) (recomended way)

#### individual install

npm install @ferrugemjs/router --save

in config.js.

"@ferrugemjs/router":"node_modules/@ferrugemjs/router/dist"

#### Usage

eg. routes-app.html file

``` xml
<template>
    <require from="@ferrugemjs/router as rt" type="namespace" />
    <div>
        <rt:router-view routes="${this.routes}" />
    </div>
</template>
```

eg. routes-app.ts file

``` ts
import { Route } from "@ferrugemjs/router";

const ModuleA = () => import("./module-a.html");
const ModuleB = () => import("./module-b.html");
const ModuleC = () => import("./module-c.html");
const ModuleNotFound = () => import("./not-found.html");

export class Routes {
    public routes: Route[] = [
        {
            path: "/module-a",
            view: ModuleA,
        },
        {
            path: "/module-b/:name",
            view: ModuleB,
        },
        {
            path: "module-c/:id/:name",
            view: MuduleC,
        },
        {
            path: "/redirect-test",
            redirectTo: "/module-a",
        },
        {
            path: "/not-found",
            view: ModuleNotFound,
        },
        {
            path: "*",
            redirectTo: "/not-found",
        },
    ];
}

```


#### hashbang

``` xml
<template>
    <require from="@ferrugemjs/router as rt" type="namespace" />
    <div>
        <rt:router-view routes="${this.routes}" hashbang="true"/>
    </div>
</template>
```

#### redirect

``` xml
<template>
  <require from="@ferrugemjs/router as rt" type="namespace" />
  <rt:router-redirect to="/list-modules" />
</template>
```

#### redirect with timeout

``` xml
<template>
  <require from="@ferrugemjs/router as rt" type="namespace" />
    <rt:router-redirect 
      path="/list-modules"
      timeout="4000"
    />
</template>
```

#### base path

``` xml
<template>
    <require from="@ferrugemjs/router as rt" type="namespace" />
    <div>
        <rt:router-view routes="${this.routes}" base="/home/"/>
    </div>
</template>
```

#### redirect from a module

``` ts
import { redirect, Route } from "@ferrugemjs/router";

....

private redirectTest() {
    redirect("/module-a/manual_redirect");
}
```