
function generateHTML(data){
    // get the html for the repos objects
    const repoHTML = generateReposHTML(data.repos);    
    
    return `<!DOCTYPE html>
    <html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./assets/css/style.css">
        <title>Portfolio</title>
        <style>
        #name {
          width: 100%;
          overflow: overlay;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        #location {
          width: 100%;
          overflow: overlay;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .content{
          width: 100%;
          overflow: overlay;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .content article {
          background-color: white;
          width: 50%;
        }
        .content-header {
          margin: 100px 0 20px 5%;
          font-size: 2em;
          width: 100%;
        }
        .content p {
          line-height: 130%;
          font-size: 1.2em;
          text-indent: 50px;
        }
        .repo-list {

        }
        .repo-item {
          
        }
        #contact-me {
          overflow: overlay;
          width: 100%;
          background-color: white;
          display: flex;
          justify-content: space-between;
          align-content: center;
          flex-direction: column;
        }
        #contact-me-header {
          width: 95%;
          margin: 100px 0 20px 5%;
          font-size: 2em;
        }
        .hr-full {
          width: 100%;
        }
        #contact-ul {
          color: black;
          font-size: 100%;
          display: flex;
          justify-content: space-around;
          align-content: center;
          margin-right: 10px;
          font-weight: bold;
          transition: 0.4s;
          height: 100px;
          width: 80%;
          margin: 0px 10%;
          list-style: none;
          padding: 0;
        }
        #contact-ul li {
          display: flex;
          align-self: center;
        }
        .contact-link {
          text-decoration: underline;
        }
        .social-logo {
          width: 16px;
          margin-right: 15px;
        }
        </style>
    </head>
    <h1 id="name">${data.userName}</h1>
    <h2 id="location">${data.location}</h2>
    
    
    <section class='content'>
      <article>
        <h3 class='content-header'>About me</h3>
        <hr>
        <p>${data.bio}</p>
      </article>
    </section>
    
    <section class='content'>
      <article>
        <h3 class='content-header'>My GitHub Repositories</h3>
        <hr>
        <ul id="repo-list">
          ${repoHTML}
        </ul>
      </article>
    </section>
    
    <section id='contact-me'>
        <h3 id='contact-me-header'>Contact Me</h3>
        <hr class='hr-full'>
        <ul id='contact-ul'>
          <li><a href='mailto:${data.email}' target='_blank'>${data.email}</a></li>
          <li  class='contact-link'>
            <a href='${data.linkedInURL}' target='_blank'>
              <img class='social-logo' src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'>LinkedIn
            </a>
          </li>                
          <li  class='contact-link'>
            <a href='${data.gitHubURL}' target='_blank'>
              <img class='social-logo' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'>GitHub
            </a>
          </li>            
        </ul>
    <body>
        
    </body>
    </html>
    `;
}

/**
 * 
 * @param {repo[]} repos the array of relevant repo information
 */
function generateReposHTML(repos){
    ret = "";
    console.log(typeof repos);
    repos.forEach(repo => {
        ret = `${ret}<li class="repo-item"><a href="${repo.url}">${repo.name}</a></li>\n`;
    });
    return ret;
}
module.exports = generateHTML;