window.onload = getWorkExperiences;

//Hämtar arbetserfarenheter från API
async function getWorkExperiences() {
    const response = await fetch("http://localhost:3000/workexperiences");
    const data = await response.json();
    const workExperienceList = document.getElementById("workexperience-list");

    data.forEach(work => {
        workExperienceList.innerHTML += `
            <li>
                <h3>${work.companyname}</h3>
                <p>${work.jobtitle}</p>
                <p>${work.location}</p>
            </li>
        `;
    });
}

const form = document.getElementById("workexperience-form");

//Eventlyssnare
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Hämtar värden från inputfält
    const companyname = document.getElementById("companyname").value;
    const jobtitle = document.getElementById("jobtitle").value;
    const location = document.getElementById("location").value;

    //Validering
    const errorMessages = document.getElementById("error-messages");
    errorMessages.innerHTML = "";

    if (!companyname) {
        errorMessages.innerHTML += "<li>Arbetsgivare måste anges!</li>";
    }

    if (!jobtitle) {
        errorMessages.innerHTML += "<li>Arbetsroll måste anges!</li>";
    }

    if (!location) {
        errorMessages.innerHTML += "<li>Plats måste anges!</li>";
    }

    if (errorMessages.innerHTML !== "") {
        return;
    }

    //Skapa objekt
    const workExperience = {
        companyname,
        jobtitle,
        location
    };

    //Post
    const response = await fetch("http://localhost:3000/workexperiences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workExperience)
    });

    const data = await response.json();

    console.log(data);

});