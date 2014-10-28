(function() {
  var Post;

  Post = (function() {
    function Post() {
      this.data = $('#data');
      this.setCover();
      this.setTitle();
    }

    Post.prototype.setCover = function() {
      var src;
      src = this.data.data('src');
      return $('#cover').css('background-image', "url('" + src + "')");
    };

    Post.prototype.setTitle = function() {
      var title;
      title = this.data.data('title');
      return $('.title').text(title);
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
    }

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
