import { USER_POSTS_PAGE } from '../routes.js';
import { renderHeaderComponent } from './header-component.js';
import { posts, goToPage, user } from '../index.js';
import { formatDistanceToNow } from '../node_modules/date-fns/formatDistanceToNow.js';
import { ru } from '../node_modules/date-fns/locale.js';

export function renderPostsPageComponent({ appEl, onLikeClick }) {
    const postsHTML = posts
        .map((post) => {
            return `
          <li class="post">
            <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
            </div>          
            
            <div class="post-image-container" style = "position: relative; overflow: hidden;">
              <img class="post-background-image" src="${post.imageUrl}">
              <img class="post-image" src="${post.imageUrl}" style = "z-index: 10" >
              
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button" data-post-isLiked = "${post.isLiked}" title="${'Лайкнувшие: ' + post.likes.map((like) => like.name).join(', ')}">
                <img src="./assets/images/like${post.isLiked ? '' : '-not'}-active.svg">
              </button>
              <p class="post-likes-text" id="post-likes-text${post.id}">
                Нравится: <strong>${post.likes.length}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${formatDistanceToNow(post.createdAt, { locale: ru, addSuffix: true })}
            </p>
          </li>`;
        })
        .join('');

    const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHTML}
                </ul>
              </div>`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    });

    for (let userEl of document.querySelectorAll('.post-header')) {
        userEl.addEventListener('click', () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            });
        });
    }

    if (user)
        for (let likeBtnEl of document.querySelectorAll('.like-button')) {
            likeBtnEl.addEventListener('click', () => {
                let post;
                onLikeClick({
                    id: likeBtnEl.dataset.postId,
                    isLiked: JSON.parse(likeBtnEl.dataset.postIsliked),
                }).then((data) => {
                    debugger;
                    post = data.post;
                    likeBtnEl.querySelector('img').src =
                        `/assets/images/like${data.post.isLiked ? '' : '-not'}-active.svg`;
                    likeBtnEl.dataset.postIsliked = data.post.isLiked;
                    likeBtnEl.title =
                        'лайкнувшие' +
                        data.post.likes.map((like) => like.name).join(', ');

                    document.querySelector(
                        `#post-likes-text${data.post.id}`,
                    ).innerHTML = `
              <p class="post-likes-text">
                Нравится: <strong>${data.post.likes.length}</strong>
              </p>`;
                });
            });
        }
}
