function getParam ()
{
    let url = window.location;
    let params = new URLSearchParams(url.search.slice(1));
    let obj = {};
    for(let pair of params.entries()) {
        obj[pair[0]] = pair[1]    //push keys/values to object
    }
    return obj
}
var url = getParam();
const key = atob(url.key);
const uid = atob(url.uid);
const folder = url.folder;
var download_url;
const main = document.querySelector('.main')
firebase.database().ref('drive/'+uid+"/"+folder+'/'+key).once('value').then(function (snapshot) {
   document.querySelector('#title').innerText = snapshot.val().filename;
   download_url = snapshot.val().file;
   document.querySelector('#download').href = download_url;
    const fname = snapshot.val().filename;
    if(snapshot.key == "folder"){
 
    }else{
        var type = snapshot.val().filename;
    if(type.includes('.png') ||type.includes('.PNG') || type.includes('.jpg') || type.includes('.gif')){
        main.innerHTML +=`<img src="${snapshot.val().file}" alt="not found">`
        
     }else if (type.includes('.zip')){
         main.innerHTML +=`<div class="card">
         <i class="fas fa-file-archive"></i>
         <h1>${fname}</h1>
     </div> `
         
     }else if (type.includes('.mp4')){
         var link = snapshot.val().file
        var link2 = link.replace('https://drive.google.com/uc?export=download&id=', "")
        link2 = link2.replace(/\s/g, '')
        link2 = `https://www.googleapis.com/drive/v3/files/${link2}?alt=media&key=AIzaSyAHIDPKFSVbDwk-NdlAW8n3uh2q6AJkyAA`;
         main.innerHTML += `<video src="${link2}" controls muted></video>`      
     }else{
      
        main.innerHTML +=`<div class="card">
        <i class="fas fa-file-archive"></i>
        <h1>${fname}</h1>
    </div> `
    }
}
})
function goback(){window.location.replace("../index.html");}