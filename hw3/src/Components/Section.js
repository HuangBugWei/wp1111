import React, { useState } from 'react'

function Section(props) {
    const updateAllListNum = props.updateAllListNum;
    const updateLeftNum = props.updateLeftNum;
    const rmListElement = props.rmListElement;
    const updateCompletedNum = props.updateCompletedNum;
    const buttonState = props.buttonState;
    

    const [text, setText] = useState("");
    const [id, changeId] = useState(0);

    function createListElement(text) {
        const appList = document.getElementsByClassName("todo-app__list")[0];
        const listElement = document.createElement("li");
        listElement.classList.add("todo-app__item");
        // will cause error if we don't set unique id
        // the id will be ambiguity
        listElement.innerHTML = `
        <div class="todo-app__checkbox">
            <input id="${id}" type="checkbox"/>
            <label for="${id}"></label>
        </div>
        <h1 class="todo-app__item-detail">${text}</h1>
        <img src="./x.png" class="todo-app__item-x">`;
        appList.appendChild(listElement);
        changeId(id + 1);
        updateLeftNum(1);
    }

    function add2List(event) {
        if (event.key === "Enter" && text.length > 0) {
            createListElement(text);
            setText("");
            updateAllListNum(1);
        }
    }

    // give "todo-app__view-buttons" the corresponding functions
    function updateShowedList(event) {
        if (event.target.tagName === "INPUT") {
            if (event.target.checked) {
                if (buttonState==="active"){
                    event.target.parentElement.parentElement.style.display="none";
                }
                event.target.parentElement.nextElementSibling.style.textDecoration="line-through";
                event.target.parentElement.nextElementSibling.style.opacity=0.3;
                updateLeftNum(-1);
                updateCompletedNum(1);
                
            } else {
                if (buttonState==="completed"){
                    event.target.parentElement.parentElement.style.display="none";
                }
                event.target.parentElement.nextElementSibling.style.textDecoration="none";
                event.target.parentElement.nextElementSibling.style.opacity=1;
                updateLeftNum(1);
                updateCompletedNum(-1);   
            }
        }
    }

    function delListElement(event) {
        if (event.target.tagName === "IMG") {
            let checked = event.target.parentElement.querySelector('input').checked;
            rmListElement(event.target.parentElement);
            if (!checked) {
                updateLeftNum(-1);
            }else{
                updateCompletedNum(-1);   
            }
        }
    }

    return (
        <section className="todo-app__main">
            <input className="todo-app__input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={add2List}
                placeholder="What needs to be done?" />

            <ul className="todo-app__list" id="todo-list"
                onClick={ (e) => {delListElement(e);
                                updateShowedList(e);}} />
        </section>
    )
}

export default Section;
