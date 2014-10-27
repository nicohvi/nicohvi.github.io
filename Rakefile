namespace :haml do
  require 'haml'
  
  def convert(file, relative_path='')
    file_name = "#{File.basename(file, '.haml')}.html"
    html = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render }
    path = "#{Dir.pwd}/#{relative_path}#{file_name}"
    
    p "Converting #{file} to #{path}"
    File.open(path, 'w') { |file| file.write(html) }
  end 
 
  desc 'Parse layouts'
  task :layouts do
    Dir.glob('_haml/layouts/*.haml') do |file|
      convert(file, '_layouts/')
    end
  end
 
  desc 'Parse index'
  task :index do
    convert '_haml/index.haml'
  end
 
end
 
desc 'Parse all HAML files'
task haml: %w(haml:layouts haml:index)
