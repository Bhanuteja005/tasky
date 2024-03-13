const taskContainer=document.querySelector(".task__container");
const globalStore = [];
console.log(taskContainer);
const generateNewCard = (taskData) => {
    if (!taskData || !taskData.taskTitle || !taskData.taskDescription) {
        console.error('Invalid taskData:', taskData);
        return '';
    }
    return `
        <div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id}>
            <div class="card">
                <div class="card-header d-flex justify-content-end gap-3">
                    <button type="button" class="btn btn-outline-success mr-2"><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="card-body ">
                    <img class="card-img-top" src=${taskData.imageUrl} alt="Card image cap">
                    <h5 class="card-title mt-3">${taskData.taskTitle}</h5>
                    <p class="card-text">${taskData.taskDescription}</p>
                    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                </div>
            </div>
        </div>
    `;
};
const loadInitialCardData = () => {
//local storage to get tasky card data
const getCardData = localStorage.getItem("tasky");
//convert array of object to normal object
const {cards} = JSON.parse(getCardData);
//loop over those array of task object to create HTML card, inject it to DOM
cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
} );
};



const saveChanges = () => {
    const taskdata= {
        id: `${Date.now()}`,
        imageUrl: document.getElementById('imageurl').value,   
        taskTitle: document.getElementById('tasktitle').value,
        taskType: document.getElementById('tasktype').value,
        taskDescription: document.getElementById('taskdescription').value,
    };



    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskdata));
    globalStore.push(taskdata);
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));
};