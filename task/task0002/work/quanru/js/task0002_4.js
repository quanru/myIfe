        var currentSelIndex = -1;
        var oldSelIndex = -1;

        function selectItem(event) {
        	keyword = $("#txtKeyword").value;
            if (keyword === "") {
                $("#ulItems").style.display = "none";
                return;
            }
            else {
                var liLength = $("#ulItems").getElementsByTagName("li").length; //获取列表数量
                if ((event.keyCode == 38 || event.keyCode == 40) && $("#ulItems").style.display != "none") {
                    if (liLength > 0) {
                        oldSelIndex = currentSelIndex;
                        //上移
                        if (event.keyCode == 38) {
                            if (currentSelIndex == -1) {
                                currentSelIndex = liLength - 1;
                            }
                            else {
                                currentSelIndex = currentSelIndex - 1;
                                if (currentSelIndex < 0) {
                                    currentSelIndex = liLength - 1;
                                }
                            }
                            if (currentSelIndex != -1) {
                                $("#li_" + currentSelIndex).style.backgroundColor = "#C1BDBD";
                            }
                            if (oldSelIndex != -1) {
                                $("#li_" + oldSelIndex).style.backgroundColor = "#ffffff";
                            }
                        }
                        //下移
                        if (event.keyCode == 40) {
                            if (currentSelIndex == liLength - 1) {
                                currentSelIndex = 0;
                            }
                            else {
                                currentSelIndex = currentSelIndex + 1;
                                if (currentSelIndex > liLength - 1) {
                                    currentSelIndex = 0;
                                }
                            }
                            if (currentSelIndex != -1) {
                                $("#li_" + currentSelIndex).style.backgroundColor = "#C1BDBD";
                            }
                            if (oldSelIndex != -1) {
                                $("#li_" + oldSelIndex).style.backgroundColor = "#ffffff";
                            }
                        }
                    }
                }
                else if (event.keyCode == 13) {
                    if ($("#ulItems").style.display != "none" && liLength > 0 && currentSelIndex != -1) {
                        $("#txtKeyword").value = $("#li_" + currentSelIndex).innerText;
                        $("#ulItems").style.display = "none";
                        currentSelIndex = -1;
                        oldSelIndex = -1;
                    }
                }
                else {
                    autoComplete(keyword);
                    $("#ulItems").style.display = "";
                    currentSelIndex = -1;
                    oldSelIndex = -1;
                }
            }            
        }
        var suggestData = ['Simon Chuixue', 'Simon Erik', 'Kener'];
        function autoComplete(keyword) {
                
                var inData = $("#txtKeyword").value;
                var tempData = [];
                for(var i = 0, length1 = suggestData.length; i < length1; i++){
                if(suggestData[i].indexOf(inData) === 0)
                        tempData.push(suggestData[i]);
                }
                while($("#ulItems").lastChild){
                 $("#ulItems").removeChild($("#ulItems").lastChild);
                }
                for (var j = 0; j < tempData.length; j++) {
                        var opt = document.createElement("li");
                        opt.id = "li_" + j;
                        $("#ulItems").appendChild(opt);
                        opt.onclick = function (event) {
                            $("#txtKeyword").value = this.innerText;
                        };
                        var texNode = document.createTextNode(tempData[j]);
                        opt.appendChild(texNode);
                }
        }

        window.onload = function  () {
        	$("#ulItems").style.display = "none";
        	 $("#txtKeyword").onkeyup = selectItem;
        };