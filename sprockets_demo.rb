require 'haml'
require 'coffee-script'

@root   = Dir.pwd
@coffee = "#{@root}/_coffee"
@haml   = "#{@root}/_haml"

def compile_coffeescript
  target, javascript = "#{@root}/public/application.js", '' # 1
  Dir.glob("#{@coffee}/*.coffee") do |coffeescript| # 2
    javascript += File.open(coffeescript, 'r') do |file| 
      CoffeeScript.compile file.read  # 3
    end
  end
  File.open(target, 'w') { |file| file.write(javascript) } # 4
end

def compile_haml(file) # 1
  file_name = "#{File.basename(file, '.haml')}.html" # 2 
  html = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render } # 3
  path = "#{@root}/views/#{file_name}"
  File.open(path, 'w') { |file| file.write(html) } # 4
end

# Do the actual compilations
compile_coffeescript
Dir.glob("#{@haml}/.*haml").each { |file| compile_haml(haml) }
