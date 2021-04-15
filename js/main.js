//GENERALS
const li1 = ["Home", "Trending", "Subscriptions"];
const li2 = ["Library", "History", "Your videos", "Watch later", "Liked videos",];
const leftSideOfHeader = document.getElementById('left');
const hamMenu = document.getElementById('hamMenu');
const logo = document.getElementById('logo');
const centerOfHeader = document.getElementById('center');
const search = document.getElementById('searchInput');
const buttSearchLoop = document.getElementById('searchLoop');
const imgMagnifyingGlass = document.getElementById('imgMagnifyingGlass');
const rightSideOfHeader = document.getElementById('right');
const signUpButt = document.getElementById('signUpButt');
const divFrame = document.getElementById('frame');
const aside = document.querySelector('.visible');
const apiKey = "AIzaSyB5P5fVIufelmEqcHENWQ2rhcVSx-MdvtE";
const videos = document.getElementById('videos');
const videoPreview = document.querySelector('iframe');

/////////////////////////////////////////////////////////////////////////////////////////////

// HEADER

const setImagesForHeader = () => {
	hamMenu.setAttribute("src", "https://www.pngkey.com/png/full/30-303853_hamburger-menu-icon-menu-button-three-lines.png");
	logo.setAttribute("src", "https://cdn.havecamerawilltravel.com/photographer/files/2020/01/youtube-logo-new.jpg");
	imgMagnifyingGlass.setAttribute("src", "https://cdn3.iconfinder.com/data/icons/instagram-18/512/194_Instagram_Search_Sets-512.png");
}

const signIn = () => {

	signUpButt.innerText = "Sign in YouTube";

	signUpButt.addEventListener("click", () => {
		let mail = prompt("Put your email address");
		localStorage.setItem("address", mail);
		signUpButt.innerText = localStorage.getItem('address');
		signUpButt.style.borderRadius = "10px";
		signUpButt.style.borderColor = '#f0f8ff';
	})
}

setImagesForHeader();
signIn();

// MENU

const makeUrAndLi = () => {

	for(let i = 0; i < 2; i++) {
		const urList = document.createElement('ul');
		aside.prepend(urList);
		urList.setAttribute('class','list');
	}

		for(let i = 0; i < li1.length; i++) {
		const liItem1 = document.createElement("li");
		liItem1.innerHTML += li1[li1.length - i - 1];
		aside.firstElementChild.prepend(liItem1);
	}

		for(let i = 0; i < li2.length; i++) {
		const liItem2 = document.createElement("li");
		liItem2.innerHTML += li2[li2.length - i - 1];
		aside.lastElementChild.prepend(liItem2);
	}
}

const dropMenuHamburger = () => {
	
	hamMenu.addEventListener("click", () => {
		if(aside.className == "visible"){
			aside.style.animation = 'example 2s ease 0s 1 normal none running';
			setTimeout(() => {
			aside.className = "nonVisible";
			aside.style.animation = 'none';
			},1999);
		}else {
			aside.style.animation = 'example2 2s ease 0s 1 normal none running';
			aside.className = "visible";
			setTimeout(() => {
				aside.style.animation = 'none';
			},1999);
		}
	
	})
}
makeUrAndLi();
dropMenuHamburger();
/////////////////////////////////////////////////////////////////////////////////
const videoList = document.createElement("div");
videoList.setAttribute("class", "video-list");
videos.append(videoList);

const titlePrewVideo = document.createElement('p');
const publishedAt = document.createElement('p');
const channelTitle = document.createElement('p');
const description = document.createElement('p');

let url;
const getData = url => {

	fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=date&q=${search.value}&videoDefinition=any&videoDimension=any&videoType=any&key=${apiKey}`)

		.then(response  => {

		if(response.ok) {
			return response.json();
		} else {
			alert("Api response error");
		}
	})

	.then(data => {
		makeListOfVideos(data);
	})

	.catch(error => alert(error));
}

const makeListOfVideos = data => {
	videoList.innerHTML = "";
	data.items.map(video => {
		createVideo(video);
	})
}

const createVideo = video => {
// console.log(video.snippet.thumbnails.medium.url)
	const card = createElements(video, "section", '', '', "dataVideo");
	const descriptionText = document.createElement("article");
	var image = createElements(video, "img", '', video.snippet.thumbnails.medium.url, "imgOfVideo");

	cardOnClik(card,video);

	card.prepend(image,descriptionText);
	descriptionText.prepend(createElements(video, 'h2', 'title'), createElements(video, 'p', 'description'), createElements(video, 'p', 'channelTitle'));
	videoList.append(card);
}

const cardOnClik = (cardOn,video) => {
		cardOn.addEventListener('click',() =>{
		videoPreview.setAttribute('src','https://www.youtube.com/embed/' + video.id.videoId);
		videoPreview.classList.add('startVideo');
		videos.classList.add('videosWhenLoad');
		videoList.style.display = 'block';
		divFrame.style.display = 'block';
		currentVideoId = video.id.videoId;
		titlePrewVideo.innerHTML = video.snippet.title;
		publishedAt.innerHTML = video.snippet.publishedAt;
		channelTitle.innerHTML = video.snippet.channelTitle;
		description.innerHTML = video.snippet.description;
		divFrame.append(titlePrewVideo,publishedAt,channelTitle,description);

		getData(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&relatedToVideoId=${currentVideoId}&type=video&key=${apiKey}`);

		whenLoadVideo();
	});
}

const whenLoadVideo = () => {
		videoPreview.onload = () => {

			var videoCard = document.querySelectorAll('section .dataVideo');			
			videoCard.forEach((e,i)=>{e.classList.add('nesto');});

			var videoCardText = document.querySelectorAll('section .dataVideo article p');
			videoCardText.forEach((e,i)=>{e.style.display = 'none';});

			var videoCardTitle = document.querySelectorAll('section .dataVideo article h2');
			videoCardTitle.forEach((e,i)=>{e.style.fontSize = '100%';});

			var videoCardTitle = document.querySelectorAll('.dataVideo img');
			videoCardTitle.forEach((e,i)=>{e.style.width = '50%';});

			var videoCardTitle = document.querySelectorAll('.dataVideo article');
			videoCardTitle.forEach((e,i)=>{e.style.width = '50%';});
		}
}

const createElements = (video, type, property, url, nameClass) => {
	let element = document.createElement(type);
	if(property) {
		element.innerText = video.snippet[property];
	}
	if(type === 'img') {
		element.setAttribute("src", url);
		element.setAttribute('class', nameClass);
	}
	if(type === 'section') {
		element.setAttribute('class', nameClass);
	}
	return element;
}

const startSearch = () => {
	buttSearchLoop.addEventListener('click', () => {
		getData(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=date&q=${search.value}&videoDefinition=any&videoDimension=any&videoType=any&key=${apiKey}`);
	});

	search.addEventListener("keyup", e => {

		  if (e.keyCode === 13) {
		   e.preventDefault();
		   buttSearchLoop.click();
		  }
	});
}
startSearch();