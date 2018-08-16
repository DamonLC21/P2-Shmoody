

document.addEventListener('DOMContentLoaded', function(){
  
  
  const feeling = document.querySelector('#feeling')
  let shmood = document.querySelector('#shmood')
  const getURL = 'http://www.songsterr.com/a/ra/songs.json?pattern='
  var songs = document.querySelector('#songs')
  let artistName = document.querySelector('#artist')
  let songName = document.querySelector('#songTitle')
  let reset = document.querySelector('#reset')
  let save = document.querySelector('#save')
  let saveIt = document.querySelector('#saveit')
  let saveArtist = document.querySelector('#saveArtist')
  let saveSong = document.querySelector('#saveSong')
  let saveAll = document.querySelector('#saveAll')
  let firstName = document.querySelector('#firstName')



  save.addEventListener('click',function(){
    $('#myModal').modal('show');
  })

  feeling.addEventListener('click',showShmood)

  shmood.addEventListener('change',function(){
    let mood = shmood.value
    let arr = []
    console.log(getURL+mood)
    getData(getURL+mood).then(result => {
        var random = Math.floor((Math.random() * result.data.length)) 
        artistName.innerText = result.data[random]['artist'].name
        songName.innerText = result.data[random]['title']
        saveArtist.value = result.data[random]['artist'].name
        saveSong.value = result.data[random]['title']
        reset.setAttribute('class', '')
        saveIt.setAttribute('class', '')
        console.log(result.data)
        reset.addEventListener('click',function(){
          random = Math.floor((Math.random() * result.data.length))
          artistName.innerText = result.data[random]['artist'].name
          songName.innerText = result.data[random]['title']
          saveArtist.value = result.data[random]['artist'].name
          saveSong.value = result.data[random]['title']
        })
    })
   
  })

    function showShmood(){
      shmood.classList.toggle('none')
      songs.classList.toggle('none')
      reset.setAttribute('class', 'none')
      saveIt.setAttribute('class', 'none')
    }


    function getData(url) {
        return axios.get(url)
    }

    saveAll.addEventListener('click', function () {
      var user = firstName.value;
      localStorage.setItem('User', user);
      var artistFinal = saveArtist.value;
      localStorage.setItem('Artist', artistFinal);
      var songFinal = saveSong.value;
      localStorage.setItem('Song', songFinal);
    })


    $('.cover-heading').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({loop: true})
      .add({
        targets: '.cover-heading .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.cover-heading',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });

})
