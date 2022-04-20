
function generateHTML(data){
    const gitHubLink = `https://github.com/${data.gitHubURL}`
    return `<!DOCTYPE html>
    <html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./assets/css/style.css">
        <title>Portfolio</title>
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
          <li id="'repo-item">first repo</li>
          <li id="'repo-item">second repo</li>
          <li id="'repo-item">third repo</li>
          <li id="'repo-item">fourth repo</li>
        </ul>
      </article>
    </section>
    
    <section id='contact-me'>
        <h3 id='contact-me-header'>Contact Me</h3>
        <hr class='hr-full'>
        <ul id='contact-ul'>
          <li><a href='mailto:${data.email}' target='_blank'>${data.email}</a></li>
          <li  class='contact-link'>
            <a href='${data.linkedInUrl}' target='_blank'>
              <img class='social-logo' src='./assets/images/linkedin.png'>LinkedIn
            </a>
          </li>                
          <li  class='contact-link'>
            <a href='${gitHubLink}' target='_blank'>
              <img class='social-logo' src='./assets/images/github.png'>GitHub
            </a>
          </li>            
        </ul>
    <body>
        
    </body>
    </html>
    `
    + data;
}

module.exports = generateHTML;