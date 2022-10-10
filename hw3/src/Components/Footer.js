import React from "react";
function Footer(props) {
    const rmListElement = props.rmListElement;
    const updatebuttonState = props.updatebuttonState;
    const updateCompletedNum = props.updateCompletedNum;

    function filter(event) {
        if (event.target.tagName === "BUTTON") {
            const li_elements = document.querySelectorAll("li");

            const buttons = event.target.parentElement.querySelectorAll("button");
            buttons.forEach(button => button.style.background="lightgray");
            
            event.target.style.background="gray";

            updatebuttonState(event.target.id);

            if (event.target.id === "all") {
                li_elements.forEach(li => {li.style.display="flex";})

            } else if (event.target.id === "active") {
                li_elements.forEach(
                    li => {
                        if (li.querySelector("input").checked)
                            li.style.display="none";
                        else
                            li.style.display="flex";})

            } else if (event.target.id === "completed") {
                
                li_elements.forEach(
                    li => {
                        if (li.querySelector("input").checked)
                            li.style.display="flex";
                        else
                            li.style.display="none";})
            } else {
                event.target.style.background="lightgray";
                li_elements.forEach(
                    li => {
                        if (li.querySelector("input").checked) {
                            rmListElement(li);
                            updateCompletedNum(-1);
                        }
                    })
            }
        }
    }

    return (
        <footer className="todo-app__footer" id="todo-footer" onClick={filter}>
            <div className="todo-app__total">
                <span>{props.leftNum}</span> left
            </div>
            <ul className="todo-app__view-buttons">
                <button id="all">All</button>
                <button id="active">Active</button>
                <button id="completed">Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button className="cleanButton">Clear completed</button>
            </div>
        </footer>
    )
}

export default Footer;