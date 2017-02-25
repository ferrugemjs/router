#Router to FerrugemJS

![Ferrugem router logo](/assets/img/router-fjs.png) 


**A basic router implementation to [Ferrugem](https://github.com/ferrugemjs/library).**

This is a basic implementation of routes for "Ferrugemjs", please feel free to do merge requests and improve this router or create your own.
This router is implemented using "page.js".

####how to start:
clone
[skeleton-typescript](https://github.com/ferrugemjs/skeleton-typescript) (recomended way)

####individual install

jspm install npm:ferrugemjs-router

####Usage

eg. init-app.html file

``` html
<template no-view-model="true">
  <require from="ferrugemjs-router as rt" type="namespace"/>
  <div>
    <h1>Router tests</h1>
    <p>
      <a href="/list-modules">modules</a>
    </p>
    <p>
      <a href="/module-a/1">module-a</a>
    </p>
    <p>
      <a href="/module-b/2">module-b</a>
    </p>
    <p>
      <a href="/module-b/10/ops">change module-b name and id</a>
    </p>    
    <rt:router-view>
      <route path="/list-modules" view-model="apps/module-list"/>
      <route path="/module-a/:id" view-model="apps/module-a"/>
      <route path="/module-b/:id" view-model="apps/module-b"/>
      <route path="/module-b/:id/:name" view-model="apps/module-b"/>
    </rt:router-view>   
  </div>
</template>
```