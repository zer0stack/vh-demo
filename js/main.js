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

/*
function body_parallax_element( selector, context ) {
  context = context || document;
  let elements = context.querySelectorAll( selector );

  return Array.prototype.slice.call( elements );
}
*/

$( document ).ready( function() {
  let $body = $( "body" );
  let $grayBack = $( "#gray_back" );
  let $menuMobile = $( "#menu-mobile" );

  $( "#container" ).parallax( { 
    imageSrc: './img/background.jpg',
    speed: 0.4,
    positionX: "left",
    positionY: "top",
    naturalWidth: 1920
  } );

  instafeed();

  $( "#header" ).on( "click", "#hamburger-menu-btn", function() {
    menuExpand( $body, $grayBack, $menuMobile );
  });

  $( "#container" ).on( "click", "#gray_back, #menu-mobile a", function() {
    menuCollapse( $body, $grayBack, $menuMobile );
  });

  // Change header opacity on scroll down
  $( document ).on( "scroll", function() {
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

  // Add smooth scrolling to all links with .link class
  $( "#container" ).on( "click", ".link", function( event ) {

    if ( this.hash !== "" ) {
      event.preventDefault();

      let hash = this.hash;
      let headerHeight = $( "#header" ).height();

      // console.log( hash );
      
      $( "html, body" ).animate( {
        scrollTop: $( hash ).offset().top - headerHeight
      }, 800, function() {
        //window.location.hash = hash;
      });
    } else {
      // console.log( hash );
    }

  });

  /*
  window.addEventListener( "scroll", function() {

    let scrolledHeight = window.pageYOffset;
    body_parallax_element( "#container" ).forEach( function( el, index, array ) {
      let limit = el.offsetTop + el.offsetHeight;

      if( scrolledHeight > el.offsetTop && scrolledHeight <= limit ) {
        let offsetStep = ( scrolledHeight - el.offsetTop ) / 2;
        el.style.backgroundPositionY = offsetStep + "px";
      } else {
        el.style.backgroundPositionY = "0";
      }

    });
  });
  */

});

$( window ).on( "load", function() {

  $( "#preloader" ).fadeOut( "slow", function() {
    $( this ).remove();
  } );

});
