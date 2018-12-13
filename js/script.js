function instafeed() {
  let feed = new Instafeed({
    get: "user",
    userId: 3413063057,
    clientId: "668116fe96b34ada9024flc0e6917bba",
    accessToken: "3413063057.668116f.f510426802f2400a8578c8110dd35a93",
    limit: 6,
    target: "instafeed",
    sortBy: "most-recent",
    resolution: "standard_resolution",
    filter: function(image) {
      let MAX_LENGTH = 47;
  
      if (image.caption && image.caption.text) {
        image.short_caption = image.caption.text.slice(0, MAX_LENGTH);
        image.short_caption += "...";
      } else {
        image.short_caption = "";
      }
  
      return true;
    },
    template:   '<div class="col-xs-12 col-sm-6 col-md-4 p-3">' +
                '<a href="{{link}}" target="_blank">' +
                '<div class="img-featured-container  border border-dark rounded">' +
                '<div class="img-backdrop"></div>' +
                '<div class="description-container">' +
                '<p class="caption">{{model.short_caption}}</p>' +
                '<span class="likes"><i class="fa fa-heart"></i> {{likes}}</span>' +
                '<span class="comments"><i class="fa fa-comment"></i> {{comments}}</span>' +
                '</div>' +
                '<img src="{{image}}" class="img-responsive">' +
                '</div>' +
                '</a>' +
                '</div>'
  });

  return feed.run();
}

function menuExpand( $body, $grayBack, $menuMobile ) {
  if ( $body.length && $grayBack.length && $menuMobile ) {

    if ( !$grayBack.queue( "fx" ).length && !$menuMobile.queue( "fx" ).length ) {
      $grayBack.fadeIn( {
        duration: 200,
        start:function() {
          $menuMobile.animate( {
            "left": "+=100%"
          }, 400 );
          $body.css( { overflow: "hidden" } );
        }
      });
    } else {
      //console.log( "The expand animation is not over!" );
      return false;
    }
    
  } else {
    //console.log( "Not all elements for menuExpand() found!" );
    return false;
  }

  return true;
}

function menuCollapse( $body, $grayBack, $menuMobile ) {
  if ( $body.length && $grayBack.length && $menuMobile ) {

    if ( !$grayBack.queue( "fx" ).length && !$menuMobile.queue( "fx" ).length ) {
      $grayBack.fadeOut( {
        duration: 250,
        start: function() {
          $menuMobile.animate( {
            "left": "-=100%"
          }, 250 );
        },
        complete:function() {
          $body.css( { overflow: "auto" } );
        }
      });
    } else {
      //console.log( "The collapse animation is not over!" );
      return false;
    }
    
  } else {
    //console.log( "Not all elements for menuCollapse() found!" );
    return false;
  }

  return true;
}

$( document ).ready( function() {
  let $body = $( "body" );
  let $grayBack = $( "#gray_back" );
  let $menuMobile = $( "#menu-mobile" );

  instafeed();

  $( "#hamburger-menu-btn" ).on( "click", function() {
    menuExpand( $body, $grayBack, $menuMobile );
  });

  $( "#gray_back, #menu-mobile a" ).on( "click", function() {
    menuCollapse( $body, $grayBack, $menuMobile );
  });

  $( document ).on( "scroll", function() {
    if ( $( this ).scrollTop() > $( "#header" ).height() ) {
      $( "#header" ).animate( {
        opacity: "0.95"
      }, 10 );
    } else {
      $( "#header" ).animate( {
        opacity: "1"
      }, 10 );
    }
  });
  
});

$( window ).on( "load", function() {
  $( "body" ).animate({
    height: [ "toggle", "swing" ],
    opacity: "toggle"
  }, 1000, "linear", function() {
    
  });
});
