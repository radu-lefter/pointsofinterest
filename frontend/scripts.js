
$("#regionForm").submit(function(e) {

    e.preventDefault();

    var form = $(this);
    // var url = form.attr('action');
    
    $.ajax({
           type: "GET",
           url: "http://localhost:5000/pois/region",
           data: form.serialize(), // serializes the form's elements.
           success: function(data)
           {
               console.log(data.data); 
               var resultsTable =  document.getElementById('results');
               resultsTable.innerHTML = "";

               for(let item of data['data']){
                                    
                tr = document.createElement('tr'); 
                td = document.createElement('td'); 
                td.innerHTML += item['name'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['type'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['country'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['region'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['lon'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['lat'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['description'];
                tr.appendChild(td);
                td = document.createElement('td'); 
                td.innerHTML += item['recommendations'];
                tr.appendChild(td);
                resultsTable.appendChild(tr);
                
                }
            }
    });

});

$("#createForm").submit(function(e) {

    e.preventDefault();

    var form = $(this);
    // var url = form.attr('action');
    
    $.ajax({
           type: "POST",
           url: "http://localhost:5000/pois/",
           data: form.serialize(), // serializes the form's elements.
           success: function(data)
           {
               console.log(data); 
               var createMes =  document.getElementById('createMes');
               createMes.innerHTML = "";
               createMes.innerHTML = data.message;
            }
    });

});

