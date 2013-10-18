class GetsourceController < ActionController::Base
  require 'open-uri'
  require 'pathname'

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  
  def download
    link=params[:link]
    all_html = Nokogiri::HTML(open(link))
    create_folder
    save_html(all_html)
    #Get All CSS File
    all_html.xpath('//link/@href').each do |row|
      if check_link(row)
        css_path=row
      else
        css_path=link+row
      end
      getcss(css_path)
    end
    #Get All JS File
    all_html.xpath('//script/@src').each do |row|
      if check_link(row)
        js_path=row
      else
        js_path=link+row
      end

      getjs(js_path)
    end
    #Get All Images File
    all_html.xpath('//img/@src').each do |row|
      if check_link(row)
        images_path=row
      else
        images_path=link+row
      end

      getimages(images_path)
    end
  end
  def store
  end
  def create_folder()
    html_folder=Rails.root.join('html_template')
    new_folder_name= SecureRandom.uuid

    Dir.mkdir(File.join(html_folder, new_folder_name), 0777)
    Dir.mkdir(File.join(Rails.root.join('html_template',new_folder_name),"css"), 0777)
    Dir.mkdir(File.join(Rails.root.join('html_template',new_folder_name),"js"), 0777)
    Dir.mkdir(File.join(Rails.root.join('html_template',new_folder_name),"images"), 0777)

    @site_root_dir=Rails.root.join('html_template',new_folder_name)
    @site_root_dir_css=Rails.root.join('html_template',new_folder_name,"css")
    @site_root_dir_js=Rails.root.join('html_template',new_folder_name,"js")
    @site_root_dir_images=Rails.root.join('html_template',new_folder_name,"images")
  end
  def getcss(css_path="")
    #css_file_name=File.basename(css_path)
    #get_folder_css=@site_root_dir_css
    #css_read_file  = open(css_path) {|f| f.read }
    #Dir.chdir(get_folder_css)
    #css_create_new=File.new(css_file_name,"w+")
    #css_create_new.write css_read_file
    #css_create_new.close
    begin
      open(css_path) {|f|
        File.open(@site_root_dir_css+File.basename(css_path),"wb") do |file|
          file.puts f.read
        end
      }
    rescue
    ensure
    end
  end

  def getjs(js_path="")
    begin
      open(js_path) {|f|
        File.open(@site_root_dir_js+File.basename(js_path),"wb") do |file|
          file.puts f.read
        end
      }
    rescue
    ensure
    end
  end
  def getimages(images_path="")
    begin
      open(images_path) {|f|
        File.open(@site_root_dir_images+File.basename(images_path),"wb") do |file|
          file.puts f.read
        end
      }
    rescue
    ensure
    end
  end
  def save_html(html="")
    html_folder= @site_root_dir
    Dir.chdir(html_folder)
    html_create_new=File.new("index.html","w+")
    html_create_new.write html
    html_create_new.close

    file_path = Rails.root.join(html_folder,"index.html")
    doc = Nokogiri::HTML(open(file_path))
    doc.xpath("//link").each { |div|
      css_name=div['href']
      div.set_attribute("href","css/"+File.basename(css_name)) unless css_name==nil
    }
    doc.xpath("//script").each { |div|
      js_name=div['src']
      div.set_attribute("src","js/"+File.basename(js_name)) unless js_name==nil
    }
    doc.xpath("//img").each { |div|
      img_name=div['src']
      div.set_attribute("src","images/"+File.basename(img_name)) unless img_name==nil
    }
    language_list_open2=File.open(file_path,"w+")
    language_list_open2.rewind
    language_list_open2.write doc
    language_list_open2.close
  end
  def check_link(link="")
    rex=  /http:\/\//
    if rex.match link
      true
    else
      false
    end
  end
  #Scan Images from CSS File
  def scan_img_from_css(css_content="")
    background_regex=/background(.*);/
    images_regex_1=/\('(.*)'\)/
    images_regex_2=/\("(.*)"\)/
    images_regex_3=/\('..\/(.*)'\)/
    images_regex_4=/\("..\/(.*)"\)/
    images_regex_5=/\((.*)\)/
    images_regex_6=/\(..\/(.*)\)/
    case css_content
      when /\('/.match css_content
        #url('images/bg.png')
      when /\("/.match css_content
        #url('images/bg.png')
      when /\('..\//.match css_content
        #url('../images/bg.png')
      when /\("..\//.match css_content
        #url("../images/bg.png")
      when /\(..\//.match css_content
        #url(../images/bg.png)
      else
        #url(images/bg.png)
    end
  end
  def scan_and_download(content="",regex="")
    content.scan(regex)
  end
end