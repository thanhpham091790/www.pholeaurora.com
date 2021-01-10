
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var resta = JSON.parse(this.responseText);
        var i;
        // Load notification from json file
        var note_info = '<p>' + resta.note + '</p>';
        document.getElementById("note-info").innerHTML = note_info;
        var note_hours = "";
        for (i = 0; i < resta.hours.length; i++) {
            note_hours += '<p>' + resta.hours[i] + '</p>';
        }
        document.getElementById("note-hours").innerHTML = note_hours;

        // Load about information from json file
        var about_info = "";
        for (i = 0; i < resta.about.length; i++) {
            about_info += '<p>' + resta.about[i] + '</p>';
        }
        document.getElementById("about-info").innerHTML = about_info;

        // Load menu category from json file
        var menu_nav = "";
        for (i = 0; i < resta.categories.length; i++) {
            menu_nav += '<a class="dropdown-item text-dark m-0 py-3 border-bottom" data-toggle="tab" \
            href = "#'+ resta.categories[i].cid +'">'+ resta.categories[i].cename +'<span class="d-block">'+ resta.categories[i].cvname +'</span></a>';
        }
        document.getElementById("menu-nav").innerHTML = menu_nav;

        // Load menu items from json file
        var cats = resta.categories;
        var menu = "", active;
        for (i = 0; i < cats.length; i++) {
            if (cats[i].cposition == "0") {
                active = " active";
            } else {
                active = "";
            }
            menu += '\
        <div id="'+ cats[i].cid + '" class="container-fluid tab-pane ' + active + '">\
            <div class="row"> \
                <div class="col-12"> \
                    <h3 class="c-name text-success">'+ cats[i].cename + '</h3> \
                </div> \
                <div class="col-12"> \
                    <img class="c-img img-fluid" src="'+ cats[i].cimage + '" \
                        alt="'+ cats[i].cname + '"> \
                </div> \
                <div class="col-12"> \
                    <p class="c-desc text-success">'+ cats[i].cdesc + '</p> \
                </div> \
            </div>';
            var j;
            var pros = cats[i].cproducts;
            for (j = 0; j < pros.length; j++) {
                menu += '\
            <div class="row"> \
                <div class="col-8"> \
                    <p class="p-name">A1. Goi Cuon - Steamed Spring Roll (2pcs) '+ pros[j].pid + '. ' + pros[j].pvname + ' - ' + pros[j].pename + ' (' + pros[j].ppieces + ')' + ' \
                        <span class="p-img"><i class="fas fa-camera text-success" data-toggle="modal" \
                                data-target="#'+ pros[j].pid + '"></i></span> \
                    <div class="modal fade" id="'+ pros[j].pid + '"> \
                        <div class="modal-dialog modal-dialog-centered"> \
                            <div class="modal-content"> \
                                <img class="img-fluid" src="'+ pros[j].pimage + '" alt="' + pros[j].pename + '"> \
                            </div> \
                        </div> \
                    </div> \
                    </p> \
                    <p class="p-desc">'+ pros[j].pdesc + '</p> \
                </div> \
                <div class="col-4"> \
                    <div class="p-price">';
                var z;
                var opts = pros[j].prices;
                if (opts.length == 1) {
                    menu += '<p>' + opts[0].price + '</p>';
                } else {
                    for (z = 0; z < opts.length; z++) {
                        menu += '<p>' + opts[z].price + ' (' + opts[z].size + ')</p>';
                    }
                }
                menu += '\
                    </div> \
                </div> \
            </div>';
            }
            menu += '\
        </div>';
        }
        document.getElementById("menu-items").innerHTML = menu;

        // Load address and phone from json file
        var address_info = "";
        address_info = '<a class="text-dark text-decoration-none" \
        href="'+ resta.address[0] +'">'+ resta.address[1] +'</a>';
        document.getElementById("address-info").innerHTML = address_info;

        var phone_info = "";
        phone_info = '<a class="text-dark text-decoration-none" \
        href="tel:'+ resta.phone[0] +'">'+ resta.phone[1] +'</a>';
        document.getElementById("phone-info").innerHTML = phone_info;
    }
};
xmlhttp.open("GET", "menu.json", true);
xmlhttp.send();


function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(39.66743209145535, -104.86360942372228),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,

        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(39.66746512578677, -104.86358796488952)
    });
    marker.setMap(map);

    var infoWindow = new google.maps.InfoWindow({
        content: "2719 S Parker Rd, Aurora, CO 80014"
    });
    google.maps.event.addListener(marker, 'click', function () {
        var pos = map.getZoom();

        map.setZoom(17);
        map.setCenter(marker.getPosition());

        window.setTimeout(function () {
            map.setZoom(pos);
        }, 3000);

        infoWindow.open(map, marker);
    });
}

