require 'listen'
require 'haml'
require 'coffee-script'
require 'byebug'

def compile_haml(file)
  file_name = "#{File.basename(file, '.haml')}.html"
  html      = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render }
  File.path(file).include?('layout') ? relative_path = '_layouts/' : relative_path = ''
  new_path  = "#{Dir.pwd}/#{relative_path}#{file_name}" 
  
  File.open(new_path, 'w') { |file| file.write(html) }
end

def compile_coffeescript
  target = "#{Dir.pwd}/public/application.js"
  File.open(target, 'w') { } # delete previously generated javascript
  File.readlines('./_coffee/Manifest').each do |line|
    file = "./_coffee/#{line.gsub('#', '').strip}.coffee"
    javascript = File.open(file, 'r') { |file| CoffeeScript.compile file.read }
    File.open(target, 'a') { |file| file.write(javascript) }
  end
end

haml_listener = Listen.to('_haml/') do |modified, added, removed|
  p "#{modified[0]} modified, recompiling haml"
  compile_haml(modified[0]) 
end

barista = Listen.to('_coffee/') do |modified, added, removed|
  p "#{modified[0]} modified, recompiling coffeescript"
  compile_coffeescript
end

haml_listener.start
barista.start
sleep
