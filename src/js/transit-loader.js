// Loading animation functions

/**
 * Shows a transit-themed loading overlay
 * @param {string} message - The loading message to display
 */
function showTransitLoader(message = 'Loading schedule...') {
    // Create loader container if it doesn't exist
    let loader = document.getElementById('transit-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'transit-loader';
        loader.className = 'transit-loader';
          // Create loader content
        const loaderHTML = `
            <div class="loader-content">
                <div class="loader-icon"></div>
                <div class="loader-track">
                    <div class="loader-station"></div>
                    <div class="loader-station"></div>
                    <div class="loader-station"></div>
                    <div class="loader-station"></div>
                </div>
                <div class="loader-message">${message}</div>
                <div class="loader-progress">
                    <div class="loader-progress-inner"></div>
                </div>
            </div>
        `;
        
        loader.innerHTML = loaderHTML;
        document.body.appendChild(loader);
        
        // Add styles for the loader
        const style = document.createElement('style');
        style.textContent = `
            .transit-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }
            
            .loader-content {
                background-color: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                text-align: center;
                max-width: 90%;
                width: 400px;
                position: relative;
                overflow: hidden;
            }
            
            .loader-content::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 5px;
                background: linear-gradient(90deg, #0050a0, #ff6900);
            }
            
            .loader-icon {
                font-size: 40px;
                margin-bottom: 20px;
                animation: busMove 2s infinite;
            }
            
            .loader-track {
                display: flex;
                justify-content: space-between;
                margin: 20px 40px;
                position: relative;
            }
            
            .loader-track::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background-color: #e0e0e0;
                transform: translateY(-50%);
                z-index: 0;
            }
            
            .loader-station {
                width: 12px;
                height: 12px;
                background-color: #ff6900;
                border-radius: 50%;
                position: relative;
                z-index: 1;
            }
            
            .loader-message {
                margin: 20px 0;
                color: #0050a0;
                font-weight: bold;
            }
            
            .loader-progress {
                height: 6px;
                background-color: #f5f5f5;
                border-radius: 3px;
                overflow: hidden;
                margin: 15px 0 10px;
            }
            
            .loader-progress-inner {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #0050a0, #3f7cc7);
                border-radius: 3px;
                animation: progressMove 2s infinite;
            }
            
            @keyframes busMove {
                0% {
                    transform: translateX(-40px);
                }
                50% {
                    transform: translateX(40px);
                }
                100% {
                    transform: translateX(-40px);
                }
            }
            
            @keyframes progressMove {
                0% {
                    width: 0%;
                }
                50% {
                    width: 100%;
                }
                100% {
                    width: 0%;
                }
            }
        `;
        
        document.head.appendChild(style);
    } else {
        // Update message if loader already exists
        const messageElement = loader.querySelector('.loader-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
        loader.style.display = 'flex';
    }
}

/**
 * Hides the transit-themed loading overlay
 */
function hideTransitLoader() {
    const loader = document.getElementById('transit-loader');
    if (loader) {
        // Add a fade-out animation
        loader.style.animation = 'loaderFadeOut 0.5s forwards';
        
        // Add the animation style if it doesn't exist
        if (!document.querySelector('style#loader-fade-style')) {
            const style = document.createElement('style');
            style.id = 'loader-fade-style';
            style.textContent = `
                @keyframes loaderFadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                        visibility: hidden;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove loader after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}
