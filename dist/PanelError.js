import React, { createRef } from "react";
import "./errorMessage.css";
import * as ReactDOM from "react-dom";

const {
  Component
} = require("react");

let fif = 0;
const containerId = "fifa-go";
let fiafaCon = undefined;

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

function Runner(inserter) {
  const root = document.createElement('div');
  root.style.display = 'contents';
  document.body.appendChild(root);
  ReactDOM.render( /*#__PURE__*/React.createElement(PanelError, {
    inserter: inserter
  }), root);
}

class PanelError extends Component {
  constructor(props) {
    super();
    this.ref = /*#__PURE__*/createRef();

    props.inserter.addInserter = i => {
      this.addCore(i);
    };
  }

  addCore(i) {
    console.log("KKKK", this.ref);
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

class InserterResident {
  addInserter(inserter) {}

}

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
    }

    console.log("sd", this.insertor);

    if (this.insertor._timeout !== -1) {
      this.time = setTimeout(() => {
        const self = document.getElementById(this.insertor.parent);

        if (self) {
          fiafaCon.removeChild(self);
        }
      }, this.insertor._timeout);
    }
  }

  clickPanel() {
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
Runner(inserterR); //new PanelErrorWrapper(inserterR)

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