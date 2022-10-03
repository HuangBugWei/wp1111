let main_area = document.getElementsByClassName("main-user-space")[0];
let sub_user_area = document.getElementsByClassName("sub-user-space")[0];
let buttom_area = document.getElementsByClassName("bottom-info")[0];
let other_user = sub_user_area.children;
const user_template = other_user[0].cloneNode(true);
let add_id = 1



function add_user(){
    if (sub_user_area.style.display === "none"){
        sub_user_area.style.display = "flex";
        sub_user_area.style.width = "30%";
        main_area.style.width = "70%";
    }
    let temp = user_template.cloneNode(true);
    temp.children[2].onclick = remove_user ;
    sub_user_area.appendChild(temp);
    
    // max user 15
    if ((sub_user_area.childElementCount + main_area.childElementCount) === 15){
        this.onclick = "none";
    }
}

function remove_user(){
    this.parentNode.parentNode.removeChild(this.parentNode);
    check_anchor_area();
    check_user_num();
}

function unanchor(){
    sub_user_area.style.display = "flex";
    let anchor_user_node = main_area.children[0];
    main_area.style.flex = 0;
    anchor_user_node.children[2].children[0].style.display = "none";
    anchor_user_node.className = "sub-user-card";
    sub_user_area.append(anchor_user_node);

    anchor_user_node.children[0].children[1].onclick = anchor;
    check_anchor_area(); 
}

function anchor(){
    if (main_area.style.flex === 0){
        main_area.style.flex = 1;
        let user_node = this.parentNode.parentNode;
        user_node.className = "main-user-card";
        main_area.appendChild(user_node);
        user_node.children[0].children[1].onclick = unanchor ;
    }
    else{
        let anchor_user_node = main_area.children[0];
        main_area.style.flex = 0;
        anchor_user_node.children[2].children[0].style.display = "none";
        anchor_user_node.className = "sub-user-card";
        sub_user_area.append(anchor_user_node);
        anchor_user_node.children[0].children[1].onclick = anchor ;
        
        let user_node = this.parentNode.parentNode;
        user_node.className = "main-user-card";
        main_area.append(user_node);
        
        user_node.children[0].children[1].onclick = unanchor ;
    }
    check_anchor_area();
}

function check_anchor_area(){
    if (main_area.childElementCount === 0){
        main_area.style.flex = 0;
        let other_user = sub_user_area.children;
    }
    else{
        sub_user_area.style.display = "flex";
        main_area.style.flex = 2;
        let other_user = sub_user_area.children;
    }
}

buttom_area.lastElementChild.children[0].onclick = add_user;

// default let every user have function
for (let i = 0; i < other_user.length; i++){
    other_user[i].children[2].onclick = remove_user;
    other_user[i].children[0].children[1].onclick = anchor;
}

// main-user-area object need unanchor
main_area.children[0].children[0].children[1].onclick = unanchor;