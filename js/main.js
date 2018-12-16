function instafeed() {
  let feed = new Instafeed({
    get: "user",
    userId: 3413063057,
    clientId: "668116fe96b34ada9024flc0e6917bba",
    accessToken: "3413063057.668116f.f510426802f2400a8578c8110dd35a93",
    limit: 6,
    target: "news",
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
                '<div class="img-featured-container border border-dark rounded">' +
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

  try {
    feed.run();
  }
  catch( error ) {
    console.error( error );
    console.log( "catch" );
  }
  
  return true;
}

function menuToggle( { menu, backdrop, duration = 200, scrollOff = true } ) {
  let body = $( "body" );
  let backdropState;

  if ( backdrop.length ) {
    if ( !backdrop.queue( "fx" ).length ) {
      backdropState = 1;
    } else {
      backdropState = 0;
    }
  } else {
    backdropState = -1;
  }

  if ( menu.length && !menu.queue( "fx" ).length ) {
    
    if ( backdropState !== 0 ) {

      if ( menu.attr( "class" ) === "active" ) {
        menu.animate( {
          "left": "-=100%"
        }, {
          duration: duration,
          start: function() {
            if ( backdropState ) {
              backdrop.fadeOut( {
                duration: duration
              } );
            }
          },
          complete: function() {
            menu.removeClass( "active" );
            if ( scrollOff ) {
              body.css( { overflow: "auto" } );
            }
          }
        } );
      } else {
        menu.animate( {
          "left": "+=100%"
        }, {
          duration: duration,
          start: function() {
            if ( scrollOff ) {
              body.css( { overflow: "hidden" } );
            }
            if ( backdropState ) {
              backdrop.fadeIn( {
                duration: duration
              } );
            }
          },
          complete: function() {
            menu.addClass( "active" );
          }
        } );
      }
    } else {
      //console.log( "backdrop is not exist or animated" );
      return false;
    }
  
  } else {
    //console.log( "menu is not exist or animated" );
    return false;
  }

  return true;
}



$( document ).ready( function() {
  let $grayBack = $( "#gray_back" );
  let $menuMobile = $( "#menu-mobile" );

  //instafeed();

  // menu expand
  $( "#header" ).on( "click", "#hamburger-menu-btn", function() {
    menuToggle( {
      menu: $menuMobile,
      backdrop: $grayBack, 
      duration: 500,
      scrollOff: true 
    } );
  });

  // menu collapse
  $( "#container" ).on( "click", "#gray_back, #menu-mobile a", function() {
    menuToggle( {
      menu: $menuMobile,
      backdrop: $grayBack, 
      duration: 400,
      scrollOff: true 
    } );
  });

  // Change header opacity on scroll down
  /*
  $( window ).on( "scroll", function() {
    let $header = $( "#header" );

    if ( $( this ).scrollTop() > $header.height() ) {
      $header.animate( {
        opacity: "0.95"
      }, 10 );
    } else {
      $header.animate( {
        opacity: "1"
      }, 10 );
    }
  });
  */

  $( "#header, #menu-mobile" ).on( "click", "a", function( event ) {

    if ( this.hash !== "" ) {
      event.preventDefault();

      let hash = this.hash;
      let headerHeight = $( "#header" ).height();
      
      $( "html, body" ).animate( {
        scrollTop: $( hash ).offset().top - headerHeight
      }, 800, function() {
        //window.location.hash = hash;
      });
    } else {
      // console.log( hash );
    }

  });
  

});

$( window ).on( "load", function() {

  $( "#preloader" ).fadeOut( "slow", function() {
    $( this ).remove();
  } );

});
