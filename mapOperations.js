function initMap() {
    let lastStarPicked = -1;

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

    if (document.getElementById('submit')) {
        document.getElementById('submit').onclick = updateRating();
    }

    function updateRating(newRating, entry) {
        document.getElementByID('ratingHeader').innerHTML = 'Edit'; 
        console.log(sessionStorage.getItem('rating'));
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
        `<div class="star-widget">
        <h3 id='ratingHeader'>Rate</h3>
          <input type="radio" name="rate" id="rate-5" onclick="sessionStorage.setItem('rating', 5)">
          <label for="rate-5" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-4" onclick="sessionStorage.setItem('rating', 4)">
          <label for="rate-4" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-3" onclick="sessionStorage.setItem('rating', 3)">
          <label for="rate-3" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-2" onclick="sessionStorage.setItem('rating', 2)">
          <label for="rate-2" class="fas fa-star"></label>
          <input type="radio" name="rate" id="rate-1" onclick="sessionStorage.setItem('rating', 1)">
          <label for="rate-1" class="fas fa-star"></label>
          <form>
            <header></header>
            <div class="textarea">
              <textarea cols="30" placeholder="Description of rating..."></textarea>
            </div>
            <div class="btn">
              <button id="submit">Submit</button>
            </div>
          </form>
        </div>
        <script></script>`;
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