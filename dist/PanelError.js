import React, { createRef } from "react";
import * as ReactDOM from "react-dom";

const {
  Component
} = require("react");
/**
 * префикс для именования контейнера сообщения
 * @type {number}
 */


let fif = 0;
/**
 * id контейнера модуля
 * @type {string}
 */

const containerId = "fifa-go";
/**
 * синглтон html элемента контейнера модуля
 * @type {undefined}
 */

let fiafaCon = undefined;
/**
 * Модель передатчика данных сообщения
 */

class Inserter {
  constructor({
    head,
    message,
    type,
    image,
    timeout
  }) {
    this._head = head;
    this._message = message;
    this._type = type;
    this._image = image;
    this._timeout = timeout;
  }

}
/**
 * запуск контейнера сообщений
 * @param inserter ссылка на передатчик данных InserterResident
 * @constructor
 */


function Runner(inserter) {
  const root = document.createElement('div');
  root.style.display = 'contents';
  document.body.appendChild(root);
  ReactDOM.render( /*#__PURE__*/React.createElement(PanelError, {
    inserter: inserter
  }), root);
}
/**
 * объект контейнера сообщения
 */


class PanelError extends Component {
  constructor(props) {
    super();
    this.ref = /*#__PURE__*/createRef();

    props.inserter.addInserter = i => {
      this.addCore(i);
    };
  }

  addCore(i) {
    //  console.log("KKKK",this.ref)
    const id = "fifa-" + fif++;
    const f = document.createElement('div');
    f.className = "base-p";
    f.id = id;
    i.parent = id;
    ReactDOM.render( /*#__PURE__*/React.createElement(BodyPanel, {
      insertor: i
    }), f);
    this.ref.current.appendChild(f);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      ref: this.ref,
      id: containerId,
      className: "panelContainer"
    });
  }

}
/**
 * модель передатчика данных, через нее передаются данные Inserter
 */


class InserterResident {
  addInserter(inserter) {}

}
/**
 * Объект тела сообщения
 */


class BodyPanel extends Component {
  constructor(props) {
    super();
    this.insertor = props.insertor;
    this.init();
    this.time = 0;
  }

  init() {
    if (!fiafaCon) {
      fiafaCon = document.getElementById(containerId);
    } //console.log("sd",this.insertor)


    if (this.insertor._timeout !== -1) {
      // запуск таймера гашения сообщения, если -1, сообщение не гасится
      this.time = setTimeout(() => {
        const self = document.getElementById(this.insertor.parent);

        if (self) {
          fiafaCon.removeChild(self);
        }
      }, this.insertor._timeout);
    }
  }
  /**
   * Гашение сообщения вручную
   */


  clickPanel() {
    //console.log("aas",event)
    const self = document.getElementById(this.insertor.parent);

    if (self) {
      fiafaCon.removeChild(self);
    }

    clearTimeout(this.time);
  }

  className() {
    if (this.insertor._type) {
      switch (this.insertor._type) {
        case "error":
          {
            return "panelError";
          }

        case "warning":
          {
            return "panelWarning";
          }

        case "info":
          {
            return "panelInfo";
          }

        case "success":
          {
            return "panelSuccess";
          }

        default:
          {
            return "panelError";
          }
      }
    } else {
      return "panelError";
    }
  }

  paintImage() {
    if (! /*#__PURE__*/React.isValidElement(this.insertor._image)) {
      if (typeof this.insertor._image === "string") {
        return /*#__PURE__*/React.createElement("img", {
          src: this.insertor._image,
          alt: "..",
          className: "panelImageCore"
        });
      }
    } else {
      return this.insertor._image;
    }
  }

  paintHr() {
    if (this.insertor._head || this.insertor._image) {
      return /*#__PURE__*/React.createElement("hr", {
        className: "panelHr"
      });
    }
  }

  panelHead() {
    if (this.insertor._head || this.insertor._image) {
      return /*#__PURE__*/React.createElement("div", {
        className: "panelHead"
      }, /*#__PURE__*/React.createElement("div", {
        className: "panelHeadImage"
      }, this.paintImage()), /*#__PURE__*/React.createElement("div", {
        className: "panelHeadMessage"
      }, this.insertor._head));
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.className(),
      onClick: this.clickPanel.bind(this)
    }, this.panelHead(), this.paintHr(), /*#__PURE__*/React.createElement("div", {
      className: "panelMessage"
    }, /*#__PURE__*/React.createElement("span", null, this.insertor._message)));
  }

}

const inserterR = new InserterResident();
Runner(inserterR);
/**
 *
 * @param message сообщение текст или React элемент
 * @param head  заголовок сообщение текст или React элемент
 * @param type  тип сообщения error|panelError|warning|info|success по умолчанию: error
 * @param image иконка сообщения текст или React элемент
 * @param timeout время в милисек, аосле которого сообщение будет скрыто ( -1 - сообщение скрывать вручную) по умолчанию: 5000 (5 сек)
 * @constructor
 */

export function ShowPanel({
  message,
  head,
  type = 'error',
  image,
  timeout = 5000
}) {
  inserterR.addInserter(new Inserter({
    message: message,
    image: image,
    head: head,
    timeout: timeout,
    type: type
  }));
}