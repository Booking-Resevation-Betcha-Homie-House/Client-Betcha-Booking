function alertCustom(header, message) {
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
    alertContainer.style.borderRadius = '12px';
    alertContainer.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.maxWidth = '500px';  
    alertContainer.style.width = '80%';  
    alertContainer.style.fontFamily = 'Arial, sans-serif';
    alertContainer.style.height = 'auto';
    alertContainer.style.minHeight = '250px'; 

    const alertHeader = document.createElement('div');
    alertHeader.style.fontSize = '24px';  
    alertHeader.style.fontWeight = 'bold';
    alertHeader.style.color = '#127845';
    alertHeader.style.borderBottom = '3px solid #127845'; 
    alertHeader.style.paddingBottom = '15px';  
    alertHeader.style.marginBottom = '25px';  
    alertHeader.textContent = header;  
    alertContainer.appendChild(alertHeader);

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;
    alertMessage.style.fontSize = '18px'; 
    alertMessage.style.color = '#333';
    alertMessage.style.marginBottom = '25px';  
    alertMessage.style.padding = '20px';  
    alertMessage.style.lineHeight = '1.6';
    alertMessage.style.textAlign = "Start" 
    alertMessage.style.borderRadius = '8px';  
    alertMessage.style.backgroundColor = '#f9f9f9'; 
    alertContainer.appendChild(alertMessage);

    const okButton = document.createElement('button');
    okButton.textContent = 'Okay';
    okButton.style.padding = '16px 50px';  
    okButton.style.border = 'none';
    okButton.style.borderRadius = '50px';  
    okButton.style.backgroundColor = '#127845';
    okButton.style.color = '#fff';
    okButton.style.fontSize = '18px'; 

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

    okButton.onclick = () => {
        document.body.removeChild(overlay);
    };

    alertContainer.appendChild(okButton);
    overlay.appendChild(alertContainer);

    document.body.appendChild(overlay);
}
