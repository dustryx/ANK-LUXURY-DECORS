document.getElementById("about-link").addEventListener("click", function(event) {
    event.preventDefault();
    toggleSection("about");
});

document.getElementById("services-link").addEventListener("click", function(event) {
    event.preventDefault();
    toggleSection("services");
});

document.getElementById("updates-link").addEventListener("click", function(event) {
    event.preventDefault();
    toggleSection("updates");
});

document.getElementById("contact-link").addEventListener("click", function(event) {
    event.preventDefault();
    toggleSection("contact");
});

function toggleSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.add("hidden");
    });

    // Show the selected section
    document.querySelector(`.${sectionId}`).classList.remove("hidden");
}

document.getElementById("home-link").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.reload();
});

fetch("http://localhost:3000/posts")
    .then((data) => data.json())
    .then((posts) => {
        displayPosts(posts);
    });

function displayPosts(posts) {
    let cardsContainer = document.getElementById("cardsContainer");

    for (post of posts) {
        cardsContainer.innerHTML += `
        <div class="block mx-auto w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img src="${post.image}" class="w-full" alt="loading..." />
            <div class="flex justify-between my-3">
                <i onclick="deletePost(${post.id})" class="fa fa-trash text-3xl" aria-hidden="true"></i>
                <i onclick="editPost(${post.id})" class="fa fa-pencil-square-o text-3xl" aria-hidden="true"></i>
            </div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
        </div>
        `;
    }
}

function editPost(id) {
    fetch(`http://localhost:3000/posts/${id}`)
        .then((data) => data.json())
        .then((post) => {
            const update_container = document.getElementById("update_container");

            update_container.innerHTML = `
            <h4 class="text-center">Update Post</h4>
            <div class="max-w-md mx-auto">
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text" value="${post.title}" id="title_update" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Title</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="text"  value="${post.image}" id="image_update" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Image Link</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <textarea type="text" id="description_update" rows="3" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >
                        ${post.description}
                    </textarea>
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        description</label>
                </div>

                <button onClick="update_post(${id})" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
            `;
        });
}

function update_post(id) {
    const title = document.getElementById("title_update").value;
    const image = document.getElementById("image_update").value;
    const description = document.getElementById("description_update").value;

    fetch(`http://localhost:3000/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, image: image, description: description }),
    })
        .then((data) => data.json())
        .then((response) => {
            alert("Post updated successfully");
        });
}

function deletePost(id) {
    fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
    })
        .then((data) => data.json())
        .then((posts) => {
            displayPosts(posts);
        });
}

document.getElementById("postForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, image: image, description: description, views: 0 }),
    })
        .then((data) => data.json())
        .then((response) => {
            alert("Post added successfully");
        });
});
