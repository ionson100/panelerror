# Панель для проекта ауди

Очередь сообщений в виде панелей, (ошибка, предупреждение, инфо, успех)
возможность гашение показа через определенный интервал, или по клику на панели
### Стили
```css
/*суб контейнер сообщения*/
.base-p{
    margin: 10px;  animation: showBlock 1s linear forwards;
}
/*Контейнер модуля сообщений*/
.panelContainer{
    position: fixed;
    top: 10px;
    left: 10px;

}
/*стиль для типа: ошибка*/
.panelError{
    background: red;
    color: white;
    width: 200px;
    height: 100px;
}
/* плавная анимация для показа*/
@keyframes showBlock {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
/*стиль для типа: предупреждение*/
.panelWarning{
    background: #efdb59;
    color: white;
    width: 200px;
    height: 100px;
}
/*стиль для типа: инфо*/
.panelInfo{
    background: #389bf1;
    color: white;
    width: 200px;
    height: 100px;
}
/*стиль для типа: успех*/
.panelSuccess{
    background: #77ea86;
    color: white;
    width: 200px;
    height: 100px;
}
/* панель заголовка сообщения*/
.panelHead{
    display: inline-flex;
}
/*панель тела сообщения*/
.panelMessage{
    padding: 5px;
}
/*панель иконки заголовка сообщения*/
.panelHeadImage{
padding: 5px;
}
/*панель содержания заголовка сообщения*/
.panelHeadMessage{
    padding: 5px;
 color: red;
}
/*стиль иконки, если выбрано задание как строка*/
.panelImageCore{
 width: 20px; height: 20px;
}
.panelError .panelHeadMessage{
    color: white;
}
/*стиль разделителя между заголовком и телом.*/
.panelHr{

}

```
Установка:
```
npm install https://github.com/ionson100/panelerror.git

```
Использование:
```javascript
import {ShowPanel} from "panelerror/";
import "panelerror/dist/errorMessage.css"; /*или своя реализация*/


ShowPanel({message:"Simple text",image:"logo192.png",head:"Error",timeout:-1});
ShowPanel({message:"Simple text",image:"logo192.png",head:"Success",timeout:-1,type:"success"});
ShowPanel({message:"Simple text",timeout:-1,type:"info"});



/**
 *
 * @param message {string|JSX element} сообщение текст или React элемент
 * @param head  {string|JSX element} заголовок сообщение текст или React элемент
 * @param type {string}  тип сообщения error|panelError|warning|info|success по умолчанию: error
 * @param image {string|JSX element} иконка сообщения текст или React элемент
 * @param timeout {number} время в милисек, аосле которого сообщение будет скрыто ( -1 - сообщение скрывать вручную) по умолчанию: 5000 (5 сек)
 */
export function ShowPanel({message,head,type='error',image,timeout=5000});
```