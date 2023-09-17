document.getElementById("addEntry").addEventListener("click", addEntry);
document.getElementById("saveEntries").addEventListener("click", save);

function generateUniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

function addEntry(){
    // console.log("Called add entry");
    var form = document.forms.entryForm;
    var div = document.createElement('div');
    const id = generateUniqueId();
    div.setAttribute("id", `entry_${id}`);
    div.innerHTML = `<label for="link_${id}">Link:</label> <input placeholder="youtube.com" name="link_${id}" type="text"><label for="message_${id}"> Message: </label><input class="link-input" placeholder="I pledge to only watch youtube for 10 minutes" name="message_${id}" type="text"> <button onclick="deleteEntry(entry_${id})">Delete</button>`;
    form.appendChild(div);
}
function deleteEntry(element){
    // console.log(element);
    element.remove();

}
function save(){
    event.preventDefault(); 
    var formEl = document.forms.entryForm;
    var formData = new FormData(formEl);
    // console.log(Object.fromEntries(formData));
}