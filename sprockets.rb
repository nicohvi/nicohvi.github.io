require 'listen'
require 'haml'
require 'coffee-script'
require 'byebug'

def compile_haml(file)
  file_name = "#{File.basename(file, '.haml')}.html"
  html      = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render }
  relative_path = get_relative(File.path(file))
  new_path  = "#{Dir.pwd}/#{relative_path}/#{file_name}" 
  File.open(new_path, 'w') { |file| file.write(html) }
end

def get_relative(path)
  match = path.match(/layouts|partials/)
  match ? "_#{match[0]}" : ''
end

def compile_coffeescript
  target = "#{Dir.pwd}/public/application.js"
  javascript = ''
  File.open(target, 'w') { } # delete previously generated javascript
  Dir.glob('./public/vendor/*.js') do |vendor_js|
    javascript += File.open(vendor_js, 'r') { |file| file.read }  
  end
  File.readlines('./_coffee/Manifest').each do |line|
    file = "./_coffee/#{line.gsub('#', '').strip}.coffee"
    javascript += File.open(file, 'r') { |file| CoffeeScript.compile file.read }
  end
  File.open(target, 'a') { |file| file.write(javascript) }
end

haml_listener = Listen.to('_haml/') do |modified, added, removed|
  if modified
    p "#{modified[0]} modified, recompiling haml"
    compile_haml(modified[0])
  elsif added
    p "#{added[0]} added, compile haml" 
    compile_haml(added[0])
  end
end

barista = Listen.to('_coffee/') do |modified, added, removed|
  p "#{modified[0]} modified, recompiling coffeescript"
  compile_coffeescript
end

haml_listener.start
barista.start
sleep
