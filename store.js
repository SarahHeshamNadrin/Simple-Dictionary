var fs = require('fs');

var query_method = process.argv[2];
var query_vals = '';

switch(query_method)
{ 
    case 'add':
        query_vals = process.argv[3]+':'+process.argv[4]+"\n";
        key = process.argv[3];
        if(!fs.existsSync('file.txt'))
        {
            fs.writeFile('file.txt',query_vals,(err) => {  
            
                if (err) throw err;
                console.log("key and value are added.");
            });
        }
        else
        {
            fs.readFile('file.txt',(err,data) => {
                if (err) throw err;
        
                if(data.indexOf(key) >= 0)
                {
                    console.log("Key should be unique.");
                }
                else
                {
                    fs.appendFile('file.txt',query_vals,(err) => {  
                
                        if (err) throw err;
                        console.log("key and value are appended.");
                    });
                }
            })

        }
        
        break;
    case 'list':
        fs.readFile('file.txt','utf8',(err,data) => {  
                
            if (err) throw err;
            console.log(data);            
        });
        break;
    case 'get':
        query_vals = process.argv[3] ;
        fs.readFile('file.txt','utf8',(err,data) => {  
                    
            if (err) throw err;
            var valueIndex = data.indexOf(query_vals) + query_vals.length + 1; 
            var i = valueIndex,value='';
            while(data[i] != '\n')
            {
                value += data[i];
                i++;
            }
            console.log(value)
        });
        break;
    case 'remove':
        query_vals = process.argv[3] ;
        fs.readFile('file.txt','utf8',(err,data) => {  
                    
            if (err) throw err;
            var keyIndex = data.indexOf(query_vals); 
            var i = keyIndex;
            var line = '';
            while(data[i] != '\n')
            {
                line+=data[i];
                i++;
            }
            line+=data[i]
            data = data.replace(line,"");
            fs.writeFile('file.txt',data,(err) => {  
            
                if (err) throw err;
                console.log("key and value are removed.");
            });
        });
        break;
    case 'clear':
        fs.truncate('file.txt', 0, (err) => {  
            
            if (err) throw err;
            console.log("Done Clearing.")
            
        })
        break;
    
}
