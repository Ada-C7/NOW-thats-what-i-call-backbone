
  var songData = [
      {
          "title": "Drop It Like It's Hot",
          "year": 2004,
          "artist": "Snoop Dog"
      },
      {
          "title": "Pieces of Me",
          "year": 2004,
          "artist": "Ashlee Simpson"
      },
      {
          "title": "Vertigo",
          "year": 2004,
          "artist": "U2"
      },
      {
          "title": "When the Sun Goes Down",
          "year": 2004,
          "artist": "Kenny Chesney"
      },
      {
          "title": "1, 2 Step",
          "year": 2004,
          "artist": "Ciara"
      },
      {
          "title": "Talk About Our Love",
          "year": 2004,
          "artist": "Brandy"
      },
      {
          "title": "It's My Life",
          "year": 2004,
          "artist": "No Doubt"
      },
      {
          "title": "Toxic",
          "year": 2004,
          "artist": "Britney Spears"
      },
      {
          "title": "Are You Going to Be My Girl",
          "year": 2004,
          "artist": "Jet"
      },
      {
          "title": "Redneck Woman",
          "year": 2004,
          "artist": "Gretchen Wilson"
      },
      {
          "title": "Lean Back",
          "year": 2004,
          "artist": "Terror Squad"
      }
    ];



// SONGS MODEL
var Song = Backbone.Model.extend({ });

// Creating a single
var song1 = new Song({
  title: "Drop It Like It's Hot",
  year: 2004,
  artist: "Snoop Dog"
});

console.log(song1.get("title") +  " is by: " + song1.get("artist"));





// Fly new mix CD of songs for the summer
var MixCd = Backbone.Collection.extend({
  model: Song
});

// Lets make a collection (from our song data)
var summer04 = new MixCd(songData);

summer04.each(function(song) {
  console.log(song.get("title"));
});




/////////////// We're not here to console log.

// SINGLE VIEW
var SongView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
  },
  render: function() {
    // console.log(this.model.attributes.artist);
    var compiledTemplate = this.template(this.model.toJSON());
    // console.log(compiledTemplate);
    this.$el.html(compiledTemplate);
    return this;
  }, // render
  events: {
    'click h3': "seeArtist"
  },
  seeArtist: function(e) {
    this.$el.append(this.model.attributes.artist);
  }
});


// COLLECTION
var MixCdView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
  },
  render: function() {
    var that = this;
    this.model.each(function(song) {
      var songView = new SongView({
        model: song,
        template: that.template,
        tagName: 'li'
      });
      that.$('.song-list').append(songView.render().$el);
    });
    return this;
  }
});



$(document).ready(function() {
  mixCd = new MixCd(songData);

  var mixCdView = new MixCdView({
    model: mixCd,
    template: _.template($('#song-template').html()),
    el: 'main'
  });

  mixCdView.render();
});
