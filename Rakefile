require 'rubygems'
require 'rake'
require 'rake/clean'
require 'rake/gempackagetask'
require 'rake/rdoctask'
require 'rake/testtask'
require 'spec/rake/spectask'


task :default => [:spec]
#################################
## Custom tasks
#################################
$LOAD_PATH.unshift File.join(File.dirname(__FILE__),'lib')
def compileall(from, to, force = false)
  require 'coffeecompiler'
  
  outDir = File.expand_path to
  coffeeDir = File.expand_path from
  puts "Compiling all files: #{coffeeDir} -> #{outDir}"
  compiler = CoffeeCompiler.new nil, force
  begin
    compiler.compileAll(__FILE__, coffeeDir, outDir)
  rescue Exception => ex
    puts ex.inspect
  end

end

desc "compile all coffeescripts and start watching them"
task :compile_watch do
  compileall 'lib', 'libjs'
  system "watchr", 'compileall.rb'
end

desc "Forces the compilation of all coffeescripts and start watching them"
task :compile do
  compileall 'lib', 'libjs', true
  system "watchr", 'compileall.rb'
end

desc "runs unit tests"
task :spec do
  compileall 'lib', 'libjs'
  compileall 'spec/coffee', 'spec/javascripts'
  imports = %w[spec/jasmine-node/lib spec/javascripts libjs spec/dom]
  system "env NODE_PATH=#{imports.join ':'} node spec/jasmine-node/specs.js"
end

