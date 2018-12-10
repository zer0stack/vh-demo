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
              '<div class="img-featured-container">' +
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

feed.run();

let isMobileOpen = null;

function menuMobileOpen() {
  //let headerHeight = document.getElementById("header").offsetHeight;
  let menuMobile = document.getElementById("menu-mobile");

  if (menuMobile.style.display === "block") {
    isMobileOpen = true;
  } else {
    isMobileOpen = false;
  }

  if (isMobileOpen === false) {
    //menuMobile.style.top = headerHeight + 'px';

    document.getElementById("menu-mobile").style.display = "block";
    document.getElementById("gray_back").style.display = "block";

    isMobileOpen = true;
  } else {
    menuMobileCollapse();
    isMobileOpen = false;
  }
}

function menuMobileCollapse() {

  document.getElementById("menu-mobile").style.display = "none";
  document.getElementById("gray_back").style.display = "none";

}
