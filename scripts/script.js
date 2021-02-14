(() => {

    const jobsContainerElement = document.querySelector(".jobs");

    const URL = "https://nitearie.github.io/fm-job-listings-with-filtering/data.json";

    var jobs = []

    getJobs();
    
    function getJobs() {
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            jobs = [...data];
            renderJobElements();
        })
    }

    function renderJobElements() {
        jobs.forEach((job) => {
            jobsContainerElement.appendChild(createJobElements(job));
        })
    }

    function createJobElements({

    }) {
        var jobCardContainerElement = document.createElement("section");
        var jobAboutContainerElement = document.createElement("div");

        var jobLabelContainerElement = document.createElement("div");

        var jobLogoElement = document.createElement("img");
        var jobInfoContainerElement = document.createElement("div");
        var jobProfileContainerElement = document.createElement("div");
        var jobCompanyElement = document.createElement("p");
        
        var jobTitleElement = document.createElement("h2");
        var jobPostingContainerElement = document.createElement("ul");
        var jobPostingDateElement = document.createElement("li");
        var jobPostingTypeElement = document.createElement("li");
        var jobPostingLocationElement = document.createElement("li");

        jobCardContainerElement.classList.add("job");
        jobAboutContainerElement.classList.add("job__about");
        jobLabelContainerElement.classList.add("job__labels");

        jobLogoElement.classList.add("job__image");
        jobInfoContainerElement.classList.add("jog__info");
        jobProfileContainerElement.classList.add("job__profile");
        jobCompanyElement.classList.add("job__company");

        jobTitleElement.classList.add("job__title");
        jobPostingContainerElement.classList.add("job__posting");
        jobPostingDateElement.classList.add("job__date");
        jobPostingTypeElement.classList.add("job__type");
        jobPostingLocationElement.classList.add("job__location");

        
        

        jobAboutContainerElement.append(jobLogoElement, jobInfoContainerElement);

        jobCardContainerElement.append(jobAboutContainerElement, jobLabelContainerElement);

        return jobCardContainerElement;
    }

})();