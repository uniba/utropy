utropy
====

__utropy__ is Hiroshi Yuki's Tropy implementation for uniba.jp.
Designed to deployed to Heroku.

Requirement
----

* Heroku ceder stack
* Node v0.4.7
* MongoDB (production code run on MongoLab)

Installation
----

Install Node v0.4.7 (using nave)

```
$ nave install 0.4.7
$ nave use 0.4.7
$ curl http://npmjs.org/install.sh | sh
````

Grab code and resolving module dependencies.

```
$ git clone git@github.com:uniba/utropy.git
$ cd utropy
$ npm install
```

Run

```
$ node web
```

Deployment
----

At first:

```
$ git remote add heroku git@heroku.com:utropy.git
```

Deploy to Heroku:

```
$ git push heroku master
```
