(() => {

    const jobsContainerElement = document.querySelector(".jobs");
    const filterContainerElement = document.querySelector(".filter");
    const filterLabelsContainerElement = document.querySelector(".filter__labels");
    const filterLabelsClearElement = document.querySelector(".filter__clear");

    const URL = "https://nitearie.github.io/fm-job-listings-with-filtering/data.json";

    var jobs = []
    var filters = new Set();

    var filteredJobs = [];

    getJobs();

    filterLabelsClearElement.addEventListener("click", () => {

        filters.clear();

        filterLabelsContainerElement.textContent = "";

        hideFilterContainerElement();
    })
    
    function getJobs() {
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            jobs = [...data];
            filteredJobs = [...data];
            renderJobElements();
        })
    }

    function renderJobElements() {
        jobs.forEach((job) => {
            jobsContainerElement.appendChild(createJobElements(job));
        })
    }

    function renderFilteredJobElements() {
        filteredJobs.forEach((job) => {
            jobsContainerElement.appendChild(createJobElements(job));
        })
    }

    function createJobElements({
        company,
        logo,
        new: isNew,
        featured: isFeatured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools,
    }) {
        var jobCardContainerElement = document.createElement("section");
        var jobAboutContainerElement = document.createElement("div");

        var jobLabelContainerElement = document.createElement("ul");

        var jobLogoElement = document.createElement("img");
        var jobInfoContainerElement = document.createElement("div");
        var jobProfileContainerElement = document.createElement("div");
        var jobCompanyElement = document.createElement("p");
        
        var jobTitleElement = document.createElement("a");
        var jobPostingContainerElement = document.createElement("ul");
        var jobPostingDateElement = document.createElement("li");
        var jobPostingTypeElement = document.createElement("li");
        var jobPostingLocationElement = document.createElement("li");

        jobCardContainerElement.classList.add("job");
        jobAboutContainerElement.classList.add("job__about");
        jobLabelContainerElement.classList.add("job__labels");

        jobLogoElement.classList.add("job__image");
        jobInfoContainerElement.classList.add("job__info");
        jobProfileContainerElement.classList.add("job__profile");
        jobCompanyElement.classList.add("job__company");

        jobTitleElement.classList.add("job__title");
        jobPostingContainerElement.classList.add("job__posting");
        jobPostingDateElement.classList.add("job__date");
        jobPostingTypeElement.classList.add("job__type");
        jobPostingLocationElement.classList.add("job__location");

        jobLogoElement.src = logo;
        jobLogoElement.alt = company;

        jobCompanyElement.textContent = company;
        
        jobTitleElement.textContent = position;
        jobTitleElement.href = "#";

        jobPostingDateElement.textContent = postedAt;
        jobPostingTypeElement.textContent = contract;
        jobPostingLocationElement.textContent = location;



        jobProfileContainerElement.append(jobCompanyElement);

        {
            if (isNew) {
                let jobNewLabelElement = document.createElement("p");
                jobNewLabelElement.classList.add("job__special", "job__special--new");
                jobNewLabelElement.textContent = "NEW!";
                jobProfileContainerElement.appendChild(jobNewLabelElement);
            }
            
            if (isFeatured) {
                let jobFeaturedLabelElement = document.createElement("p");
                jobFeaturedLabelElement.classList.add("job__special", "job__special--featured");
                jobFeaturedLabelElement.textContent = "FEATURED";
                jobProfileContainerElement.appendChild(jobFeaturedLabelElement);

                jobCardContainerElement.classList.add("job--featured");
            }
        }

        {
            [role, level, ...languages, ...tools].forEach((label) => {

                var jobLabelElement = document.createElement("li");

                var jobLabelLinkElement = document.createElement("a");

                jobLabelElement.classList.add("job__label");
                jobLabelLinkElement.classList.add("job__link");

                jobLabelLinkElement.textContent = label;
                jobLabelLinkElement.href = "#";

                jobLabelLinkElement.addEventListener("click", () => {
                    showFilterContainerElement();
                    addLabelToFilter(label);
                    filterJobs();
                    clearJobs();
                    renderFilteredJobElements();
                })

                jobLabelElement.appendChild(jobLabelLinkElement);

                jobLabelContainerElement.appendChild(jobLabelElement);
            })
        }

        jobPostingContainerElement.append(
            jobPostingDateElement,
            jobPostingTypeElement,
            jobPostingLocationElement,
        )

        jobInfoContainerElement.append(jobProfileContainerElement, jobTitleElement, jobPostingContainerElement);

        jobAboutContainerElement.append(jobLogoElement, jobInfoContainerElement);

        jobCardContainerElement.append(jobAboutContainerElement, jobLabelContainerElement);

        return jobCardContainerElement;
    }

    function showFilterContainerElement() {
        (filterContainerElement.classList.contains("filter--hidden")) ? filterContainerElement.classList.remove("filter--hidden") : null;
    }

    function hideFilterContainerElement() {
        filterContainerElement.classList.add("filter--hidden");
    }

    function addLabelToFilter(label) {
    
        if (!filters.has(label)) {
            filters.add(label);
        } else {
            return;
        }

        var labelContainerElement = document.createElement("li");
        var labelLinkElement = document.createElement("a");
        var labelButtonElement = document.createElement("button");

        labelContainerElement.classList.add("filter__label");
        labelLinkElement.classList.add("filter__link");
        labelButtonElement.classList.add("filter__close");

        labelLinkElement.textContent = label;

        labelButtonElement.innerHTML = "&#x2716;";

        function removeLabel() {

            filters.delete(label);

            this.removeEventListener("click", removeLabel);
            
            filterLabelsContainerElement.removeChild(this.parentElement);

            if (!filters.size) {
                hideFilterContainerElement();
                clearJobs();
                renderJobElements();
            } else {
                filterJobs();
                clearJobs();
                renderFilteredJobElements();
            }


        }

        labelButtonElement.addEventListener("click", removeLabel);
        
        labelContainerElement.append(labelLinkElement, labelButtonElement);

        filterLabelsContainerElement.appendChild(labelContainerElement);
    }

    function clearJobs() {
        jobsContainerElement.textContent = "";
    }

    function filterJobs() {

        filteredJobs = jobs.filter(({ 
            role,
            level,
            languages,
            tools
        }) => {
            var labels = [role, level, ...languages, ...tools];

            var filterLabelCounter = 0;
            var neededFilterLabelCounter = filters.size;

            for ( let label of filters) {
                if (labels.includes(label)) {
                    ++filterLabelCounter;
                }
            }

            return filterLabelCounter == neededFilterLabelCounter;
        })
        
    }

})();