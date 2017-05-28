[![Build Status](https://travis-ci.org/ajuste/jaune-env.svg?branch=master)](https://travis-ci.org/ajuste/jaune-env)
[![Coverage Status](https://coveralls.io/repos/ajuste/jaune-env/badge.svg?branch=master)](https://coveralls.io/r/ajuste/jaune-env?branch=master)

# jaune-env package

Simple JS utility that allows to get properties from an object by section or path. Plus it can pull from different sections if environment is production or testing.

## Install

```sh
npm install jaune-env
```

## Run tests

```sh
npm test
```


## How to use

```js

/* have your config object */
var config = {
  api : {
    host : 'http://test-api/v1',
    port : 80
  }
};

/* require jaune-env */
var jaune_env = require('jaune-env');

/* create a new instance of environment with configuration */
var env = new jaune_env(config);

/* get api host */
env.getEnvProperty('api.host'); // http://test-api/v1

/* get the api object */
env.getEnvProperty('api'); // api : { host : 'http://test-api/v1', port : 80 }

/* sometimes you may want to specify properties as parent.property */
env.getEnvProperty('api', 'host'); // http://test-api/v1

```

## Have different configuration depending of your environment

Let's have our config for production and development in the same object:

```js
/* have your config object */
var config = {
  api : {
    host : 'http://test-api/v1',
    port : 80
  },
  foo: true,
  api-dev : {
    host : 'http://test-api-dev/v1',
    port : 8080
  }
};
```

Let`s tell jaune-env we are running under development

```js
env.setProcessProperty('env', 'dev');
```

After that all properties look up will be performed first on {property}-dev
and if not found; we fallback to {property}:

```js
env.getEnvProperty('api'); // --> object from apiDevelop

env.getEnvProperty('foo'); // true
```

## Getting information from env variables
Both getEnvProperty and getProcessProperty will first check for the property
to exist in an environment variable.

For getEnvProperty it will concat section and property with a dot in the
middle if both are specified.

Also getEnvProperty will convert to object if value is a valid JSON.
