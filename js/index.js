document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('#github-form');
    const userList = document.querySelector('#user-list');
    const repoList = document.querySelector('#repos-list')

    form.addEventListener('submit', function(e){
        e.preventDefault()
        userList.innerHTML = '';
        repoList.innerHTML = '';

        fetch(`https://api.github.com/search/users?q=${e.target[0].value}`, {method: 'GET', headers:{
            'Accept': 'application/vnd.github.v3+json'
        }})
        .then(resp => resp.json())
        .then(obj => {
            for (item in obj){
                let itemNames = obj[item];
                if (typeof itemNames === 'object'){
                    itemNames.forEach(result => {
                        let li = document.createElement('li');
                        li.addEventListener('click', function(e){
                            fetch(`https://api.github.com/users/${e.target.innerText}/repos`)
                            .then(resp => resp.json())
                            .then(obj => {
                                console.log(obj)
                                userList.hidden = true;
                                obj.forEach(repo => {
                                    let li = document.createElement('li');
                                    let h3 = document.createElement('h3');
                                    let h4 = document.createElement('h4');
                                    let p = document.createElement('p');
                                    h3.innerText = `Name: ${repo.name}`
                                    h4.innerText = `Repo ID: ${repo.id}`
                                    p.innerText = `Repo URL: ${repo.url}`
                                    li.appendChild(h3);
                                    li.appendChild(h4);
                                    li.appendChild(p);
                                    repoList.appendChild(li)
                                })
                            })
                        })
                        li.innerText = result.login
                        userList.appendChild(li)
                    })
                }
            }
        })
    })
})