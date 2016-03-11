require 'listen'
require 'haml'

haml   = "#{Dir.pwd}/_haml"

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
  then "#{Dir.pwd}/#{relative_path}/#{file_name}" 
  else "#{Dir.pwd}/#{file_name}" end
  File.open(new_path, 'w') { |file| file.write(html) }

  p "Wrote #{new_path}."
end

def get_relative(path)
  match = path.match(/layouts|now|portfolio|library|quotes|blog|resume/)
  if match 
    match[0] == 'layouts' ? "_#{match[0]}" : match[0]
  else
    nil
  end
end

haml_listener = Listen.to(haml) do |modified, added, removed|
  if modified
    p "#{modified[0]} modified, recompiling haml"
    compile_haml(modified[0])
  elsif added
    p "#{added[0]} added, compiling haml" 
    compile_haml(added[0])
  end
end

haml_listener.start
sleep
