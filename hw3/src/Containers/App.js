import React, { Component } from 'react';
import Header from '../Components/Header';
import Section from '../Components/Section'
import Footer from '../Components/Footer'


class App extends Component {
    // allListNum, leftNum and completed seem similar
    // however, if we want to complete advanced functions
    // we need to define it seperately
    // allListNum => whether footer is visible or not
    // leftNum => tracking and show in footer
    // comletedNum => whether Clear completed button is visible or not
    // last, buttonState is for tracking which button is pressed and which lis should be showed

    state = {
        allListNum: 0,
        leftNum: 0,
        completedNum: 0,
        buttonState: "all"
    };

    updateAllListNum = (num) => {
        this.setState(state => ({ allListNum: state.allListNum + num }),
        () => {
            const footer = document.getElementsByClassName("todo-app__footer")[0];
            if (this.state.allListNum === 0) {
            footer.style.display = "none";
            } else {
            footer.style.display = "flex";
            }
        });
    }

    rmListElement = (element) => {
        element.remove();
        this.updateAllListNum(-1);
    }

    updateLeftNum = (num) => {
        this.setState(state => ({ leftNum: state.leftNum + num }));
    }

    updateCompletedNum = (num) => {
        this.setState(state => ({ completedNum: state.completedNum + num }),
        () => {const clearButton = document.getElementsByClassName("cleanButton")[0];
                if (this.state.completedNum === 0) {
                    clearButton.style.visibility="hidden";
                } else {
                    clearButton.style.visibility="visible";
                }
            }
        );
    }
  
    updatebuttonState = (button) => {
        this.setState(state => ({ buttonState: button }));
    }
  
    render() {
        return (
            <div className="todo-app__root">
                <Header />
                
                <Section
                updateAllListNum={this.updateAllListNum}
                updateLeftNum={this.updateLeftNum}
                rmListElement={this.rmListElement}
                buttonState={this.state.buttonState}
                updateCompletedNum={this.updateCompletedNum} />
                
                <Footer
                leftNum={this.state.leftNum}
                rmListElement={this.rmListElement}
                updatebuttonState={this.updatebuttonState}
                buttonState={this.state.buttonState}
                updateCompletedNum={this.updateCompletedNum} />
            </div>
        );
    }
}

export default App;

// NOTE:
// <div className='todo-app__root' id='root'>
//   <header className='todo-app__header'>
//     <h1 className="todo-app__title">todos</h1>
//   </header>
//   <section className='todo-app__main'>
//     <input className='todo-app__input' placeholder='What needs to be done?'>What needs to be done?</input>
//     <ul className='todo-app__list' id='todo-list'>
//       <li className='todo-app__item'>
//         <div className='todo-app__checkbox'></div>
//         <h1 className='todo-app__item-detail'></h1>
//         <img src='./img/x.png' className='todo-app__item-x' />
//       </li>
//     </ul>
//   </section>
//   <footer className='todo-app__footer'>
//     <div className='todo-app__total'></div>
//     <ul className='todo-app__view-buttons'></ul>
//     <div className='todo-app__clean'></div>
//   </footer>
// </div>