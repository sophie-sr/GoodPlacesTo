function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 48.4632568359375, lng: -123.31224060058594 },
      zoom: 15,
      mapId: "DEMO_MAP_ID",
    });

    var markers = [
    {
        coords: {lat: 48.4632568359375, lng: -123.31224060058594},
        content: makeContent("hey", 4)
    },
    {
        coords:{lat: 48.46119550869299, lng: -123.3113826625658},
        content: "<h3>ECS</h3>"
    },
    ];

    // Loop through markers
    for(var i = 0; i<markers.length; i++){
        addMarker(markers[i]);
    }
    
    function addMarker(props){
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content: props.content,
            });

            marker.addListener("click", function(){
                infoWindow.open(map, marker);
            });
        }
    }

    /**
     * makes content hopefully
     * @param {string} header 
     * @param {int} rating 
     * 
     * @returns html element
     */
    function makeContent(header, rating) {
        let outerDiv = document.createElement('div');
        outerDiv.classList.add('container');
        outerDiv.innerHTML = 
        ` <div class="post">
          <div class="text">Thanks for rating us!</div>
          <div class="edit">EDIT</div>
        </div>
        <div class="star-widget">
          <input type="radio" name="rate" id="rate-5">
          <label for="rate-5" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-4">
          <label for="rate-4" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-3">
          <label for="rate-3" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-2">
          <label for="rate-2" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-1">
          <label for="rate-1" class="fas fa-star"></label>
          <form action="#">
            <header></header>
            <div class="textarea">
              <textarea cols="30" placeholder="Describe your experience.."></textarea>
            </div>
            <div class="btn">
              <button type="submit">Post</button>
            </div>
          </form>
        </div>`;

        return outerDiv;
    }

    const btn = document.querySelector("button");
    const post = document.querySelector(".post");
    const widget = document.querySelector(".star-widget");
    const editBtn = document.querySelector(".edit");
    btn.onclick = ()=>{
        widget.style.display = "none";
        post.style.display = "block";
        editBtn.onclick = ()=>{
            widget.style.display = "block";
            post.style.display = "none";
        }
        return false;
    }
}