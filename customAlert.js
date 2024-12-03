function alertCustom(header, message) {
    return new Promise((resolve) => {
        if (document.getElementById('custom-alert-container')) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'custom-alert-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';

        const alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        alertContainer.style.backgroundColor = '#fff';
        alertContainer.style.padding = '30px';
        alertContainer.style.borderRadius = '1.75rem';
        alertContainer.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        alertContainer.style.textAlign = 'center';
        alertContainer.style.maxWidth = '500px';
        alertContainer.style.width = '80%';
        alertContainer.style.fontFamily = 'Arial, sans-serif';
        alertContainer.style.height = 'auto';
        alertContainer.style.minHeight = '10px';

        const alertHeader = document.createElement('div');
        alertHeader.style.fontSize = '24px';
        alertHeader.style.fontWeight = 'bold';
        alertHeader.style.color = '#127845';
        alertHeader.style.paddingBottom = '5px';
        alertHeader.style.marginBottom = '10px';
        alertHeader.textContent = header;
        alertContainer.appendChild(alertHeader);

        const alertMessage = document.createElement('p');
        alertMessage.textContent = message;
        alertMessage.style.fontSize = '16px';
        alertMessage.style.color = '#333';
        alertMessage.style.marginTop = '0';
        alertMessage.style.padding = '0';
        alertMessage.style.lineHeight = '1.4';
        alertMessage.style.textAlign = "center";
        alertMessage.style.marginBottom = '45px';
        alertContainer.appendChild(alertMessage);

        const okButton = document.createElement('button');
        okButton.textContent = 'Okay';
        okButton.style.padding = '16px 50px';
        okButton.style.border = 'none';
        okButton.style.borderRadius = '1.75rem';
        okButton.style.backgroundColor = '#127845';
        okButton.style.color = '#fff';
        okButton.style.fontSize = '14px';
        okButton.style.cursor = 'pointer';
        okButton.style.transition = 'background-color 0.3s';
        okButton.style.width = '100%';
        okButton.style.height = '50%';

        okButton.onmouseover = () => {
            okButton.style.backgroundColor = '#0a5d33';
        };
        okButton.onmouseout = () => {
            okButton.style.backgroundColor = '#127845';
        };

        document.body.style.pointerEvents = 'none';
        overlay.style.pointerEvents = 'auto';

        okButton.onclick = () => {
            document.body.removeChild(overlay);
            document.body.style.pointerEvents = '';  
            resolve();  
        };

        alertContainer.appendChild(okButton);
        overlay.appendChild(alertContainer);
        document.body.appendChild(overlay);
    });
}
