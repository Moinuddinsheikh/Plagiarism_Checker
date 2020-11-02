window.$ = window.jQuery =  require('jquery');
// import { spawn } from "child_process"; 

$(document).ready(function(){
    var ld = $(".load");

    $('#scan-btn').click(function(){
        var source_text = $('#source-text').val();
        var target_text = $('#target-text').val();
        if(source_text == "" || target_text == ""){
            alert("Please provide source and target text!");
            return false;
        }
        ld.fadeIn();
        var process = spawn('python',["text_given.py",source_text,target_text] ); 
        process.stdout.on('data', function(data) {
            ld.fadeOut(); 
            var s = data.toString();
            s = parseFloat(s).toFixed(2);
            // alert(s);
            $('.progress-bar').css('width',s+'%');
            $('#remark').html("Remarks: Source text matches "+s+"% with the Target text.");
        }); 
    });

    var holder2 = document.getElementById('source-holder');
    holder2.ondragover = function () { $(this).addClass('hover'); return false; };
    holder2.ondrop = function (e) {
        ld.fadeIn();
        $(this).toggleClass('hover hidden');
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        nm = file.name;
        var ext = nm.substring((nm.indexOf('.')+1),nm.length);
        if (ext=="txt"){
            var process = spawn('python',["txt_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#source-text').html(s);
            }); 
        }
        else if(ext == "docx"){
            var process = spawn('python',["word_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#source-text').html(s);
            });
        }
        $('.source-drop-row').fadeOut();
        $('#source-import-cancel-btn').fadeOut();
        $('.source-row').delay(400).fadeIn();
        $('#source-import-btn').delay(400).fadeIn();
        ld.fadeOut();
        $(this).toggleClass('hidden');
    };

    var holder3 = document.getElementById('target-holder');
    holder3.ondragover = function () { $(this).addClass('hover'); return false; };
    holder3.ondrop = function (e) {
        ld.fadeIn();
        $(this).toggleClass('hover hidden');
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        nm = file.name;
        var ext = nm.substring((nm.indexOf('.')+1),nm.length);
        if (ext=="txt"){
            var process = spawn('python',["txt_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#target-text').html(s);
            }); 
        }
        else if(ext == "docx"){
            var process = spawn('python',["word_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#target-text').html(s);                
            });
        }
        $('.target-drop-row').fadeOut();
        $('#target-import-cancel-btn').fadeOut(); 
        $('.target-row').delay(400).fadeIn();     
        $('#target-import-btn').delay(400).fadeIn();
        ld.fadeOut();
        $(this).toggleClass('hidden');
    };  

    var holder4 = document.getElementById('online-source-holder');
    holder4.ondragover = function () { $(this).addClass('hover'); return false; };
    holder4.ondrop = function (e) {
        ld.fadeIn();
        $(this).toggleClass('hover hidden');
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        nm = file.name;
        var ext = nm.substring((nm.indexOf('.')+1),nm.length);
        if (ext=="txt"){
            var process = spawn('python',["txt_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#online-textarea').html(s);
            }); 
        }
        else if(ext == "docx"){
            var process = spawn('python',["word_link_extract.py",file.name] );
            process.stdout.on('data', function(data) { 
                var s = data.toString();
                $('#online-textarea').html(s);
            });
        }
        $('.online-source-drop-row').fadeOut();
        $('#online-source-cancel-btn').fadeOut();
        $('#online-source-import-btn').delay(400).fadeIn();
        $('.online-source-clear-btn').delay(400).fadeIn();
        $('.formgroup-file').delay(400).fadeIn();
        ld.fadeOut();
        $(this).toggleClass('hidden');
    };

    $('#source-import-btn').click(function(){
        $('.source-row').fadeOut();
        $('#source-import-btn').fadeOut();
        $('.source-drop-row').delay(400).fadeIn();
        $('#source-import-cancel-btn').delay(400).fadeIn();
    });

    $('#target-import-btn').click(function(){
        $('.target-row').fadeOut();
        $('#target-import-btn').fadeOut();
        $('.target-drop-row').delay(400).fadeIn();
        $('#target-import-cancel-btn').delay(400).fadeIn();
    });

    $('#source-import-cancel-btn').click(function(){
        $('.source-drop-row').fadeOut();        
        $('#source-import-cancel-btn').fadeOut();
        $('.source-row').delay(400).fadeIn();
        $('#source-import-btn').delay(400).fadeIn();
    });

    $('#target-import-cancel-btn').click(function(){
        $('.target-drop-row').fadeOut();
        $('#target-import-cancel-btn').fadeOut();
        $('.target-row').delay(400).fadeIn();
        $('#target-import-btn').delay(400).fadeIn();
    });

    $('.source-clear').click(function(){
        $('#source-text').val("");
    });

    $('.target-clear').click(function(){
        $('#target-text').val("");
    });

    $('.result-back-btn').click(function(){
        $('.app-content-online-result').fadeOut();
        $('.app-content-online').fadeIn();
    });

    $('#online-source-import-btn').click(function(){
        $('.formgroup-file').fadeOut();
        $('#online-source-import-btn').fadeOut();
        $('.online-source-clear-btn').fadeOut();
        $('.online-source-drop-row').delay(400).fadeIn();
        $('#online-source-cancel-btn').delay(400).fadeIn();
    });


    $('#online-source-cancel-btn').click(function(){
        $('.online-source-drop-row').fadeOut();
        $('#online-source-cancel-btn').fadeOut();
        $('.formgroup-file').delay(400).fadeIn();
        $('#online-source-import-btn').delay(400).fadeIn();
        $('.online-source-clear-btn').delay(400).fadeIn();
    });

    $('.online-source-clear-btn').click(function(){
        $('#online-textarea').html("");
    });

    $('#option-1').click(function(){        
        $('.app-content-online').fadeOut();
        $('.app-content').fadeIn();
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#online-topic').val("");
        $('#online-textarea').val("");
        $('.result-tbl tbody').find('tr:lt(5)').remove();
    });

    $('#option-2').click(function(){
        $('.app-content').fadeOut();
        $('.app-content-online').fadeIn();
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#source-text').val("");
        $('#target-text').val("");
        $('.progress-bar').css('width','0%');
        $('#remark').html("Remarks: ");
    });

    $('.load-cancel').click(function(){
        $('.load-cancel').css("display","none");
        ld.fadeOut();
    });

    $('#online-scan-btn').click(function(){
        var topic = $('#online-topic').val();
        var onlinetext = $('#online-textarea').html();
        if (topic == "" || onlinetext == ""){
            alert("Please provide topic name and source text!");
            return false;
        }
        ld.fadeIn();
        $('.load-cancel').css("display","block");
        var link_arr; var s;
        var process_1 = spawn('python',["links_extract.py",topic] ); 
        var res_tbl = $('table tbody tr:last');
        process_1.stdout.on('data', function(data) { 
            s = data.toString();  
            s = s.substring(1,(s.length-2));
            s = s.split("'").join("");
            link_arr = s.split(', ');
            $('.app-content-online').fadeOut();
            $('.app-content-online-result').fadeIn();
            res_tbl.fadeIn();
            $('.load-cancel').css("display","none");
            ld.fadeOut();
            console.log(link_arr);
            // console.log(link_arr[0]);
            var process_2 = spawn('python', ["webpage_extract.py", link_arr[0]]);
            process_2.stdout.on('data', function (data1) {
                var s2 = data1.toString();
                var process_22 = spawn('python', ["online_text_given.py", onlinetext]);
                process_22.stdout.on('data', function (data) {
                    var s4 = data.toString();
                    s4 = parseFloat(s4).toFixed(2);
                    //console.log('--'+s2.trim()+'--'+s4);
                    if(s2.trim() == "yes" && s4 != 0.00){
                        res_tbl.before("<tr><td>"+link_arr[0]+"</td><td>"+s4+"</td></tr>");
                    }
                    else{
                        res_tbl.before("<tr><td>"+link_arr[0]+"</td><td>Forbidden webpage!</td></tr>");
                    }

                    //console.log(link_arr[1]);
                    var process_3 = spawn('python', ["webpage_extract.py", link_arr[1]]);
                    process_3.stdout.on('data', function (data) {
                        var s2 = data.toString();
                        var process_33 = spawn('python', ["online_text_given.py", onlinetext]);
                        process_33.stdout.on('data', function (data) {
                            var s4 = data.toString();
                            s4 = parseFloat(s4).toFixed(2);
                            //console.log('--'+s2.trim()+'--'+s4);
                            if(s2.trim() == "yes" && s4 != 0.00){
                                res_tbl.before("<tr><td>"+link_arr[1]+"</td><td>"+s4+"</td></tr>");
                            }
                            else{
                                res_tbl.before("<tr><td>"+link_arr[1]+"</td><td>Forbidden webpage!</td></tr>");
                            }

                            //console.log(link_arr[2]);
                            var process_4 = spawn('python', ["webpage_extract.py", link_arr[2]]);
                            process_4.stdout.on('data', function (data) {
                                var s2 = data.toString();
                                var process_44 = spawn('python', ["online_text_given.py", onlinetext]);
                                process_44.stdout.on('data', function (data) {
                                    var s4 = data.toString();
                                    s4 = parseFloat(s4).toFixed(2);
                                    //console.log('--'+s2.trim()+'--'+s4);
                                    if(s2.trim() == "yes" && s4 != 0.00){
                                        res_tbl.before("<tr><td>"+link_arr[2]+"</td><td>"+s4+"</td></tr>");
                                    }
                                    else{
                                        res_tbl.before("<tr><td>"+link_arr[2]+"</td><td>Forbidden webpage!</td></tr>");
                                    }

                                    var process_5 = spawn('python', ["webpage_extract.py", link_arr[3]]);
                                    process_5.stdout.on('data', function (data) {
                                        var s2 = data.toString();
                                        var process_55 = spawn('python', ["online_text_given.py", onlinetext]);
                                        process_55.stdout.on('data', function (data) {
                                            var s4 = data.toString();
                                            s4 = parseFloat(s4).toFixed(2);
                                            //console.log('--'+s2.trim()+'--'+s4);
                                            if(s2.trim() == "yes" && s4 != 0.00){
                                                res_tbl.before("<tr><td>"+link_arr[3]+"</td><td>"+s4+"</td></tr>");
                                            }
                                            else{
                                                res_tbl.before("<tr><td>"+link_arr[3]+"</td><td>Forbidden webpage!</td></tr>");
                                            }

                                            //console.log(link_arr[4]);
                                            var process_5 = spawn('python', ["webpage_extract.py", link_arr[4]]);
                                            process_5.stdout.on('data', function (data) {
                                                var s2 = data.toString();
                                                var process_44 = spawn('python', ["online_text_given.py", onlinetext]);
                                                process_44.stdout.on('data', function (data) {
                                                    var s4 = data.toString();
                                                    s4 = parseFloat(s4).toFixed(2);
                                                    //console.log('--'+s2.trim()+'--'+s4);
                                                    if(s2.trim() == "yes" && s4 != 0.00){
                                                        res_tbl.before("<tr><td>"+link_arr[4]+"</td><td>"+s4+"</td></tr>");
                                                    }
                                                    else{
                                                        res_tbl.before("<tr><td>"+link_arr[4]+"</td><td>Forbidden webpage!</td></tr>");
                                                    }
                                                    res_tbl.fadeOut();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });            
        });
    });
});
