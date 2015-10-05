require 'listen'
require 'haml'
require 'coffee-script'
require 'uglifier'

@root   = Dir.pwd
@haml   = "#{@root}/_haml"
@coffee = "#{@root}/_coffee"

def compile_haml(file)
  file_name = "#{File.basename(file, '.haml')}.html"
  begin
    html = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render }
  rescue Haml::SyntaxError => error
    p error
    return
  end
  relative_path = get_relative(File.path(file))
  new_path  = "#{Dir.pwd}/#{relative_path}/#{file_name}" 
  File.open(new_path, 'w') { |file| file.write(html) }

  p "Wrote #{new_path}."
end

def get_relative(path)
  match = path.match(/layouts|portfolio|library|quotes|blog|resume/)
  if match 
    match[0] == 'layouts' ? "_#{match[0]}" : match[0]
  else
    ''
  end
end

def compile_coffeescript
  target, javascript = "#{@root}/public/application.js", ''
  Dir.glob('./public/vendor/*.js') do |vendor_js|
    javascript += File.open(vendor_js, 'r') { |file| file.read }  
  end
  File.readlines("#{@coffee}/Manifest").each do |line|
    begin
      file = "#{@coffee}/#{line.gsub('#', '').strip}.coffee"
      javascript += File.open(file, 'r') { |file| CoffeeScript.compile file.read }
    rescue ExecJS::RuntimeError => error
      p error
      return
    end
  end
  File.open(target, 'w') { |file| file.write(javascript) }
end

def minify_coffeescript
  File.open("#{@root}/public/application.min.js", 'w') { |file|
    file.write Uglifier.compile(File.read('./public/application.js'))
  }
end

haml_listener = Listen.to(@haml) do |modified, added, removed|
  if modified
    p "#{modified[0]} modified, recompiling haml"
    compile_haml(modified[0])
  elsif added
    p "#{added[0]} added, compile haml" 
    compile_haml(added[0])
  end
end

barista = Listen.to(@coffee) do |modified, added, removed|
  p "recompiling coffeescript"
  compile_coffeescript
  p "coffeescript compiled, lets minify that shit"
  minify_coffeescript
end

haml_listener.start
barista.start
sleep
