let clientMethods = {};

// Load CSS & set up nav
clientMethods.prep = function(EWD) {
  $('head').append('<link href="assets/stylesheets/bedboard.css" rel="stylesheet" />')
  $('.app-nav .dropdown-menu').append('<li><a href="#" id="app-bedboard">Bedboard</a></li>');
  
  $('#app-bedboard').on('click', function(e) {
    // Clear the page
    $('#main-content').html('');
    
    clientMethods.showWards(EWD);
  });
};

// Show Wards and Beds
clientMethods.showWards = function(EWD) {
  $('#main-content').append('<div id="wards" class="row collapse"></div>');
  
  let messageObj = {
    service: 'ewd-vista-bedboard',
    type: 'wards'
  };
  EWD.send(messageObj, function(responseObj) {
    let wards = responseObj.message.wards;
    // console.log(wards);
    
    wards.forEach(function(ward, index, array) {
      let html = '<div class="main col-md-4"><h2 class="sub-header">';
      html     = html + ward.name + '</h2><div class="table-responsive">';
      html     = html + '<table class="table table-striped"><thead><tr><td>Bed</td>';
      html     = html + '<td>Patient</td><td>Gender</td><td>Admission Date</td>';
      html     = html + '</tr></thead><tbody>';

      let beds = ward.beds;
      beds.forEach(function(bed, index, array) {
        html = html + '<tr><td>' + bed.name;
        if (bed.oos) {
          html = html + ' <span class="glyphicon glyphicon-exclamation-sign"';
          html = html + ' aria-hidden="true" title="' + bed.oos + '"></span>';
        }
        html = html + '</td><td>';
        if (bed.patient.name) {
          html = html + bed.patient.name;
        }
        html = html + '</td><td>';
        if (bed.patient.sex) {
          html = html + bed.patient.sex;
        }
        html = html + '</td><td>';
        if (bed.patient.admissionDate) {
          html = html + bed.patient.admissionDate.replace(/@.*/, '');
        }
        html = html + '</td></tr>';
      });

      html = html + '</tbody></table></div></div>';

      $('#wards').append(html);
    });

    $('#wards glyphicon-exclamation-sign').hover();

    $('#wards').show();
  });
};

module.exports = clientMethods;
