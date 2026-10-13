window.onload = getWorkExperiences;

//Hämtar arbetserfarenheter från API
async function getWorkExperiences() {
    const workExperienceList =
        document.getElementById("workexperience-list");

    if (!workExperienceList) {
        return;
    }

    const response = await fetch("http://localhost:3000/workexperiences");
    const data = await response.json();

    data.forEach(work => {
        workExperienceList.innerHTML += `
            <li>
                <h3>${work.companyname}</h3>
                <p>${work.jobtitle}</p>
                <p>${work.location}</p>

                <button onclick="deleteWorkExperience('${work._id}')">
                Ta bort
            </button>
            </li>
        `;
    });
}

const form = document.getElementById("workexperience-form");

//Eventlyssnare
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const workExperienceList = document.getElementById("workexperience-list");

        //Hämtar värden från inputfält
        const companyname = document.getElementById("companyname").value;
        const jobtitle = document.getElementById("jobtitle").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

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
            location,
            description
        };

        //Post
        console.log("Ska skicka POST-anrop");

        const response = await fetch("http://localhost:3000/workexperiences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workExperience)
        });

        const data = await response.json();

        window.location.href = "index.html";

        workExperienceList.innerHTML += `
    <li>
        <h3>${data.companyname}</h3>
        <p>${data.jobtitle}</p>
        <p>${data.location}</p>
    </li>
`;
    });
}

//Delete
async function deleteWorkExperience(id) {

    const response = await fetch(
        `http://localhost:3000/workexperiences/${id}`,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {
        window.location.reload();
    }
}