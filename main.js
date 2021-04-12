//Selection

const postInput = document.querySelector('#postInput');
const postListUL = document.querySelector('.postCollection')
const msg = document.querySelector('.msg');
const submitBtn = document.querySelector('#SubmitBtn');
const postDelete = document.querySelector('.postDelete');
const filterInput = document.querySelector('#filter');

//Data /State
let postData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let items = '';
    if (localStorage.getItem('postItems') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('postItems'));
    }
    return items;
  }
  
  function saveDataToLocalStorage(item) {
    let items = '';
    if (localStorage.getItem('postItems') === null) {
      items = [];
      items.push(item);
      localStorage.setItem('postItems', JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem('postItems'));
      items.push(item);
      localStorage.setItem('postItems', JSON.stringify(items));
    }
  }
  function deleteItemFromLocalStorage(id) {
    const items = JSON.parse(localStorage.getItem('postItems'));
    let result = items.filter(postItem => {
      return postItem.id !== id;
    });
    localStorage.setItem('postItems', JSON.stringify(result));
    if (result.length === 0) location.reload();
  }


//creat post/element
function getPostData(postList){
    if(postData.length > 0){
        msg.style.display = 'none';
          postList.forEach(postList => {
            let li = document.createElement('li')
            li.className = 'list-group-item postCollection-item'
            li.id = `post-${postList.id}`
            li.innerHTML = `
            <span>${postList.text}</span>
            <i class="far fa-trash-alt float-right ml-3 postDelete"></i>
            <i class="far fa-clock float-right">${moment().format('MMMM Do YYYY, h:mm:ss a')}</i>
            `
            postListUL.appendChild(li);
        })
    } else {
      msg.style.display = 'block';
    }
};


//submit post & validation
submitBtn.addEventListener('click' , () => {
    const text = postInput.value
    let id;

    if(postData.length === 0){
        id = 0;
    }else{
        id = postData[postData.length - 1].id + 1;
    }
    if(text === ''){
        alert('Please write your post before Submit.')
    } else if( text.length > 280){
        alert('You have to write your post within 280 characters.')
    } else {
        const data = {
        id ,
        text
        };
    postData.push(data);
    saveDataToLocalStorage(data);
    postListUL.innerHTML = '';
    getPostData(postData);
    postInput.value = '';
    }
});


//Delete post
postListUL.addEventListener('click' , (e)=>{
    if (e.target.classList.contains('postDelete')){

        //removing target from the UI
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target); 
        
        //removing item from the store

        //getting id
        const id = parseInt(target.id.split('-')[1]);

        //return result
        let result = postData.filter( post => {
          return post.id !== id;
        });
        postData = result;
        deleteItemFromLocalStorage(id);
    }
});
