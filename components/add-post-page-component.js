import { renderHeaderComponent } from './header-component.js';
import { renderUploadImageComponent } from './upload-image-component.js';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
        // @TODO: Реализовать страницу добавления поста
        const appHtml = `
          <div class="page-container">
              <div class="header-container"></div>
              <div class="form">
                <h3 class="form-title">Добавить пост</h3>
                  <div class="upload-image-container"></div>
                  
                  <label>
                      Опишите фотографию:
                      <textarea class="input textarea" rows="4"></textarea>
                  </label>                  
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>;
        `;

        appEl.innerHTML = appHtml;

        const uploadImageContainer = document.querySelector(
            '.upload-image-container',
        );
        const textAreaContainer = document.querySelector('.textarea');

        let imageURL = '';
        renderUploadImageComponent({
            element: uploadImageContainer,
            onImageUrlChange: (url) => {
                imageURL = url;
            },
        });

        document.getElementById('add-button').addEventListener('click', () => {
            onAddPostClick({
                description: textAreaContainer.value,
                imageUrl: imageURL,
            });
        });

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        });
    };

    render();
}
