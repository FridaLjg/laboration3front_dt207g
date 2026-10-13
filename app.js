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

getWorkExperiences();