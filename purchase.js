document.addEventListener('DOMContentLoaded', () => {
    const itemNameElement = document.getElementById('item-name');
    const purchaseUsernameElement = document.getElementById('purchase-username');
    const verifyUsernameElement = document.getElementById('verify-username');
    const agreementCheckboxes = document.querySelectorAll('.agreement-checkbox');
    const finalizeButton = document.getElementById('finalize-button');

    // --- 1. Get Data from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('item') || 'Unknown Item'; // Get item name from URL
    const username = urlParams.get('username') || 'Unknown User'; // Get username from URL

    // --- 2. Display Data ---
    if (itemNameElement) itemNameElement.textContent = itemName;
    if (purchaseUsernameElement) purchaseUsernameElement.textContent = username;
    // Update username in the third agreement text
    if (verifyUsernameElement) verifyUsernameElement.textContent = username;


    // --- 3. Agreement Check Logic ---
    function checkAgreements() {
        let allChecked = true;
        agreementCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });

        if (allChecked) {
            finalizeButton.disabled = false;
            finalizeButton.innerHTML = '<i class="fas fa-check-circle"></i> Finalize Purchase'; // Change icon/text
        } else {
            finalizeButton.disabled = true;
            finalizeButton.innerHTML = '<i class="fas fa-lock"></i> Finalize Purchase (Agree Above)'; // Reset icon/text
        }
    }

    // --- 4. Event Listeners ---
    agreementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkAgreements);
    });

    // Add listener for coupon button (optional functionality)
    const couponButton = document.querySelector('.btn-apply-coupon');
    const couponInput = document.getElementById('couponCode');
    const couponMessage = document.getElementById('coupon-message');
    if (couponButton && couponInput && couponMessage) {
        couponButton.addEventListener('click', () => {
            const code = couponInput.value.trim();
            if (code) {
                // --- Placeholder for Coupon Logic ---
                console.log("Applying coupon:", code);
                couponMessage.textContent = `Coupon "${code}" applied (placeholder).`; // Example feedback
                couponMessage.style.color = 'var(--purchase-color)'; // Green feedback
                // Add your actual coupon validation and application logic here
                // --- End Placeholder ---
            } else {
                couponMessage.textContent = 'Please enter a coupon code.';
                couponMessage.style.color = '#ffc107'; // Yellow/Warning feedback
            }
        });
    }

    // Add listener for finalize button
    if (finalizeButton) {
         finalizeButton.addEventListener('click', () => {
             if (!finalizeButton.disabled) {
                 // --- Placeholder for actual purchase finalization ---
                 alert(`Purchase Finalized!\nItem: ${itemName}\nUser: ${username}\n\n(Redirecting to payment gateway or success page would happen here)`);
                 console.log("Finalize Purchase clicked. Item:", itemName, "User:", username);
                 // Example: window.location.href = 'YOUR_PAYMENT_GATEWAY_URL?item=...&user=...';
                 // --- End Placeholder ---
             }
         });
    }


    // --- 5. Initial Check on Load ---
    checkAgreements(); // Set initial state of the finalize button
});