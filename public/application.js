(function() {
  var Post;

  Post = (function() {
    function Post() {
      this.data = $('#data');
      this.setHeader();
    }

    Post.prototype.setHeader = function() {
      this.setCover();
      return this.setTitle();
    };

    Post.prototype.setCover = function() {
      var blur, src;
      src = this.data.data('src');
      blur = this.data.data('blur');
      $('.image').css('background-image', "url('" + src + "')");
      return $('.blur').css('background-image', "url('" + blur + "')");
    };

    Post.prototype.setTitle = function() {
      var title;
      title = this.data.data('title');
      return $('.title').text(title);
    };

    Post.prototype.blur = function(opacity) {
      return $('.blur').css('opacity', opacity);
    };

    return Post;

  })();

  this.Post = Post;

}).call(this);
(function() {
  var Blog;

  Blog = (function() {
    function Blog(options) {
      if (options.post) {
        this.post = new Post();
      }
      this.initHandlers();
    }

    Blog.prototype.initHandlers = function() {
      return $(document).on('scroll', (function(_this) {
        return function(event) {
          var offset;
          offset = $(window).scrollTop() / 150.0;
          if (_this.post) {
            return _this.post.blur(offset);
          }
        };
      })(this));
    };

    return Blog;

  })();

  this.Blog = Blog;

  $(function() {
    var options;
    options = {};
    if ($('#post').length > 0) {
      options.post = true;
    }
    return this.blog = new Blog(options);
  });

}).call(this);
