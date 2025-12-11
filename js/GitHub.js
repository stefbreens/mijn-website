
let owner = 'stefbreens';

let repo = 'mijn-website';

let commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`;
// Function to fetch data using fetch
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Function to retrieve and display the first 5 top stories with their links to Hacker News comments
const showLatestCommits = async () => {
    try {
        // Haal de laatste commits op
        let commits = await fetchData(commitsUrl);
        console.log(commits);

        const list = document.getElementById('news');
        if (!list) return;

        list.innerHTML = ''; 

        // Loop door de eerste 5 commits
        for (const commit of commits) {
            const message = commit.commit.message;
            const author = commit.commit.author.name;
            const date = new Date(commit.commit.author.date);

            const formattedDate = date.toLocaleString('nl-BE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

          
            const listItem = document.createElement('li');

            
            const link = document.createElement('a');
            link.textContent = message;
            link.href = commit.html_url;   
            link.target = '_blank';

           
            const meta = document.createElement('div');
            meta.classList.add('small');
            meta.textContent = `door ${author} op ${formattedDate}`;

            listItem.appendChild(link);
            listItem.appendChild(meta);
            list.appendChild(listItem);
        }
    } catch (error) {
        console.error('Er trad een fout op:', error);
        const list = document.getElementById('news');
        if (list) {
            list.innerHTML = '<li>Kon GitHub-updates niet laden.</li>';
        }
    }
};

// Call the function to display the first 5 top stories with their links to comments
showLatestCommits();