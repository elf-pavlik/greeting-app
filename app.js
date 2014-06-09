document.addEventListener("DOMContentLoaded", (function(){
  API_URL = 'http://localhost:8754';

  var agent = {};

  function renderProfile(profile){
    document.querySelector('#avatar').src = profile.image;
    document.querySelector('#name').innerHTML = profile.name;
  }

  var login = function(assertion){
    superagent.post(API_URL + '/auth/login')
    .withCredentials()
    .send({ assertion: assertion })
    .end(function(response){
      if(response.status === 200){
        var data = response.body;
        console.log('Persona.onlogin()', data);
        agent.persona = data;
        renderProfile(data.profile);
      } else {
        // FIXME handle case of 403 etc.
      }
    });
  };

  var logout =  function(){
    // FIXME decide if needs to sent assertion!
    superagent.post(API_URL + '/auth/logout')
    .withCredentials()
    .end(function(response){
      console.log('Persona.onlogout()', response);
      agent = {};
    });
  };

  // mozilla persona
  navigator.id.watch({
    loggedInagent: null,
    onlogin: login,
    onlogout: logout
  });

}));
