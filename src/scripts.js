document.getElementById("addEntry").addEventListener("click", addEntry);
document.getElementById("saveEntries").addEventListener("click", save);
document.getElementById("clearAllEntries").addEventListener("click", clearAllEntries)

async function clearAllEntries(){
    // add alert to confirm
    let text = "Do you want to clear all precommitments?";
    if (confirm(text) == true) {
        // clear all elements in local storage
        await chrome.storage.local.clear();
        // get div with form
        var formDiv = document.getElementById("formDiv");
        // get form element
        var form = document.forms.entryForm;
        // remove form element
        form.remove();
        // add new form element
        var newForm = document.createElement('form');
        newForm.setAttribute("id","entryForm");
        newForm.innerHTML = '<button id="saveEntries">Save</button>'
        formDiv.appendChild(newForm);
    }
    
}


window.onload = async function() {
    const data = await chrome.storage.local.get(["entries"]);
    // if entries has value then render those entries into the view
    // else render default two example
    const entries = data['entries'];
    var form = document.forms.entryForm;
    if (entries){
        entries.forEach((entry, index, array)=> {
            // for each entry object in entry
            // get link id, link text, message_id, and message text
            // create div
            // set div innerhtml
            // add div to form
            var div = document.createElement('div');
            div.innerHTML = `<label for="${entry.linkId}">Link:</label> <input value="${entry.link}" name="${entry.linkId}" type="text"><label for="${entry.messageId}"> Message: </label><input class="link-input" value="${entry.message}" name="${entry.messageId}" type="text"> <button onclick="deleteEntry(this)">Delete</button>`;
            form.appendChild(div);

        });        
    } else {
        var div = document.createElement('div');
        const id = generateUniqueId();
        div.innerHTML = `<label for="link_${id}">Link:</label> <input placeholder="youtube.com" name="link_${id}" type="text"><label for="message_${id}"> Message: </label><input class="link-input" placeholder="I pledge to only watch youtube for 10 minutes" name="message_${id}" type="text"> <button onclick="deleteEntry(this)">Delete</button>`;
        form.appendChild(div);
    }



   }



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
    div.innerHTML = `<label for="link_${id}">Link:</label> <input placeholder="youtube.com" name="link_${id}" type="text"><label for="message_${id}"> Message: </label><input class="link-input" placeholder="I pledge to only watch youtube for 10 minutes" name="message_${id}" type="text"> <button onclick="deleteEntry(this)">Delete</button>`;
    form.appendChild(div);
}
function deleteEntry(element){
    // console.log(element);
    element.remove();

}
async function save(){
    console.log("Save clicked")
    event.preventDefault(); 
    var formEl = document.forms.entryForm;
    var formData = new FormData(formEl);
    // console.log(formData);
    const entries = Object.fromEntries(formData);
    const keys = Object.keys(entries)
    const savedEntries = []
    for (let i = 0; i < keys.length - 1; i+=2){
        const entry = {
            linkId: keys[i],
            link: entries[keys[i]],
            messageId: keys[i+1],
            message: entries[keys[i+1]]
        }
        savedEntries.push(entry);
    }
    // chrome.storage.local.set({'entries': savedEntries});
    // await chrome.storage.local.set({ name: "David", color: "green" });
    await chrome.storage.local.set({'entries': savedEntries});


}