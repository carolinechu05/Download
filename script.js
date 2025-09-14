        let eventsTriggered = {
            popupShown: false,
            screenClicked: false,
        };
        
        // Event 1: Click to show popup
        function showPopup() {
            document.getElementById('popup').classList.remove('hidden');
            eventsTriggered.popupShown = true;
        }

        // Event 2: Click on computer screen
        function wakeUpComputer() {
            let screen = document.getElementById('computer-screen');
            eventsTriggered.popupShown = true;

            // Step 1: show "starting up"
            screen.innerHTML = '<div style="color: #00ff00;">System Starting Up...</div>';
            eventsTriggered.screenClicked = false;

            // Step 2: wait 10 seconds, then ask
            setTimeout(() => {
                function askReboot() {
                let reboot = confirm("System is still loading. Do you want to reboot?");
                
                if (reboot) {
                    // Step 3: reboot if user confirms
                    screen.innerHTML = '<div style="color: #00ff00;">System Rebooting...</div>';
                    setTimeout(() => {
                        screen.innerHTML = '<div style="color: #00ff00;">System Ready.</div>';
                    }, 5000); // 5000 ms = 5 seconds
                } else {
                    // If cancel → keep asking again
                    setTimeout(askReboot, 5000);
                }
            }
                askReboot();
            }, 5000); // 5000 ms = 5 seconds
        }
        //Event 3: Popup button actions
        function confirmDownload() {
            document.getElementById('popup').classList.add('hidden');
            showFinalResult('confirm');
        }

        function cancelDownload() {
            document.getElementById('popup').classList.add('hidden');
            showFinalResult('cancel');
        }

        function typeText(element, text, speed = 80) {
            let i = 0;
            element.textContent = ""; // clear
            let caret = document.createElement("span");
            caret.className = "caret";
            element.appendChild(caret);

            function typing() {
                if (i < text.length) {
                    caret.insertAdjacentText("beforebegin", text.charAt(i));
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }


        function showFinalResult(choice) {
            let resultDiv = document.getElementById('final-result');
            let messageDiv = document.getElementById('result-message');
            if (resultDiv && messageDiv) {
                if (choice == 'confirm') {
                    messageDiv.innerHTML = `<strong>You clicked Confirm!</strong><br>
                    The installation begins immediately.`;
                   // Make sure screen content is visible so we can see the progress bar
                    let screenContent = document.getElementById('download-bar');

                    if (screenContent) {
                        screenContent.classList.remove('hidden');
                    }
                    
                    setTimeout(() => {
                        // Reset and animate the progress bar
                        let progressBar = document.getElementById('progress-bar');
                        if (progressBar) {
                            progressBar.style.width = '0%';
                            progressBar.innerHTML = 'Installing...';
                            
                            setTimeout(() => {
                                progressBar.style.width = '100%';
                                progressBar.innerHTML = 'Installation Complete!';
                            }, 500);
                        }
                        
                        
                        // Update the message after installation
                        setTimeout(() => {typeText(messageDiv, "The game wasn't just a game - it was something far more mysterious. As the installation completes, something will be changed but you somehow feel familiar...", 50);
                        }, 3000);
                        
                    }, 1000);
                    
                } else {typeText(messageDiv, "You clicked Cancel! Smart choice. As the popup disappears, you notice something chilling...Your download history shows no record of starting any download yesterday. The 'game' you remember wanting doesn't exist in any online store. What were you really downloading, and who asked you to confirm it?", 50)
                }
            }
            resultDiv.classList.remove('hidden');
        }
