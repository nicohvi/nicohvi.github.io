require 'listen'
require 'haml'
require 'fileutils'

HAML = "#{Dir.pwd}/_haml"

def compile_haml (file)
  file_name = "#{File.basename(file, '.haml')}.html"
  begin
    html = File.open(file, 'r') do |file| 
      Haml::Engine.new(file.read).render 
    end
  rescue Haml::SyntaxError => error
    p error
    return
  end

  relative_path = get_relative(File.path(file))
  new_path  = if relative_path 
  then "build/#{relative_path}/#{file_name}" 
  else "build/#{file_name}" end

  # ensure folder is created
  folder = new_path.split('/').first(new_path.size - 1).join('/')
  FileUtils.mkdir_p(File.dirname(folder))

  File.open(new_path, 'w') { |file| file.write(html) }

  p "Wrote #{new_path}"
end

def get_relative(path)
  match = path.match(/_layouts|portfolio|books|quotes|blog|talks/)
  if match 
    match[0]
  else
    nil
  end
end

haml_listener = Listen.to(HAML) do |modified, added, removed|
  if modified
    p "#{modified[0]} modified, recompiling haml"
    compile_haml(modified[0])
  elsif added
    p "#{added[0]} added, compiling haml" 
    compile_haml(added[0])
  end
end

def compile_all 
  Dir.glob("#{HAML}/**/*.haml") do |file|
    compile_haml(file)
  end
end

compile_all
haml_listener.start
sleep
