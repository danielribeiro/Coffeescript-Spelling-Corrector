Coffeescript-Spelling-Corrector
==============

Compiling the Coffeescript Files
----
You can do it normally using nodejs and coffee,
but there are a couple of rake tasks to make it easy to run:

* compile: Just compiles all files.
* compile_watch: Runs and starts the compileall.rb watchr script to continuously compile
updated files. Obviously, requires [watchr](https://github.com/mynyml/watchr) gem
* force_compile: like compile_watch, but will force compile of all files regardless of date.


Running Tests
----
Just use the default rake task. Or rake spec.

Running
----
Using coffee command line:

    $ coffee lib/spellCheck.coffee



More about it [here](http://metaphysicaldeveloper.wordpress.com/2011/03/31/354/).



Meta
----

Created by Daniel Ribeiro

Released under the MIT License: http://www.opensource.org/licenses/mit-license.php

https://github.com/danielribeiro/Coffeescript-Spelling-Corrector
