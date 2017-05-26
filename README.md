# NOW That's What I Call Backbone
We have come a long way from our mixtape days. You're a little older, wiser and now know some new, slick technologies.

With this exercise, we are going to make a relatively simple backbone application (from scratch!) that will display the track list of a mix cd. To make it even more slick, when we click on a song title, the artists name will appear below the title. WILD!

Let's jump in!


### Create the files
In terminal,
```Bash
mkdir now-thats-what-i-call-backbone
cd now-thats-what-i-call-backbone
touch index.html
touch app.js
```

### Link Dependancies
A benefit of working with Backbone is it's flexibility. It allows us to continue working with familiar libraries, like jQuery and underscore! In order to use them, we need to link them in our HTML.

Create your HTML shell. Then, using a CDN, link to jQuery, underscore and backbone at the bottom (right below the ``<body>`` tag).
After all our libraries have been linked, link to your js file, ``app.js``.

```html
<!--STEP ONE: setup HTML shell  -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>NOW That's What I Call Backbone</title>
  </head>
  <body>
  </body>

  <!-- STEP TWO: link all dependances (underscore.js, jQuery.js and Backbone.js) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone.js" type="text/javascript"></script>

  <!-- STEP THREE: create app.js file and link it -->
  <script src="app.js" type="text/javascript"></script>
</html>
```


### Initial Data
Our mix cd will be based on the following array of objects, where each object represents a song.

Copy this code to the top of your ``app.js`` file:
```JavaScript
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
```



### Models
Lets start with something we're familiar with, models!

We are going to take the songData and turn each object into an instance of a Song model.

Creating a model is as simple as setting a capitalized variable to: ``Backbone.Model.extend({ });``.

In the code below we create a new model for song. Then, we took one of the song objects and passed it as an argument to create a new instance of the song model.

Once the song is an instance, we can call the ``.get()`` function to return one of it's attributes, like we did with the console.log at the bottom of this code snippet.

```javascript

var Song = Backbone.Model.extend({ });

var song1 = new Song({
  title: "Drop It Like It's Hot",
  year: 2004,
  artist: "Snoop Dog"
});

console.log(song1.get("title") +  " is by: " + song1.get("artist"));

```

We don't only have one song though.. so this is where collections come in!

### Collections
Collections allow us to handle many instances of a model in a more efficient way. We want many songs on our cd, instead of only a single one. So let's make a collection that will handle that for us!

Much like model, starting a collection is pretty simple. All we have to do is set another capitalized, camel-cased variable to ``Backbone.Collection.extend({});``.  Inside, we set what model this is a collection of, in this case, it is Song (the model we defined earlier).

When we create a new collection, we can pass an array of objects (like songData) as an argument. Doing so will create all the new song models for us!
```javascript
var MixCd = Backbone.Collection.extend({
  model: Song
});

// Fly new mix CD of songs for the summer
var summer04 = new MixCd(songData);


// See all the songs' titles displayed in console!
summer04.each(function(song) {
  console.log(song.get("title"));
});
```
All of our song data is now nicely organized, but we still don't see anything!

 This is where views coming in

## VIEWS

Let's start with something familiar again, HTML and underscore.

The following code should go between your index.html's ``<body>`` tags.

One of The two parts to take the most notice of is the ``<main>`` tag that has an empty ``<ul>`` child element.

We will use this ``<ul>`` element, that is already loaded in the dom, to dynamically make a list of songs from the collection (summer04).

The second is the underscore template, song-template. This has a single h3 element we intend to inject a song's title into. We will use this template to create an ``<li>`` element for each song in our collection.

```html
<header>
  <h1> Jamie's Totally Awesome Summer '04 mix CD </h1>
</header>
<main>
  <ul class="song-list"> </ul>
</main>

<script id="song-template" type="text/template">
  <h3><%- title %></h3>
</script>
```


### Song View
Now back to javascript!

There's a log going on in this code. But first, we are creating a new backbone view specifically for a song.

In the initialize, we set the template by passing it as an argument. (This will be the #song-template when we create a new songView... eventually)


We then define a render() function that we will call when we are ready to have that song displayed in the dom.


Another responsibility the view handles are click events! We first define the events, then define the callback functions.

```javascript
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
  },
  events: {
    'click h3': "seeArtist"
  },
  seeArtist: function(e) {
    this.$el.append(this.model.attributes.artist);
  }
});
```

We are still not going to see anything in the browser window quite yet, we will call the .render() function on each song using a view for our collection!


### Collection View
This has a similar structure to the SongView, but notice how we are creating new SongView instances in render(). Then we have each of the instances append to our song-list ul.


```javascript
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

```




### HOT DOM!
Now is the time where we can see our data come alive in the browser window!  

- **Model**: The collection of songs we made earlier, ``summer04``
- **Template**: The underscore template we set in the html and gave an id of 'song-template'
- **el**: This the element where we want to append all of our songs to. It will be the parent element to our songs view.


Once we create the collection view, we have to call the ``.render()`` function on the collection view in order to have our list of songs load to the dom. Only then can we see our list of songs come alive in the browser window!

```javascript
$(document).ready(function() {

  var mixCdView = new MixCdView({
    model: summer04,
    template: _.template($('#song-template').html()),
    el: 'main'
  });

  mixCdView.render();
});
```

### That's it!
To see all the code together, checkout the 'solution' branch of this repository.


### Conclusion
This walkthrough was a friendly introduction to three major components (models, collections and views) that go into organizing javascript code with backbone and how they connect with each other.

Next week we will dive deeper into everything covered in this exercise. But if you're feeling

#### Lecture Resources
- [Introduction to Backbone](https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/backbone-week1/11-Backbonejs/Introduction-to-Backbonejs.md)
- [Backbone Models](https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/backbone-week1/11-Backbonejs/Backbone-Models.md)
- [Backbone Collections](https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/backbone-week1/11-Backbonejs/Backbone-Collections.md)
- [Backbone Views](https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/backbone-week1/11-Backbonejs/Backbone-Views.md)
-[Backbone Collection Views](https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/backbone-week1/11-Backbonejs/Views-of-Collections.md)
